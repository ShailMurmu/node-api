var express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');
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
            Users: doc,
            signalStrength: 'high'
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
        res.send({Todo: doc,
                 signalStrength: 'high'});
    }, (err) => {
        res.status(400).send(err);
    });
    
});


// ROUTE FOR REMOVE TODO
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).send('Id not valid');
    }
    
    Todo.findByIdAndRemove(id).then((doc) => {
        if(!doc){
            return res.send('No match found');
        }
        res.send({DeletedDoc: doc});
    }, (err) => {
        res.status(400).send(err);
    });
});

//ROUTE FOR UPDATE PATCH
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
    
    if(!ObjectId.isValid(id)){
        return res.status(404).send('Id not valid');
    }
    
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
    
    Todo.findByIdAndUpdate(id, {$set:body},{new: true}).then((doc) => {
        if(!doc){
        return res.status(404).send('doc with this id doesnot exist');
        }
        res.send({Updated: doc});
    },(err) => {
        res.status(400).send('Unable to updated doc');
    });
    
}, (err) => {
    res.status(400).send(err);
});



app.listen(2500, () => {
    console.log('Listening on port 2500');
});

