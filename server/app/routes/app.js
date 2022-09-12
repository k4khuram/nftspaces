const express = require('express');
let twitter_controller = require('../controllers/twitterController')
let user_controller = require('../controllers/userController')
const auth = require('../middlewares/auth');


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

    app.get('/auth/twitter/getdata', twitter_controller.twitterAPI2)
    app.post('/api/signup',  user_controller.signup);
    app.post('/api/signin',  user_controller.signin);
    
}
