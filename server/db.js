const {MongoClient} = require('mongodb');

const MONGODB_URI = 'mongodb+srv://jeremie:root@cluster0.ayat8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';
const sandbox = require('./sandbox.js');

//sandbox.sandbox();
const products = require('./products.json');

async function insert(products) {

  let client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  let db =  client.db(MONGODB_DB_NAME)
  
  let collection = db.collection('products');
  let result = collection.insertMany(products);
  
  }

  async function main(){
    const MONGODB_URI = 'mongodb+srv://jeremie:root@cluster0.ayat8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    const MONGODB_DB_NAME = 'clearfashion';
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true, 'useUnifiedTopology': true });
    const db =  client.db(MONGODB_DB_NAME);
    console.log('connected');
  
    const collection = db.collection('products');
    
    console.log(collection);

  
    //const b = 'adresse';
    //const sortbrand = collection.find({brand : b}).toArray();
    //console.log("Products by brand :");
    //console.log(sortbrand);
  
    //const prix = 100;
    //const cheaperPrice = collection.find({ price : { $lt : prix}}).toArray();
    //console.log(`Products costs lower than ${prix} € :`);
    //console.log(cheaperPrice);
  
    //const sortedPrice = collection.find({$sort : { price : 1}}).toArray();
    //console.log("Products sorted by price :");
    //console.log(sortedPrice);
  }




//insert(products);
main()


