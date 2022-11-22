const express = require('express');
let twitter_controller = require('../controllers/twitterController')
let user_controller = require('../controllers/userController')
const auth = require('../middlewares/auth');
const { TwitterApi } = require('twitter-api-v2');


module.exports = app =>{

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "access-token, Origin, Content-Type, Accept"
        );        

        next();
    });

    app.get ('/', (req,res)=> {

        res.send('Welcome Home');
    })

    app.get('/api/v1/auth/twitter/getauthurl', twitter_controller.getAuthURL)
    app.post('/api/v1/auth/twitter/callback', twitter_controller.callback)
    app.post('/api/v1/signup',  user_controller.signup);
    app.post('/api/v1/signin',  user_controller.signin);
    app.get('/api/v1/twitter/getspaces', twitter_controller.getSpaces)
    
}
