// CONFIGURAÇÕES

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.listen(5000);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended : true
}));


//  || CONFIGURAÇÕES

app.get("/users", function(req, res){
    res.json(
        [
            {name : "Rafael Rodrigo Agapito", email : "sonrafael@gmail.com", username : "sonrafael", password : "84@17", createdAt : new Date()},
            {name : "Andréa Lima de Souza", email : "andrealima28@hotmail.com", username : "deialima", password : "ra&de", createdAt : new Date()}
        ]
    );
});

app.get("/users:id", function(req, res){

});

app.post("/users", function(req, res){
    
});

app.put("/users:id", function(req, res){

});

app.delete("/users:id", function(req, res){

});