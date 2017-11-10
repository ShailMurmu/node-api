const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
    if(err) {return console.log('Unable to connect to MongoDB server');}
    console.log('Connected to MongoDB server');
    
//   db.collection('Users').deleteMany({name: 'Shailendra'}).then((res) => {
//       console.log(res);
//   }, (err) => {
//       console.log('Unable to delete users ',err);
//   });
    
    db.collection('Users').findOneAndDelete({_id: new ObjectId('5a04b6be9edb2e1e3c8e66fa')}).then((res) => {
       console.log(res);
   }, (err) => {
       console.log('Unable to delete users ',err);
   });
    
    db.close();
});