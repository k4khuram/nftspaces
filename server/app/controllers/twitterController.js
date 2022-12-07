const { default: mongoose, Model } = require('mongoose');
const apiHelper = require('../helpers/apiHelper');
const User = require("../models/User");
const Space = require("../models/Space");
const SpaceRemind = require("../models/SpaceRemind");

const { TwitterApi } = require('twitter-api-v2');
const TWITTER_URL = process.env.TWITTER_URL;
const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const TWITTER_CALLBACK_URL = process.env.TWITTER_CALLBACK_URL;
const WEB_URL = process.env.WEB_URL;

exports.twitterAPI2 = async(req,res) => {
    const client = new TwitterApi(TWITTER_BEARER_TOKEN);
    const clientV2 = client.v2;
    const users = await clientV2.usersByUsernames(['jack', 'plhery', 'alkihis']);
    res.send(users);
}

exports.getAuthURL = async(req,res) => {

    const client = new TwitterApi({ clientId: TWITTER_CLIENT_ID, 
    clientSecret: TWITTER_CLIENT_SECRET });
    const { url, codeVerifier, state } = client.generateOAuth2AuthLink(WEB_URL+TWITTER_CALLBACK_URL, { scope: ['tweet.read','offline.access', 'users.read','space.read'] });
    res.status(200).json(apiHelper.getSuccessResponse({url:url,codeVerifier:codeVerifier,state:state},""))
}

exports.callback = async(req,res) => {

  try{
    const { codeVerifier, code } = req.body; 
    const user = req.body.user;

    const client = new TwitterApi({ clientId: TWITTER_CLIENT_ID, 
      clientSecret: TWITTER_CLIENT_SECRET });

      
      client.loginWithOAuth2({ code, codeVerifier, redirectUri: WEB_URL+TWITTER_CALLBACK_URL })
      .then(async ({ client: loggedClient, accessToken, refreshToken, expiresIn }) => {
        
        // res.status(200).json(apiHelper.getSuccessResponse([],"Done"));
      // const { data: userObject } = await loggedClient.v2.me();

      // console.log(userObject);

      User.findOneAndUpdate({ email: user.email }, {twitter_token: refreshToken}).then((user) => {
        res.status(200).json(apiHelper.getSuccessResponse(user,"Done"));
      }).catch((err) => {
          console.log(err);
          res.status(200).json(apiHelper.getSuccessResponse([],"Done"));
      });
    })
    .catch((err) => 
      res.status(200).json(apiHelper.getSuccessResponse([],"Done"))
      // res.status(403).json(apiHelper.getFailedResponse(err,'Invalid verifier or access tokens!'))
    );
  }catch(err){
    res.status(500).json(apiHelper.getFailedResponse([],err.message))
  }

}

exports.remind = async(req,res) => {

  const newRecord = new SpaceRemind({
    space_id : req.body.space_id,
    user_id : req.body.user_id,
  });

  newRecord.save(function (err) {
      if(err)
      res.status(500).json (apiHelper.getFailedResponse([],err.message));

      res.status(200).json( apiHelper.getSuccessResponse(newRecord,'Space Remind saved successfully'))
  });
}

