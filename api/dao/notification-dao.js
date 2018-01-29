var schema = require("../schema/notification-schema.js");
var categoryDao = require("./category-dao.js");

exports.list = function(callback){
    schema.Notification.find({}, function(error, notifications){
        if(error)
            callback({error : "Não foi possível retornar as notificações."});
        else    
            callback(notifications);
    }).populate('category');
};

exports.notificationById = function(id, callback){    
    schema.Notification.findById(id, function(error, notification){
        if(error)
            callback({error : "Não foi possível retornar a notificação."});
        else    
            callback(notification);
    });
};

exports.notificationsByCategory = function(categoryId, callback){
    schema.Notification.find({category : categoryId}, function(error, notifications){
        if(error)
            callback({error : "Não foi possível retornar a notificações."});
        else{
            notifications.forEach()
            callback(notifications);
        }
            
    }).populate('category');
};

exports.save = function(newNotification, callback){
    var categoryId = newNotification.categoryId;
    categoryDao.categoryById(categoryId, function(category){
        if(category){
            new schema.Notification({
                category : category,
                title : newNotification.title, 
                teaser : newNotification.teaser,
                text : newNotification.text,
                createdAt : new Date()
            }).save(function(error, savedNotification){
                if(error)
                    callback({error : "Não foi possível salvar a notificação."});
                else
                    callback(savedNotification);
            });
        }
        else{
            callback({error : "Não foi possível salvar a notificação pois a categoria não foi encontrada."});
        }
    });
};

exports.update = function(id, newNotification, callback){
    schema.Notification.findById(id, function(error, notification) {
        if(error)
            callback({error : "Não foi possível alterar a categoria."});
        else{
            notification.category = newNotification.category ? newNotification.category : notification.category;
            notification.title = newNotification.title ? newNotification.title : notification.title;
            notification.teaser = newNotification.teaser ? newNotification.teaser : notification.teaser;
            notification.text = newNotification.text ? newNotification.text : notification.text;
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
                    callback({response : "Notificação excluída com sucesso."});
            });
        }            
    });
};