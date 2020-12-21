var express = require('express');
var app = express();
var todoController = require('./controllers/todoController');

// Set the view engine.
app.set('view engine', 'ejs');

// Set the static folder.
app.use(express.static('./public'));

// Set the Controller.
todoController(app);

// Port number
app.listen(3000);