exports.getSpaces = async(req,res) => {
  try{
    var data = {};
    Space.aggregate([{
      "$lookup": {
        from: "space_reminders",
        let: {
          id: "$_id",
        },
        pipeline: [
          {
            $match: {
              $expr:{
                $and:[
                     {$eq: ["$user_id",mongoose.Types.ObjectId(req.query.user_id)]},
                     {
                          $eq:[
                               "$$id", //localField variable it can be used only in $expr
                               "$space_id" //foreignField 
                          ]
                     }
                ]
           }
            }
          }
        ],
        as: "space"
      }
    }]).unwind({
      path: "$space",
      preserveNullAndEmptyArrays: true
    }).then(resp => {

      // console.log(resp);

      if(resp){

        const live = [];
        const scheduled = [];
        const trending = [];
        const past = [];
        const popular = [];

        resp.map((obj) => {
          if(obj.state == 'live'){
            live.push(obj);
          }
          else if(obj.state == 'scheduled' && obj.space !== undefined){
            trending.push(obj);
          }
          else if(obj.state == 'scheduled' && obj.type === 'PAST'){
            past.push(obj);
          }
          else if(obj.state == 'scheduled' && obj.type === 'POPULAR'){
            popular.push(obj);
          }
          else if(obj.state == 'scheduled'){
            scheduled.push(obj);
          }
        })
        data['live'] = live;
        data['scheduled'] = scheduled;
        data['trending'] = trending;
        data['past'] = past;
        data['popular'] = popular;

        // m = resp.map((obj) => {
        //   if(obj.state == 'scheduled'){
        //     return obj;
        //   }
        // })
        // data['scheduled'] = m;
      }

      res.status(200).json(apiHelper.getSuccessResponse(data, "Spaces list"));
    })

      // const client = new TwitterApi(TWITTER_BEARER_TOKEN);   
      // const { data: spaces } = await client.v2.searchSpaces({ query: req.query.q, state: req.query.state,"space.fields":["title","creator_id"],"topic.fields":["description"],"expansions":"creator_id","user.fields":["created_at","profile_image_url"] })
      // console.log(spaces);
      // res.status(200).json({spaces:spaces});

  }catch(err){
      res.status(401).json({errMessage:err.message});
  }
      
}

exports.popularSpaces = async(req,res) => {
  try{
    Space.find({state: 'live'}).limit(10).sort({participant_count: -1}).then(resp => {
      console.log('popular spaces');

      console.log('count:', resp.length);

      if(resp.length > 0){
        Space.deleteMany({type: 'POPULAR'}).then(del => {

          console.log('popular spaces deleted');

          var popularSpaces = [];
          resp.map((obj) => {
    
            const spaceObj = {
              keyword: obj.keyword,
              space_id: obj.space_id,
              participant_count: obj.participant_count,
              title: obj.title,
              state: 'scheduled',
              started_at: obj.started_at,
              scheduled_start: obj.scheduled_start,
              user: obj.user,
              type: 'POPULAR'
            };

            popularSpaces.push(spaceObj);
          })

          console.log('popular spaces inserting');

          Space.create(popularSpaces);
        })
      }

      res.status(200).json(apiHelper.getSuccessResponse([], "Popular Spaces"));
    })
  }catch(err){
      res.status(401).json({errMessage:err.message});
  }   
}

exports.pastSpaces = async(req,res) => {
  try{
    console.log(new Date());
    Space.updateMany({
      "$and": [
        {
          "state": "scheduled"
        },
        {
          "scheduled_start": {
            "$lt": new Date()
          }
        }
      ]
    },{
      "$set": {
        "type": "PAST"
      }
    }).then(resp => {
      console.log(resp);
      res.status(200).json(apiHelper.getSuccessResponse([], "Past scheduled updated"));
  
    })
  }catch(err){
      res.status(401).json({errMessage:err.message});
  }   
}

exports.saveSpaces = async(req,res) => {
  try{

    // var keywords = [
    //   'Azuki',
    //   'Mutant Ape Yacht Club',
    //   'Bored Ape Yacht Club',
    //   'CryptoPunks',
    //   'CLONE X - X TAKASHI MURAKAMI',
    //   'Dori Samurai',
    //   'LOVE Tennis Art Project by Martin Grasser',
    //   'Art Blocks',
    //   'Otherdeed for Otherside',
    //   'Bored Ape Kennel Club',
    //   'Doodles',
    //   'Valhalla',
    //   'Moonbirds',
    //   'NFT',
    // ];
    var keywords = [
      'NFT',
    ];

    var promises = [];
    keywords.map(k => {
      var result;
      Space.deleteMany({'state': 'live'}).then(del => {
        console.log(del);
        if(del){
          result = apiHelper.fetchSpaces(k);
          promises.push(result);
        }
      })
      .catch(function (error) {
        console.log(error);
        res.status(401).json(apiHelper.getFailedResponse(error))
      });
    })

    Promise.all(promises)
    .then((promises) => {
      res.status(200).json(apiHelper.getSuccessResponse({total: promises.length}, 'Saved successfully'))
    }).catch((error) => {
      console.log('An error occured!');
      console.error(error);
    });

  }catch(err){
      res.status(401).json({errMessage:err.message});
  }
      
}