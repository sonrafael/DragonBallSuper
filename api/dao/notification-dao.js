var schema = require("../schema/notification-schema.js");

exports.list = function(callback){
    schema.Notification.find({}, function(error, notifications){
        if(error)
            callback({error : "Não foi possível retornar as categorias."});
        else    
            callback(notifications);
    });
};

exports.notificationById = function(id, callback){    
    schema.Notification.findById(id, function(error, notification){
        if(error)
            callback({error : "Não foi possível retornar a categoria."});
        else    
            callback(notification);
    });
};

exports.save = function(newNotification, callback){
    schema.Notification.find({name : newNotification.name}, function(error, notification){
        if(notification.length > 0)
            callback({error : "Nome de categoria já existe. Escolha um nome diferente."});
        else{
            new schema.Notification({
                name : newNotification.name, 
                description : newNotification.description, 
                createdAt : new Date()
            }).save(function(error, savedNotification){
                if(error)
                    callback({error : "Não foi possível salvar a categoria."});
                else
                    callback(savedNotification);
            });
        }
    });

    
};

exports.update = function(id, newNotification, callback){
    schema.Notification.findById(id, function(error, notification) {
        if(error)
            callback({error : "Não foi possível alterar a categoria."});
        else{
            notification.name = newNotification.name ? newNotification.name : notification.name;
            notification.description = newNotification.description ? newNotification.description : notification.description;
            notification.save(function(error, notification){
                if(error)
                    callback({error : "Não foi possivel alterar a categoria."});
                else
                    callback(notification);
            });
        }
    });
};

exports.delete = function(id, callback){
    schema.Notification.findById(id, function(error, notification){
        if(error)
            callback({error : "Não foi possível retornar a categoria."});
        else{
            notification.remove(function(){
                if(!error)
                    callback({response : "Categoria excluída com sucesso."});
            });
        }            
    });
};