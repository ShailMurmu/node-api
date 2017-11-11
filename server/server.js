var express = require('express');
var bodyParser = require('body-parser');
var {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {Users} = require('./models/users');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        completedAt: req.body.completedAt,
        completed: req.body.completed
    });
    
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });

});

app.post('/users', (req, res) => {
    var user = new Users({
        email: req.body.email,
        password: req.body.password
    });
    
    user.save().then((doc) => {
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
app.get('/todos', (req, res) => {
    Todo.find().then((doc) => {
        res.send({
            Users: doc
        });
    }, (err) => {
        res.send(err);
    });
});


app.get('/users', (req, res) => {
    Users.find().then((doc) => {
        res.send({
            Users: doc
        });
    }, (err) => {
        res.send(err);
    });
});


//REQUEST USING URL PARAMETER IN GET /
app.get('/todos/:id',(req, res) => {
    //res.send(req.params);
    
//    res.send(ObjectId.isValid(req.params.id));
    
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).send('Id not valid');
    }
    
    Todo.findById(id).then((doc) => {
        if(!doc){
            return res.send('No Result found');
        }
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
    
});


app.listen(3000, () => {
    console.log('Listening on port 3000');
});
