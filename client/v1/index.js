// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable

const cheapest_tshirt='https://www.loom.fr/products/le-t-shirt';
console.log(cheapest_tshirt)


/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable

const number_product=marketplace.length;
console.log(number_product)


// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have


const brands_name= [];
marketplace.forEach(function (product){
    brands_name.push(product.brand)
});
const unique_brands_name= new Set(brands_name);
console.log(unique_brands_name)
console.log(unique_brands_name.size)




// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable

function Sort_price(market){
  return market.sort(function (product1,product2){ return(product1.price >= product2.price) })
};

let sortbyprice=Sort_price(marketplace);
console.table(sortbyprice)



// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable


function Sort_date(market){
  return market.sort(function (date1,date2){ return(new Date(date1.date) < new Date(date2.date)) })
};

let sortbydate=Sort_date(marketplace);
console.table(sortbydate)





// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list
var market=marketplace;

let FiltrerPrice50100=market.filter((product) => product.price > 50 && product.price < 100 );
console.table(FiltrerPrice50100)




// 🎯 TODO: Average Basket
// 1. Determine the average basket of the marketplace
// 2. Log the average

function Avg(product) {
  var i = 0, summ = 0, product_len = product.length;
  while (i < product_len) {
      summ = summ + product[i++].price;
}
  return summ / product_len;
}
var market=marketplace;

var basket_list = market.filter((product) => (product.name).indexOf("basket")!=-1 );
console.table(basket_list)

var average_price_basket = Avg(basket_list);
console.log(average_price_basket)




/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands


var Array_unique_brands_name=Array.from(unique_brands_name);
var brands= {};

for (let i = 0; i < Array_unique_brands_name.length; i++){
    var market=marketplace;
    var brands_list = market.filter((product) => product.brand.indexOf(Array_unique_brands_name[i])!=-1 );

    brands[Array_unique_brands_name[i]]=brands_list;

}

console.table(brands)
console.log(brands)



//const Array_brands=Array.from(brands);
var keys = Object.keys(brands);
var key;
for (let i = 0; i < keys.length; i++){
  key=keys[i];
  console.log(key + " = " + brands[key].length);

}






// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort
function Sort_price_DESC(market){
  return market.sort(function (product1,product2){ return(product1.price <= product2.price) })
};
var market=marketplace;

var keys = Object.keys(brands);
var key;
for (let i = 0; i < keys.length; i++){
  key=keys[i];
  brands[key]=Sort_price_DESC(brands[key]);
}

console.log(brands)



// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort

function Sort_date_DESC(market){
  return market.sort(function (date1,date2){ return(new Date(date1.date) > new Date(date2.date)) })
};
var market=marketplace;

var keys = Object.keys(brands);
var key;
for (let i = 0; i < keys.length; i++){
  key=keys[i];
  brands[key]=Sort_date_DESC(brands[key]);
}

console.log(brands)




/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products


function p90(market){
  let sortpricemarket=market.sort(function (product1,product2){ return(product1.price <= product2.price)});
  let len_brands=sortpricemarket.length;
  return sortpricemarket[parseInt(0.9*len_brands)].price
};

var market=marketplace;

var keys = Object.keys(brands);
var key;
for (let i = 0; i < keys.length; i++){
  key=keys[i];
  brands[key]=p90(brands[key]);
}

console.log(brands)




/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.
var new_product=[];
for (let i = 0; i < COTELE_PARIS.length; i++){
  var currentTime = new Date()
  currentTime.setDate(currentTime.getDate()-14);
  if (new Date(COTELE_PARIS[i].released)<=new Date(currentTime.setDate(currentTime.getDate()-14))){
    console.log(COTELE_PARIS[i])
    new_product.push(COTELE_PARIS[i])
  }

}
console.table(new_product)




// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€




// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product
var cot=COTELE_PARIS;

var product_uuid1=cot.find((product) => (product.uuid)=="b56c6d88-749a-5b4c-b571-e5b5c6483131");
console.log(product_uuid1)

// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product
delete COTELE_PARIS[COTELE_PARIS.indexOf(product_uuid1)];
console.log(COTELE_PARIS);


// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

console.log(blueJacket);
console.log(jacket);


// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?
// when we duplicate a varriables we assign the same local space so the same reference, they are the same objects
//if we change one (here jacket) we change also the other (blueJacket)

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties
jacket=Object.create(blueJacket);
jacket.favorite = true;

console.log(blueJacket);
console.log(jacket);



/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage

