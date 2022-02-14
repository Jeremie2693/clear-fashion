const {MongoClient} = require('mongodb');

const MONGODB_URI = 'mongodb+srv://jeremie:root@cluster0.ayat8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';
const products = require('./products.json');

async function insert(products) {

  let client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  let db =  client.db(MONGODB_DB_NAME)
  
  let collection = db.collection('products');
  let result = collection.insertMany(products);
  
  }
insert(products);

