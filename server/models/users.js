var mongoose = require('mongoose');

var Users = mongoose.model('Users',{
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 4
    }
});

module.exports = {Users};