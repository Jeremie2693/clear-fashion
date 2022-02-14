/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const adresseParisbrand = require('./sources/AdresseParisbrand');
const montlimartbrand = require('./sources/Montlimartbrand');
var fs = require('fs');
const {MongoClient} = require('mongodb');



async function sandbox_Dedicated (eshop = 'https://www.dedicatedbrand.com/en/men') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);

    const products_Links = await dedicatedbrand.scrapeLinks(eshop);

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

async function sandbox_montlimart(eshop = 'https://www.montlimart.com/toute-la-collection.html') {
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


async function sandbox() {
  const [,, eshop] = process.argv;

  const products = [];
  productDedicated = await sandbox_Dedicated(eshop);
  for (let j=0; j<productDedicated.length;j++){
    products.push(productDedicated[j])
  }
  productMontlimart = await sandbox_montlimart(eshop);

  for (let j=0; j<productMontlimart.length;j++){
    products.push(productMontlimart[j])
  }
  productAddresse = await sandbox_addresse(eshop);
  for (let j=0; j<productAddresse.length;j++){
    products.push(productAddresse[j])
  }
  console.log('Scraping and insertion done')
  //console.log(products)
  var jsonData = JSON.stringify(products, null, 2);

  fs.writeFile("products.js", jsonData, function(err) {
    if (err) {
       console.log(err);
    }
  });
  return products;


}



sandbox();


