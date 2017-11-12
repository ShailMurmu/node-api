
var {ObjectId} = require('mongodb');

var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todos');
var {Users} = require('./../server/models/users');


//REMOVE ALL
//Todo.remove({}).then((doc) => {
//    // do with doc
//}, (err) => {
//     // Handle error
//});


//Todo.findByIdAndRemove('5a05bf2d5ceb800d1c5d3e0b').then((doc) => {
//    console.log(doc);
//}, (err) => {
//    console.log('Unable to remove this doc');
//});


Todo.findOneAndRemove({_id: '5a05e4a834d7d607dcd73b24'}).then((doc) => {
    console.log(doc);
}, (err) => {
    console.log('Unable to remove this doc');
});

