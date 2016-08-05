var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//defines Book schema for Mongo
var bookModel = new Schema({
    title: {type: String},
    author: {type: String},
    genre: {type: String},
    read: {type: Boolean, default: false}
});

//export Model for use
module.exports = mongoose.model('Book', bookModel);