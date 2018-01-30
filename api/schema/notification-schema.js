var db = require("../config/db-config.js");
var Category = require("./category-schema.js");
var mongoose = require("mongoose");
var notificationSchema = mongoose.Schema({
    category : { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    createdAt : Date,
    title : String, 
    teaser : String, 
    text : String, 
    images : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }]
    // tags
});


exports.Notification = mongoose.model('Notification', notificationSchema);