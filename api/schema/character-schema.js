var db = require("../config/db-config.js");
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var characterSchema = mongoose.Schema({
    _id : ObjectId,
    name : {type : String, required : true},
    description : String,
    createdAt : Date,
    race : { type: mongoose.Schema.Types.ObjectId, ref: 'Race' },
    // images
});
exports.Character = mongoose.model('Character', characterSchema);