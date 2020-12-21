/**
 * Todo contoller which will handle the ToDo app flow.
 */

// Bod parser for the UI items
var bodyParser = require('body-parser');

// Create MngoDb and create connection to the application.
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://todo:dudu@cluster0.7911h.mongodb.net/TO-DUDU?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Create the DB schema.
var todoSchema = new mongoose.Schema({
    item: String
});
var ToDudu = mongoose.model('ToDo', todoSchema);

var item1 = ToDudu({ item: "Buy Chocolates" }).save(function(err) {
    if (err) throw err;
    console.log('item saved');
});

const { response } = require('express');

//Middleware for the APIs
var urlEncodedParser = bodyParser.urlencoded({ extended: false });

var data = [{ item: 'Study on XX' }, { item: 'read on XX' }];

module.exports = function(app) {
    // Get ToDO
    app.get('/todo', function(req, resp) {
        resp.render('todo', { todos: data });
    });

    //Post ToDo
    app.post('/todo', urlEncodedParser, function(req, resp) {
        data.push(req.body);
        resp.json(data);
    });

    //Delete ToDo
    app.delete('/todo/:item', function(req, resp) {
        data = data.filter(function(todo) {
            return todo.item.replace(/ /g, '') !== req.params.item;
        });
        resp.json(data);
    });

}