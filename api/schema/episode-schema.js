var db = require("../config/db-config.js");
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var episodeSchema = mongoose.Schema({
    _id : ObjectId,
    name : {type : String, required : true},
    number : Number,
    description : String,
    createdAt : Date,
    saga : {type: mongoose.Schema.Types.ObjectId, ref: 'Saga'}
});
exports.Episode = mongoose.model('Episode', episodeSchema);