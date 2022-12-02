const mongoose =  require("mongoose");

const SpaceSchema = new mongoose.Schema({
    space_id:{
        type: String,
    },
    title:{
        type: String,
    },
    state:{
        type: String,
        enum: ['live','scheduled'],
        required: [true, 'state can\'t be blank'],
    },
    participant_count:{
        type: Number,
    },
    started_at:{
        type: String,
    },
    scheduled_start:{
        type: String,
    },
    type:{
        type: String,
        enum: ['UPCOMING','POPULAR','PAST'],
    },
    user: {},

},{timestamps: true})

module.exports = Space = mongoose.model("Space", SpaceSchema);