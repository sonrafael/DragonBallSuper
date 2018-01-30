var db = require("../config/db-config.js");
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var sagaSchema = mongoose.Schema({
    _id : ObjectId,
    name : {type : String, required : true},
    description : String,
    createdAt : Date,
    mediaType : {type: mongoose.Schema.Types.ObjectId, ref: 'MediaType'},
    fase : {type: mongoose.Schema.Types.ObjectId, ref: 'Fase'}
});
exports.Saga = mongoose.model('Saga', sagaSchema);