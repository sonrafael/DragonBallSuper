var db = require("../config/db-config.js");
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var imageSchema = mongoose.Schema({
    _id : ObjectId,
    name : {type : String, required : true},
    alias : String,
    alt : String,
    createdAt : Date,
    path : String
});
exports.Image = mongoose.model('Image', imageSchema);