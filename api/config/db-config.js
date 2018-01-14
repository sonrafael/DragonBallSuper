
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/dragonballsuper', {
  useMongoClient: true,
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro ao conectar na database'));
db.on('open', function() {
   console.log("logado no banco de dados.");
});