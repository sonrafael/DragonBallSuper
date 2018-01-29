var db = require("../config/db-config.js");
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var raceSchema = mongoose.Schema({
    _id : ObjectId,
    name : {type : String, required : true},
    description : String,
    createdAt : Date
});
exports.Race = mongoose.model('Race', raceSchema);