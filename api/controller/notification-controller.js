var app = require("../config/app-config.js");
var notificationDao = require("../dao/notification-dao.js");
var validator = require("validator");

app.get("/notifications", function(req, res){
    notificationDao.list(function(response){
        res.json(response);
    });
});

app.get("/notifications/:id", function(req, res){
    var id = validator.trim(validator.escape(req.params.id));
    notificationDao.notificationById(id, function(response){
        res.json(response);
    });
});

app.post("/notifications", function(req, res){
    var newNotification = {
        categories : categories,
        title : validator.trim(validator.escape(req.body.title)),
        teaser : validator.trim(validator.escape(req.body.teaser)),
        text : validator.trim(validator.escape(req.body.text))
    };
    notificationDao.save(newNotification, function(response){
        res.json(response);
    });   
});

app.put("/notifications/:id", function(req, res){
    var id = validator.trim(validator.escape(req.params.id));
    var newNotification = {
        categories : categories,
        title : validator.trim(validator.escape(req.body.title)),
        teaser : validator.trim(validator.escape(req.body.teaser)),
        text : validator.trim(validator.escape(req.body.text))
    };
    notificationDao.update(id, newNotification, function(response){
        res.json(response);
    });
});

app.delete("/notifications/:id", function(req, res){
    var id = validator.trim(validator.escape(req.params.id));
    notificationDao.delete(id, function(response){
        res.json(response);
    });
});