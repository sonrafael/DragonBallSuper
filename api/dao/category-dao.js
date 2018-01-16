var schema = require("../schema/category-schema.js");

exports.list = function(callback){
    schema.Category.find({}, function(error, categories){
        if(error)
            callback({error : "Não foi possível retornar as categorias."});
        else    
            callback(categories);
    });
};

exports.categoryById = function(id, callback){    
    schema.Category.findById(id, function(error, category){
        if(error)
            callback({error : "Não foi possível retornar a categoria."});
        else    
            callback(category);
    });
};

exports.save = function(newCategory, callback){
    schema.Category.find({name : newCategory.name}, function(error, category){
        if(category.length > 0)
            callback({error : "Nome de categoria já existe. Escolha um nome diferente."});
        else{
            new schema.Category({
                name : newCategory.name, 
                description : newCategory.description, 
                createdAt : new Date()
            }).save(function(error, savedCategory){
                if(error)
                    callback({error : "Não foi possível salvar a categoria."});
                else
                    callback(savedCategory);
            });
        }
    });

    
};

exports.update = function(id, newCategory, callback){
    schema.Category.findById(id, function(error, category) {
        if(error)
            callback({error : "Não foi possível alterar a categoria."});
        else{
            category.name = newCategory.name ? newCategory.name : category.name;
            category.description = newCategory.description ? newCategory.description : category.description;
            category.save(function(error, category){
                if(error)
                    callback({error : "Não foi possivel alterar a categoria."});
                else
                    callback(category);
            });
        }
    });
};

exports.delete = function(id, callback){
    schema.Category.findById(id, function(error, category){
        if(error)
            callback({error : "Não foi possível retornar a categoria."});
        else{
            category.remove(function(){
                if(!error)
                    callback({response : "Categoria excluída com sucesso."});
            });
        }            
    });
};