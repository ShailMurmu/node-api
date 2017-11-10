var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {Users} = require('./models/users');

var app = express();

app.use(bodyParser.json());
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });

});

//newTodo.save().then((doc) => {
//    console.log('Saved todo:',doc);
//}, (err) => {
//    console.log('Unable to save todo');
//});



app.listen(3000, () => {
    console.log('Listening on port 3000');
});
