const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');



/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
    const $ = cheerio.load(data);
  
    return $('.productList-container .productList')
      .map((i, element) => {
        const link =`https://www.dedicatedbrand.com${ $(element)
          .find('a.productList-link')
          .attr('href')
          }`

        

        const brand ='dedicated'


        const name = $(element)
          .find('.productList-title')
          .text()
          .trim()
          .replace(/\s/g, ' ');
        const price = parseFloat(
          $(element)
            .find('.productList-price')
            .text()
        );

        const photo=$(element)
          .find('.productList-image img')
          .attr('data-src')

          
        const uuid=uuidv5(link, uuidv5.URL)

        const date = new Date();
        const released= date.toLocaleDateString()

  

        return {link,brand,name, price,photo,uuid,released};

      })
      .get();
  };
  

const parseLinkspage = data => {
  const $ = cheerio.load(data);

  return $('a')
    .map((i, element) => {
      var href= $(element)
        .attr('href');
      links="https://www.dedicatedbrand.com"+href;
      return {links};
    })
    .get()
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
  
  // scrape the links of all the page of the header
  module.exports.scrapeLinks = async url => {
    try {
      const response = await fetch(url);

      if (response.ok) {
        const body = await response.text();
        
        return parseLinkspage(body);
      }
  
      console.error(response);
  
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };