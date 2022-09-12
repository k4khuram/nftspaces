const axios = require("axios");
const apiHelper = require('../helpers/apiHelper');

const { TwitterApi } = require('twitter-api-v2');


exports.twitterAPI2 = async(req,res)=>{
    const client = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAAlnSAEAAAAARTA%2BwVVOxyhqlriZBSuFK8n33kE%3Dw4VERy3G56jMD6X73FVo1mOfGhzULXzy8EVAHdQLoFDWNOanM6');
    const clientV2 = client.v2;
    const users = await clientV2.usersByUsernames(['jack', 'plhery', 'alkihis']);
    res.send(users);
}


