const {MongoClient} = require('mongodb');

const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const ObjectId = require("mongodb").ObjectID;

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());


// connect to database

async function main(){

  const MONGODB_URI = 'mongodb+srv://jeremie:root@cluster0.ayat8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  const MONGODB_DB_NAME = 'clearfashion';
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true, 'useUnifiedTopology': true });
  const db =  client.db(MONGODB_DB_NAME);
  console.log('connected');

  const collection = db.collection('products');

  return collection
}

// Base endpoint
app.get('/', (request, response) => {
  response.send({'ack': true});
});

// First endpoint

app.get("/products/:id", async (request, response) => {
  var collection=await main();
  collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result);
  });
});

// Second endpoint, find by brand

app.get("/products/search?:brand=a", async (request, response) => {
  var collection= await main();
  collection.findAll({ "brand": request.params.a }, (error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result);
  });
});


app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);


