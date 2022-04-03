const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
//const db =require('./db/index.js');

const {MongoClient} = require('mongodb');
const ObjectId = require("mongodb").ObjectID;

const { calculateLimitAndOffset, paginate } = require('paginate-info');

require('dotenv').config()
const MONGODB_URI = 'mongodb+srv://jeremie:root@cluster0.ayat8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'clearfashion';

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

//Base Endpoint
app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.listen(PORT);

async function fetch_collection()
{
  const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
  const db =  await client.db(MONGODB_DB_NAME);
  const collection = await db.collection('products');

  return collection;
}



//Second Endpoint : search

app.get("/products/search/", async (request, response) => {
  let collection = await fetch_collection();
  console.log(collection)

  var filters = {};

  var limit = 12;
  if ('limit' in request.query) 
  {
    limit = parseInt(request.query.limit);
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
    case 'dateasc':
      sort = {date: 1};
      break;
    case 'datedesc':
      sort = {date: -1};
      break;
  }

  var brand;
  if ('brand' in request.query)
  {
    brand = request.query.brand;
    filters['brand'] = brand;
  }
  
  var minprice;
  if ('minprice' in request.query)
  {
    minprice = parseInt(request.query.minprice);
  }

  var maxprice;
  if ('maxprice' in request.query)
  {
    maxprice = parseInt(request.query.maxprice);
  }

  if (minprice != null || maxprice != null)
  {
    filters['price'] = {};
    if (minprice != null)
    {
      filters['price']['$gt'] = minprice;
    }
    if (maxprice != null)
    {
      filters['price']['$lt'] = maxprice;
    }
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


//First Endpoint : find id
app.get("/products/:id", async (request, response) => {
  let collection = await fetch_collection();
  console.log(collection)
  collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result);
      console.log(result)

  });
});


// Third endpoint : all brands 
app.get("/brands/", async (request, response) => {
  let collection = await fetch_collection();
  console.log(collection)
  try
  {
    const brands = await collection.distinct("brand");
    const result = new Array();
    brands.forEach(brand =>{result.push(brand);});
    response.send(result);
  }
  catch (error) 
  {
    console.log('Error: brands');
    response.status(500).send(error);
  }
});

console.log(`📡 Running on port ${PORT}`);