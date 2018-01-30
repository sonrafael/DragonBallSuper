var db = require("../config/db-config.js");
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var gameSchema = mongoose.Schema({
    _id : ObjectId,
    name : {type : String, required : true},
    description : String,
    createdAt : Date,
    console : {type: mongoose.Schema.Types.ObjectId, ref: 'Console'}
});
exports.Game = mongoose.model('Game', gameSchema);