var app = require("./app-config.js");
var userController = require("./controller/user-controller.js");
var validator = require("validator");

app.get("/users", function(req, res){
    userController.list(function(response){
        res.json(response);
    });
});

app.get("/users/:id", function(req, res){
    var id = validator.trim(validator.escape(req.params.id));
    userController.userById(id, function(response){
        res.json(response);
    });
});

app.post("/users", function(req, res){
    var user = {
        fullname : validator.trim(validator.escape(req.body.fullname)), 
        email : validator.trim(validator.escape(req.body.email)), 
        username : validator.trim(validator.escape(req.body.username)),
        password : validator.trim(validator.escape(req.body.password)),
    };

    userController.save(user, function(response){
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
    userController.update(id, newUser, function(response){
        res.json(response);
    });
});

app.delete("/users/:id", function(req, res){
    var id = validator.trim(validator.escape(req.params.id));
    userController.delete(id, function(response){
        res.json(response);
    });
});