var express = require('express');

var routes = function(Book) {

var bookRouter = express.Router();

bookRouter.route('/')
    .get(function(req, res) {

        //var query = req.query;
        var query = getQueryParams(req);
        
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
    })
    .delete(function(req, res) {
            req.book.remove(function(err) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }else {
                   res.status(204).send('Removed');
                }
            });    
        });
 
    bookRouter.route('/:bookId')
        .get(function(req, res) {

            Book.findById(req.params.bookId, function(err, book) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }else {
                    res.json(book);
                }
            });       
        })
        .put(function(req, res) {

            Book.findById(req.params.bookId, function(err, book) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }else {
                    book.title = req.body.title;
                    book.author = req.body.author;
                    book.genre = req.body.genre;
                    book.read = req.body.read;
                    book.save();
                    res.json(book);
                }
            });       
        })
        .delete(function(req, res) {

            Book.findById(req.params.bookId, function(err, book) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }else {
                    book.remove();
                    res.status(204).send('Removed');
                }
            }); 

        });

    return bookRouter;
};

function getQueryParams(req) {
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
    return query;
}
module.exports = routes;