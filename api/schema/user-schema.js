var db = require("../config/db-config.js");
var mongoose = require("mongoose");
var userSchema = mongoose.Schema({
    fullname : String, 
    email : String, 
    username : String,
    password : String, 
    createdAt : Date
});
exports.User = mongoose.model('User', userSchema);