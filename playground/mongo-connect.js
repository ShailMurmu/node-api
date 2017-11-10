const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
    if(err) {return console.log('Unable to connect to MongoDB server');}
    console.log('Connected to MongoDB server');
    
    db.collection('Users').insertOne({
        name: 'Shailendra',
        age: 24,
        location: 'Bit Mesra'
    }, (err, res) => {
        if(err) {return console.log('Unable to insert user');}
        console.log(JSON.stringify(res.ops, undefined, 2));
    });
    
    db.close();
});