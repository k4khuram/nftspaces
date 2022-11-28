const axios = require("axios");
const apiHelper = require('../helpers/apiHelper');

const { TwitterApi } = require('twitter-api-v2');
const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;
const TWITTER_CALLBACK_URL = process.env.TWITTER_CALLBACK_URL;
const WEB_URL = process.env.WEB_URL;


exports.twitterAPI2 = async(req,res)=>{
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

exports.callback = async(req,res) =>{

  try{
    const { codeVerifier, code } = req.body;  
    
    const client = new TwitterApi({ clientId: TWITTER_CLIENT_ID, 
      clientSecret: TWITTER_CLIENT_SECRET });
  
    client.loginWithOAuth2({ code, codeVerifier, redirectUri: WEB_URL+TWITTER_CALLBACK_URL })
    .then(async ({ client: loggedClient, accessToken, refreshToken, expiresIn }) => {
      res.status(200).json(apiHelper.getSuccessResponse({accessToken:accessToken,refreshToken:refreshToken,expiresIn:expiresIn},""));
    
    })
    .catch((err) => 
    res.status(403).json(apiHelper.getFailedResponse(err,'Invalid verifier or access tokens!'))
    );
  }catch(err){

    res.status(500).json(apiHelper.getFailedResponse([],err.message))
  }

}

exports.getSpaces = async(req,res) =>{
 // res.send(req.query.q);

  try{
      
      const client = new TwitterApi(TWITTER_BEARER_TOKEN);   
      const { data: spaces } = await client.v2.searchSpaces({ query: req.query.q, state: req.query.state,"space.fields":["title", "created_at", "creator_id"],"topic.fields":["name","description"] })
      res.status(200).json({spaces:spaces});

  }catch(err){

      res.status(401).json({errMessage:err.message});
  }
      
}