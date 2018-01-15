var app = require("../config/app-config.js");
var userDao = require("../dao/user-dao.js");
var validator = require("validator");

app.get("/users", function(req, res){
    userDao.list(function(response){
        res.json(response);
    });
});

app.get("/users/:id", function(req, res){
    var id = validator.trim(validator.escape(req.params.id));
    userDao.userById(id, function(response){
        res.json(response);
    });
});

app.post("/users", function(req, res){
    var newUser = {
        fullname : validator.trim(validator.escape(req.body.fullname)), 
        email : validator.trim(validator.escape(req.body.email)), 
        username : validator.trim(validator.escape(req.body.username)),
        password : validator.trim(validator.escape(req.body.password)),
    };

    userDao.save(newUser, function(response){
        res.json(response);
    });   
});

app.put("/users/:id", function(req, res){
    var id = validator.trim(validator.escape(req.params.id));
    var newUser = {
        fullname : validator.trim(validator.escape(req.body.fullname)),
        email : validator.trim(validator.escape(req.body.email)),
        username : validator.trim(validator.escape(req.body.username)),
        password : validator.trim(validator.escape(req.body.password))
    };
    userDao.update(id, newUser, function(response){
        res.json(response);
    });
});

app.delete("/users/:id", function(req, res){
    var id = validator.trim(validator.escape(req.params.id));
    userDao.delete(id, function(response){
        res.json(response);
    });
});

app.post("/users/login", function(req, res){
    var newUser = {
        username : validator.trim(validator.escape(req.body.username)),
        password : validator.trim(validator.escape(req.body.password))
    };
    userDao.login(newUser, function(response){
        res.json(response);
    });
});