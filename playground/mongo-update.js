const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
    if(err) {return console.log('Unable to connect to MongoDB server');}
    console.log('Connected to MongoDB server');
    
    db.collection('Users').findOneAndUpdate({name: 'Andrew'}, {$set: {name: 'Ankit'}, $inc: {age: 5}}, {returnOriginal: false}).then((doc) => {
        console.log(doc);
    });
    
    db.close();
});