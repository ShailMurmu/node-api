const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
    if(err) {return console.log('Unable to connect to MongoDB server');}
    console.log('Connected to MongoDB server');
    
//   db.collection('Users').deleteMany({name: 'Shailendra'}).then((res) => {
//       console.log(res);
//   }, (err) => {
//       console.log('Unable to delete users ',err);
//   });
    
//    db.collection('Users').findOneAndDelete({_id: new ObjectId('5a05a2bcef5513084478e8d6')}).then((res) => {
//       console.log(res);
//   }, (err) => {
//       console.log('Unable to delete users ',err);
//   });
    
     db.collection('Users').findOneAndDelete({name: 'Shailendra'}).then((res) => {
       console.log(res);
   }, (err) => {
       console.log('Unable to delete users ',err);
   });
    
    db.close();
});