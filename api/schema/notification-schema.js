var db = require("../config/db-config.js");
var schema = require("./category-schema.js");
var mongoose = require("mongoose");
var notificationSchema = mongoose.Schema({
    //categories : [{ type: mongoose.Schema.Category.ObjectId, ref: 'Category' }],
    categories : [mongoose.Schema.ObjectId],
    createdAt : Date,
    title : String, 
    teaser : String, 
    text : String, 
    // images
    // tags
});


exports.Notification = mongoose.model('Notification', notificationSchema);