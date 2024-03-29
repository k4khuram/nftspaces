const mongoose =  require("mongoose");
//const uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require("bcryptjs");
SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
    first_name:{
            type: String,           
    },
    last_name:{
        type: String, 
    },
    
    email: {
           type: String, 
           required: [true, "can't be blank"], 
           match: [/\S+@\S+\.\S+/, 'is invalid'], 
           index: true,
           unique: true
   },

   password: {
    type: String, 
    required: [true, "can't be blank"]
   },

   twitter_token: {
    type: String
   },

},{timestamps: true})

//UserSchema.plugin(uniqueValidator,{message: 'is already taken.'});

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });

})

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};



module.exports = User = mongoose.model("User", UserSchema);