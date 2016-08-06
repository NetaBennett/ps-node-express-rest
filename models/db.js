var mongoose = require('mongoose');
var Book = require('bookModel');
var db = mongoose.connect('mongodb://localhost/bookDb');
//osx install path: /usr/local/var/mongodb
//osx db path: /data/db
//osx to run: mongod --dbpath /data/db
//windows dbPath: ??


mongoose.connection.on('connected', function() {
    console.log('Connected to mongoose ...');

    // var Book = mongoose.model('Book');
    // var theBook = new Book();
    // theBook.title = "Test Book";
    // theBook.author = "Neta Bennett";
    // theBook.genre = "Fake Stuff";
    // theBook.save();
});


mongoose.connection.on('error', function(err) {
    console.log('Error with mongoose: ' + err);
});


mongoose.connection.on('disconnected', function() {
    console.log('Disconnected to mongoose ...');
});


//export db for use
module.exports.db = db;