const mongoose =  require("mongoose");

const SpaceRemindSchema = new mongoose.Schema({
    space_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Space"
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},{timestamps: true})

module.exports = SpaceRemind = mongoose.model("SpaceRemind", SpaceRemindSchema, "space_reminders");