const User = require("../models/User");
const apiHelper = require('../helpers/apiHelper');
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET;

exports.signup = async(req,res) =>{

    User.findOne({email:req.body.email}).then(
        (user) => {
            if(user){
                 res.status(400).json({errMessage:"A user already registered with this email"});
            }
            else{

                const newUser = new User({
                    first_name : req.body.first_name,
                    last_name : req.body.last_name,
                    email : req.body.email,
                    password : req.body.password,
                    twitter_token:req.body.twitter_token
                });
                
                newUser.save(function (err) {
                    if(err)
                    res.status(500).json (apiHelper.getFailedResponse([],err.message));

                    res.status(200).json( apiHelper.getSuccessResponse(newUser,'User saved successfully'))
                });

               // res.status(400).json(newUser);
            }

    });

}
exports.signin = async(req,res) =>{
     
    User.findOne({email:req.body.email}).then( (user) =>{

        if(!user){

            res.status(404).json(apiHelper.getNotFoundResponse([],"No user found with privided user name"))
            
        }else{

            var token = jwt.sign({ id: user.id }, SECRET, {
                expiresIn: 172800 // 24 hours
            });

           // user.comparePassword(req.body.password);

           user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) throw err;
             
            if(isMatch)
            {
            res.status(200).json(apiHelper.getSuccessResponse(
                {first_name:user.first_name,last_name:user.last_name,email:user.email,access_token:token},
                'Logged in successfully'));
            }else{

                res.status(401).json(apiHelper.getFailedResponse({access_token:''},'Invalid Password'));
            }

        });

      }

    })

}