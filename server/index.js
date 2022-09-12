const express = require("express");
//const session = require('express-session');
//const cookieParser = require("cookie-parser");
require('dotenv').config()
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const mongoose = require("mongoose");
const DB_URI = process.env.ATLAS_URI;

const connectToDB = async() =>{
  await mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
      })
      .then(() => {
          console.log("Successfully connect to MongoDB.");
      })
      .catch(err => {
          console.error("Connection error", err);
          process.exit();
      });
}

  connectToDB();

 //app.use(cookieParser());
 app.use(cors());
 
 // parse requests of content-type - application/json
 app.use(express.json());
 // parse requests of content-type - application/x-www-form-urlencoded
 app.use(express.urlencoded({ extended: true }));

 
 //routes
 require('./app/routes/app')(app)

 

 
 app.listen(PORT,function(){
  console.log('Server is running at PORT:',PORT);
});