var app = require("../config/app-config.js");
var imageDao = require("../dao/image-dao.js");
var validator = require("validator");

app.get("/images", function(req, res){
    imageDao.list(function(response){
        res.json(response);
    });
});

app.get("/images/:id", function(req, res){
    var id = validator.trim(validator.escape(req.params.id));
    imageDao.imageById(id, function(response){
        res.json(response);
    });
});

app.get("/images/alias", function(req, res){
    var alias = validator.trim(validator.escape(req.body.alias));
    imageDao.imageByAlias(alias, function(response){
        res.json(response);
    });
});

app.post("/images", function(req, res){
    var newImage = {
        name : validator.trim(validator.escape(req.body.name)), 
        alias : validator.trim(validator.escape(req.body.alias)), 
        alt : validator.trim(validator.escape(req.body.alt)),
        path : validator.trim(validator.escape(req.body.path))
    };

    imageDao.save(newImage, function(response){
        res.json(response);
    });   
});

app.put("/images/:id", function(req, res){
    var id = validator.trim(validator.escape(req.params.id));
    var newImage = {
        name : validator.trim(validator.escape(req.body.name)), 
        alias : validator.trim(validator.escape(req.body.alias)), 
        alt : validator.trim(validator.escape(req.body.alt)),
        path : validator.trim(validator.escape(req.body.path))
    };
    imageDao.update(id, newImage, function(response){
        res.json(response);
    });
});

app.delete("/images/:id", function(req, res){
    var id = validator.trim(validator.escape(req.params.id));
    imageDao.delete(id, function(response){
        res.json(response);
    });
});