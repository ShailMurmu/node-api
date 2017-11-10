var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp',{autoReconnect: true}).then((result) => {
    console.log('database connection established');
}, (err) => {
    console.log('Unable to connect database');
});

module.exports = {mongoose};