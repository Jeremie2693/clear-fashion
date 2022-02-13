const fetch = require('node-fetch');
const cheerio = require('cheerio');



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

        const released=$(element)
          .find('.productList-')
          .text()
        return {link,brand,name, price,photo};

      })
      .get();
  };
  

const parseLinkspage = data => {
  const $ = cheerio.load(data);

  return $('.js-cmsModule')
    .map((i, element) => {
      var href= $(element)
        .find('a')
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