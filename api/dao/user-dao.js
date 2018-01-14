var schema = require("../schema/user-schema.js");
var crypt = require("../utils/bcrypt.js");
var encrypt = require("bcrypt");

exports.list = function(callback){
    schema.User.find({}, function(error, users){
        if(error)
            callback({error : "Nao foi possivel retornar usuarios"});
        else    
            callback(users);
    });
};

exports.userById = function(id, callback){
    
    schema.User.findById(id, function(error, user){
        if(error)
            callback({error : "Nao foi possivel retornar o usuario"});
        else    
            callback(user);
    });
};

exports.save = function(userS, callback){
    schema.User.find({username : userS.username}, function(error, user){
        if(user.length > 0)
            callback({erro : "Nome de usuário já existe"});
        else{
            new schema.User({
                fullname : userS.fullname, 
                email : userS.email, 
                username : userS.username,
                password : encrypt.hashSync(userS.password, 10),
                createdAt : new Date()
            }).save(function(error, savedUser){
                if(error)
                    callback({erro : "não foi possivel salvar o usuario."});
                else
                    callback(savedUser);
            });
        }
    });

    
};

exports.update = function(id, newUser, callback){
    schema.User.findById(id, function(error, user) {
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
    schema.User.findById(id, function(error, user){
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

exports.login = function(userS, callback){
    schema.User.find({username : userS.username}, function(error, user){
        if(error)
            callback({error : "Nao foi possivel retornar o usuario"});
        else if(encrypt.compareSync(userS.password , user[0].password)){           
            callback(user);
        }
        else{
            callback({error : "Nao foi possivel retornar o usuario"});
        }
    });
}

