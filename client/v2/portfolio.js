// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// inititiate selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');

const selectBrands= document.querySelector('#brand-select');

const selectsort = document.querySelector('#sort-select');

const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');



/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();
    
    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price} € </span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
};

// List of Brands
function Market_Brands(marketplace){
  const brands_name= [];
  marketplace.forEach(function (product){
      brands_name.push(product.brand)
  });
  const unique_brands_name= new Set(brands_name);
  return Array.from(unique_brands_name)
}


/**
 * Render page selector
 * @param  {Object} brands
 */
const renderBrands = brands => {
  const options = Array.from(
    {'length': brands.length},
    (value, index) => `<option value="${brands[index]}">${brands[index]}</option>`
  ).join('');
  selectBrands.innerHTML = options;
};

function SortByBrands(products,brand){
  var Array_unique_brands_name=Market_Brands(products);
  var brands_product= {};
  for (let i = 0; i < Array_unique_brands_name.length; i++){
      var market=marketplace;
      var brands_list = market.filter((product) => product.brand.indexOf(Array_unique_brands_name[i])!=-1 );
      brands_product[Array_unique_brands_name[i]]=brands_list;}
  renderProducts(brands_product[brand]);
}

//Feature 2 - Filter by brands

function FilterBrand(products, brand){
    var brands_product = products.filter((product) => product.brand==brand);
    renderProducts(brands_product);
}


//Feature 3 - Filter by recent products

function FilterRecentProduct(products){
  var new_product=[];
  for (let i = 0; i < products.length; i++){
   var currentTime = new Date()
    currentTime.setDate(currentTime.getDate()-14);
    if (new Date(products[i].released)<=new Date(currentTime.setDate(currentTime.getDate()-14))){
      console.log(products[i])
      new_product.push(products[i])
    }
  }
  renderProducts(new_product)
}


// Filter by older products

function FilterOldProduct(products){
  var new_product=[];
  for (let i = 0; i < products.length; i++){
   var currentTime = new Date()
    currentTime.setDate(currentTime.getDate()-14);
    if (new Date(products[i].released)>=new Date(currentTime.setDate(currentTime.getDate()-14))){
      console.log(products[i])
      new_product.push(products[i])
    }
  }
  renderProducts(new_product)
}



//Feature 4 - Filter by reasonable price

function FilterReasonableprice(products)
{
  var cheapest_product=products.filter((product) => product.price < 50);
  renderProducts(cheapest_product)
}


//- Filter by expensive price

function FilterExpensiveprice(products)
{
  var cheapest_product=products.filter((product) => product.price > 200);
  renderProducts(cheapest_product)
}



const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  renderBrands(Market_Brands(products))

};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */

// Feature 0 - Show more

selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);

/*
document.addEventListener('DOMContentLoaded', async () =>{
  const products = await fetchProducts()
    setCurrentProducts(products)
    render(currentProducts, currentPagination);});
*/

//Feature 1 - Browse pages
selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value))
  .then(setCurrentProducts)
  .then(() => render(currentProducts, currentPagination))
});



//Feature 2 - Filter by brands

selectBrands.addEventListener('change', event => {
  FilterBrand(currentProducts, event.target.value)
  //let brands_product=SortByBrands(products)
  //SortByBrands(currentProducts,event.target.value)
  //renderProducts(brands_product[event.target.value])
  //renderProducts(brands_product);

});


//Feature 3 - Filter by recent products



selectsort.addEventListener('change', event => {
  let evenenment=event.target.value
  switch (evenenment) {
    case 'price-asc':
      FilterReasonableprice(currentProducts)
      break;
    case 'price-desc':
      FilterExpensiveprice(currentProducts)
      break;
    case 'date-asc':
      FilterRecentProduct(currentProducts)
      break;
    case 'date-desc':
      FilterOldProduct(currentProducts)
      break;

  }
});










