var db = require("../config/db-config.js");
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var categorySchema = mongoose.Schema({
    _id : ObjectId,
    name : {type : String, required : true},
    description : String,
    notification : mongoose.Schema.ObjectId,
    createdAt : Date
});
exports.Category = mongoose.model('Category', categorySchema);