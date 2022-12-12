const Space = require('../models/Space');
const axios = require("axios");
const TWITTER_URL = process.env.TWITTER_URL;
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN;

exports.getSuccessResponse = (data, message) => {
  return {
    success: true,
    data: data,
    message: message
  }

},

  exports.getFailedResponse = (data, message) => {
    return {
      success: false,
      data: data,
      message: message
    }

  },

  exports.getNotFoundResponse = (data, message) => {
    return {
      success: false,
      data: data,
      message: message
    }

  }

exports.fetchSpaces = async (keyword) => {
  var result;
  var config = {
    method: 'get',
    url: TWITTER_URL+`spaces/search?state=all&query=${keyword}&space.fields=title,creator_id,started_at,scheduled_start,participant_count&topic.fields=description&expansions=creator_id&user.fields=created_at,profile_image_url,description`,
    headers: { 
      'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`
    }
  };

  await axios(config)
  .then(function (response) {

    const data = response.data;

    console.log(keyword);
    console.log((data.data === undefined) ? 'no data' : data.data.length);

    return data.data;

    // if(data.data !== undefined && data.data.length > 0){
    //   var promise = [];
      // data.data.map((obj) => {

      //   if(obj.title !== ''){

      //     const user = data.includes.users.filter(o => {
      //       if(o.id == obj.creator_id){
      //         return o;
      //       }
      //     })

      //     if(Object.keys(user).length > 0){
      //       const spaceObj = {
      //         keyword: keyword,
      //         space_id: obj.id,
      //         participant_count: obj.participant_count,
      //         title: obj.title,
      //         state: obj.state,
      //         started_at: obj.started_at,
      //         scheduled_start: obj.scheduled_start,
      //         user: user[0]
      //       };

      //       var response = saveSpaces(obj.id, spaceObj);
      //       promise.push(response);
            
      //       Promise.all(promise)
      //       .then((promise) => {
      //         result = 'Saved successfully';
      //       }).catch((error) => {
      //         console.log('An error occured!');
      //         console.error(error);
      //       });
      //     }
      //   }
      // })

    //   return result;

    // } else{
    //   result = 'No spaces found';

    //   return result;
    // }
  });

}

async function saveSpaces(sid, payload){
  await Space.updateOne({space_id: sid}, payload, {upsert: true}).then(
    (resp) => {
      return resp;
    }).catch((err) => {
      console.log(err);
      return false;
    });
}



