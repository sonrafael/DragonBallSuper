var db = require("../config/db-config.js");
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var mediaTypeSchema = mongoose.Schema({
    _id : ObjectId,
    name : {type : String, required : true},
    description : String,
    createdAt : Date
});
exports.MediaType = mongoose.model('MediaType', mediaTypeSchema);