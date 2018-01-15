var schema = require("../schema/user-schema.js");
var encrypt = require("bcrypt");

exports.list = function(callback){
    schema.User.find({}, function(error, users){
        if(error)
            callback({error : "Não foi possível retornar os usuários."});
        else    
            callback(users);
    });
};

exports.userById = function(id, callback){    
    schema.User.findById(id, function(error, user){
        if(error)
            callback({error : "Não foi possível retornar o usuário."});
        else    
            callback(user);
    });
};

exports.save = function(newUser, callback){
    schema.User.find({username : newUser.username}, function(error, user){
        if(user.length > 0)
            callback({error : "Nome de usuário já existe. Escolha um nome diferente."});
        else{
            new schema.User({
                fullname : newUser.fullname, 
                email : newUser.email, 
                username : newUser.username,
                password : encrypt.hashSync(newUser.password, 10),
                createdAt : new Date()
            }).save(function(error, savedUser){
                if(error)
                    callback({error : "Não foi possível salvar o usuário."});
                else
                    callback(savedUser);
            });
        }
    });

    
};

exports.update = function(id, newUser, callback){
    schema.User.findById(id, function(error, user) {
        if(error)
            callback({error : "Não foi possível alterar o usuário."});
        else{
            user.fullname = newUser.fullname ? newUser.fullname : user.fullname;
            user.email = newUser.email ? newUser.email : user.email;
            user.username = newUser.username ? newUser.username : user.username;
            user.password = newUser.password ? newUser.password : user.password;
            user.save(function(error, user){
                if(error)
                    callback({error : "Não foi possivel alterar o usuário."});
                else
                    callback(user);
            });
        }
    });
};

exports.delete = function(id, callback){
    schema.User.findById(id, function(error, user){
        if(error)
            callback({error : "Não foi possível retornar o usuário."});
        else{
            user.remove(function(){
                if(!error)
                    callback({response : "Usuário excluído com sucesso."});
            });
        }            
    });
};

exports.login = function(newUser, callback){
    schema.User.find({username : newUser.username}, function(error, user){
        if(error)
            callback({error : "Nome de usuário ou senha incorreto."});
        else if(user.length > 0 && encrypt.compareSync(newUser.password , user[0].password)){           
            callback(user);
        }
        else{
            callback({error : "Nome de usuário ou senha incorreto."});
        }
    });
}