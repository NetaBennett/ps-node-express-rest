var express = require('express');

var routes = function(Book) {

var bookRouter = express.Router();

bookRouter.route('/')
    .get(function(req, res) {

        //var query = req.query;
        var query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        if (req.query.title) {
            query.title = req.query.title;
        }
        if (req.query.author) {
            query.author = req.query.author;
        }

        Book.find(query, function(err, books) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }else {
                res.json(books);
            }
        });       
    })
    .post(function(req, res) {
        var b = new Book(req.body); //utilizes body parser to translate json
        console.log(b);
        b.save();
        res.status(201).send(b);


    });
 
    bookRouter.route('/books/:bookId')
        .get(function(req, res) {

            Book.findById(req.params.bookId, function(err, book) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }else {
                    res.json(book);
                }
            });       
        });

    return bookRouter;
};

module.exports = routes;