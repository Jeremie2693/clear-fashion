const {MongoClient} = require('mongodb');
//const db =require('./db/index.js');

const { calculateLimitAndOffset, paginate } = require('paginate-info');


const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const ObjectId = require("mongodb").ObjectID;

const MONGODB_URI = 'mongodb+srv://jeremie:root@cluster0.ayat8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';
const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());


// connect to database

async function main(){
  console.log("Trying to connect.");

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

// Second endpoint search

app.get("/products/search", async (request, response) => {

  var collection= await main();

  var filters = {};

  var limit = 12;
  //if the limit is given 

  if ('limit' in request.query) 
  {
    limit = parseInt(request.query.limit);
  }

  var size = 12;
  //if the limit is given 

  if ('size' in request.query) 
  {
    size = parseInt(request.query.limit);
  }

  var page = 1;
  if ('page' in request.query) 
  {
    console.log('Reading page');
    page = parseInt(request.query.page);
    console.log(page);
  }

  var sortby;
  if ('sortby' in request.query) 
  {
    sortby = request.query.sortby;
  }

  var sort = {name: 1} ;
  switch (sortby)
  {
    case 'priceasc':
      sort = {price: 1};
      break;
    case 'pricedesc':
      sort = {price: -1};
      break;
  }

  var brand;
  if ('brand' in request.query)
  {
    brand = request.query.brand;
    filters['brand'] = brand;
  }
  
  var price;
  if ('price' in request.query)
  {
    price = parseInt(request.query.price);
    filters['price'] = { $lt: price };
  }
  
  console.log(filters);

  const { offset } = calculateLimitAndOffset(page, limit);
  try
  {
    var result = await collection.find(filters).sort(sort).skip(offset).limit(limit).toArray();
    console.log(result);
    var count = await collection.find(filters).count();
    var meta = paginate(page, count, result, limit);
    meta.pageSize = limit;
    var data = {result, meta};
    var success = true;
    response.send({success, data});
  }

  catch (error) 
  {
    response.status(500).send(error);
  }
});


//third endpoint
app.get('/products/brands', async(request, response) => {
  let brands = await collection.aggregate([{$group : { _id : "$brand" }}]).toArray();
  brands = brands.map((brand) => brand._id);
  response.send({brands});
})

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
console.log("Connected to " + MONGODB_DB_NAME );

