var db = require("../db-config.js");

exports.list = function(callback){
    db.User.find({}, function(error, users){
        if(error)
            callback({error : "Nao foi possivel retornar usuarios"});
        else    
            callback(users);
    });
};

exports.userById = function(id, callback){
    db.User.findById(id, function(error, user){
        if(error)
            callback({error : "Nao foi possivel retornar o usuario"});
        else    
            callback(user);
    });
};

exports.save = function(user, callback){
    new db.User({
        fullname : user.fullname, 
        email : user.email, 
        username : user.username,
        password : user.password,
        createdAt : new Date()
    }).save(function(error, user){
        if(error)
            callback({erro : "não foi possivel salvar o usuario."});
        else
            callback(user);
    });
};

exports.update = function(id, newUser, callback){
    db.User.findById(id, function(error, user) {
        if(error)
            callback({erro : "não foi possivel alterar o usuario."});
        else{
            user.fullname = newUser.fullname ? newUser.fullname : user.fullname;
            user.email = newUser.email ? newUser.email : user.email;
            user.username = newUser.username ? newUser.username : user.username;
            user.password = newUser.password ? newUser.password : user.password;
            user.save(function(error, user){
                if(error)
                    callback({erro : "não foi possivel atualizar o usuario."});
                else
                    callback(user);
            });
        }        
    })
};

exports.delete = function(id, callback){
    db.User.findById(id, function(error, user){
        if(error)
            callback({error : "Nao foi possivel retornar o usuario"});
        else{
            user.remove(function(){
                if(!error)
                    callback({response : "Usuário Excluído com sucesso."})
            });
        }            
    });
};