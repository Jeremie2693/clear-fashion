const fetch = require('node-fetch');
const cheerio = require('cheerio');



/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
    const $ = cheerio.load(data);
  
    return $('.item')
      .map((i, element) => {


        const link =$(element)
          .find('.product-name a')
          .attr('href')
        

        const brand ='Montlimart'


        const name = $(element)
          .find('.product-name a')
          .attr('title')


        const price = parseFloat(
          $(element)
            .find('.price')
            .text()
        );

        const photo=$(element)
          .find('.product-image img')
          .attr('src')

          
        const released=$(element)
          .find('.productList-')
          .text()
        return {link,brand,name, price,photo};

      })
      .get();
  };
  
  /**
   * Scrape all the products for a given url page
   * @param  {[type]}  url
   * @return {Array|null}
   */
  module.exports.scrape = async url => {
    try {
      const response = await fetch(url);

      if (response.ok) {
        const body = await response.text();
        
        return parse(body);
      }
  
      console.error(response);
  
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  