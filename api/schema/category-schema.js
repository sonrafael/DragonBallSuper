var db = require("../config/db-config.js");
var mongoose = require("mongoose");
var categorySchema = mongoose.Schema({
    name : String,
    description : String,
    notification : mongoose.Schema.ObjectId,
    createdAt : Date
});
exports.Category = mongoose.model('Category', categorySchema);