var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./models/book.model');
//var db = require('./models/db');


var app = express();
var port = process.env.PORT || 8070;
var bookRouter = require('./routes/book.routes')(Book); 
var db = mongoose.connect('mongodb://localhost/bookDb');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
    res.send('welcome to my API');
});

app.listen(port, function() {
    console.log('Running on port: ' + port);
});