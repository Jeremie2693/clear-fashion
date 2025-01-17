/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const adresseParisbrand = require('./sources/AdresseParisbrand');
const montlimartbrand = require('./sources/Montlimartbrand');
const loombrand=require('./sources/loom');
var fs = require('fs');
const {MongoClient} = require('mongodb');



async function sandbox_Dedicated(eshop = 'https://www.dedicatedbrand.com/en/men/all-men?limit=all') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);

    //const products_Links = await dedicatedbrand.scrapeLinks(eshop);

    //console.log(products);
    //console.log('done');
    //process.exit(0);
    return products

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}


async function sandbox_addresse(eshop = 'https://adresse.paris/630-toute-la-collection') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await adresseParisbrand.scrape(eshop);

    //console.log(products);
    //console.log('done');
    //process.exit(0);
    return products

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function sandbox_montlimart(eshop = 'https://www.montlimart.com/toute-la-collection.html?limit=all') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await montlimartbrand.scrape(eshop);


    //console.log(products);
    //console.log('done');
    //process.exit(0);
    return products

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function sandbox_loom(eshop = 'https://www.loom.fr/collections/tous-les-vetements') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await loombrand.scrape(eshop);

    //console.log(products);
    //console.log('done');
    //process.exit(0);
    return products

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}


async function sandbox() {
  const [,, eshop] = process.argv;

  const products = [];
  productDedicated = await sandbox_Dedicated(eshop);
  for (let j=0; j<productDedicated.length;j++){
    if (productDedicated[j].price !=null){
      products.push(productDedicated[j])
    }
  }

  productMontlimart = await sandbox_montlimart(eshop);
  for (let j=0; j<productMontlimart.length;j++){
    if (productMontlimart[j].price !=null){
      products.push(productMontlimart[j])
    }
  }

  productAddresse = await sandbox_addresse(eshop);
  for (let j=0; j<productAddresse.length;j++){
    if (productAddresse[j].price  !=null){
      products.push(productAddresse[j])
    }
  }

  productLoom = await sandbox_loom(eshop);
  for (let j=0; j<productLoom.length;j++){
    if (productLoom[j].price  !=null){
      products.push(productLoom[j])
    }
  }

  console.log('Scraping and insertion done in products.json')
  //console.log(products)
  var jsonData = JSON.stringify(products, null, 2);

  fs.writeFile("products.json", jsonData, function(err) {
    if (err) {
       console.log(err);
    }
  });
  return products;


}
module.exports.sandbox=sandbox();


//sandbox();


