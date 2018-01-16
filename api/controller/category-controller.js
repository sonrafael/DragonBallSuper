var app = require("../config/app-config.js");
var categoryDao = require("../dao/category-dao.js");
var validator = require("validator");

app.get("/categories", function(req, res){
    categoryDao.list(function(response){
        res.json(response);
    });
});

app.get("/categories/:id", function(req, res){
    var id = validator.trim(validator.escape(req.params.id));
    categoryDao.categoryById(id, function(response){
        res.json(response);
    });
});

app.post("/categories", function(req, res){
    var newCategory = {
        name : validator.trim(validator.escape(req.body.name)),
        description : validator.trim(validator.escape(req.body.description))
    };
    categoryDao.save(newCategory, function(response){
        res.json(response);
    });   
});

app.put("/categories/:id", function(req, res){
    var id = validator.trim(validator.escape(req.params.id));
    var newCategory = {
        name : validator.trim(validator.escape(req.body.name)),
        description : validator.trim(validator.escape(req.body.description))
    };
    categoryDao.update(id, newCategory, function(response){
        res.json(response);
    });
});

app.delete("/categories/:id", function(req, res){
    var id = validator.trim(validator.escape(req.params.id));
    categoryDao.delete(id, function(response){
        res.json(response);
    });
});