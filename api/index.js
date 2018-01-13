// CONFIGURAÇÕES

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.listen(5000);


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/dragonballsuper', {
  useMongoClient: true,
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro ao conectar na database'));
db.on('open', function() {
    console.log("LOGOU NO BANCO");
    var userSchema = mongoose.Schema({
        fullname : String, 
        email : String, 
        username : String,
        password : String, 
        createdAt : Date
    });
    User = mongoose.model('User', userSchema);
});
var User;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended : true
}));

//  || CONFIGURAÇÕES

app.get("/users", function(req, res){
    User.find({}, function(error, users){
        if(error)
            res.json({error : "Nao foi possivel retornar usuarios"});
        else    
            res.json(users);
        });
});

app.get("/users/:id", function(req, res){
    User.findById(req.params.id, function(error, user){
        if(error)
            res.json({error : "Nao foi possivel retornar o usuario"});
        else    
            res.json(user);
        });
});

app.post("/users", function(req, res){
    new User({
        fullname : req.body.fullname, 
        email : req.body.email, 
        username : req.body.username,
        password : req.body.password,
        createdAt : new Date()
    }).save(function(error, user){
        if(error)
            res.json({erro : "não foi possivel salvar o usuario."});
        else
            res.json(user);
    });
});

app.put("/users/:id", function(req, res){
    User.findById(req.param('id'),function(error, user) {
        if(error)
            res.json({erro : "não foi possivel alterar o usuario."});
        else{
            user.fullname = req.body.fullname ? req.body.fullname : user.fullname;
            user.email = req.body.email ? req.body.email : user.email;
            user.username = req.body.username ? req.body.username : user.username;
            user.password = req.body.password ? req.body.password : user.password;            
            user.save(function(error, user){
                if(error)
                    res.json({erro : "não foi possivel atualizar o usuario."});
                else
                    res.json(user);
            });
        }        
    })
});

app.delete("/users/:id", function(req, res){
    User.findById(req.params.id, function(error, user){
        if(error)
            res.json({error : "Nao foi possivel retornar o usuario"});
        else{
            user.remove(function(){
                if(!error)
                    res.json({response : "Usuário Excluído com sucesso."})
            });
        }            
    });
});