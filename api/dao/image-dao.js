var schema = require("../schema/image-schema.js");

exports.list = function(callback){
    schema.Image.find({}, function(error, images){
        if(error)
            callback({error : "Não foi possível retornar as imagens."});
        else    
            callback(images);
    });
};

exports.imageById = function(id, callback){    
    schema.Image.findById(id, function(error, image){
        if(error)
            callback({error : "Não foi possível retornar a imagem."});
        else    
            callback(image);
    });
};

exports.imageByAlias = function(alias, callback){
    schema.Image.find({"alias" : alias}, function(error, images){
        if(error)
            callback({error : "Não foi possível retornar as imagens."});
        else    
            callback(images);
    });
};

exports.save = function(newImage, callback){
    new schema.Image({
        name : newImage.name, 
        alias : newImage.alias, 
        alt : newImage.alt,
        path : newImage.path,
        createdAt : new Date()
    }).save(function(error, savedImage){
        if(error)
            callback({error : "Não foi possível salvar a imagem."});
        else
            callback(savedImage);
    });
};

exports.update = function(id, newImage, callback){
    schema.Image.findById(id, function(error, image) {
        if(error)
            callback({error : "Não foi possível alterar a imagem."});
        else{
            image.name = newImage.name ? newImage.name : image.name;
            image.alias = newImage.alias ? newImage.alias : image.alias;
            image.alt = newImage.alt ? newImage.alt : image.alt;
            image.path = newImage.path ? newImage.path : image.path;
            image.save(function(error, image){
                if(error)
                    callback({error : "Não foi possivel alterar a imagem."});
                else
                    callback(image);
            });
        }
    });
};

exports.delete = function(id, callback){
    schema.Image.findById(id, function(error, image){
        if(error)
            callback({error : "Não foi possível retornar a imagem."});
        else{
            image.remove(function(){
                if(!error)
                    callback({response : "Imagem excluída com sucesso."});
            });
        }            
    });
};