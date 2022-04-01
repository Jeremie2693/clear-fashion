// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let currentFavorite = [];
let checkFavorite = 0;


// inititiate selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');


const selectPrice = document.querySelector('#filter-price');
const selectReleased = document.querySelector('#filter-released');
const selectFavorite = document.querySelector('#filter-favorite');


const selectBrands= document.querySelector('#brand-select');
const selectsort = document.querySelector('#sort-select');

const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const spanNbRecentProducts = document.querySelector('#nbNewProducts');
const spanP50 = document.querySelector('#p50');
const spanP90 = document.querySelector('#p90');
const spanP95 = document.querySelector('#p95');

const spanLastReleased=document.querySelector('#LastReleased');




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
      //old api
      //`https://clear-fashion-api.vercel.app?page=${page}&size=${size}`
      //
      `https://server-sigma-ashen.vercel.app//products/search?page=${page}&size=${size}`,
      //{ headers: {origin: null} }
      
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
      if(currentFavorite.includes(product)==true)
      {
  			return `
      	<div class="product" id=${product.uuid}>
            <input name="add_favorite_product" type="checkbox"  id='${product.name}' >
        		<span>${product.brand}</span>
        		<a href="${product.link}">${product.name}</a>
        		<span>${product.price}</span>
      	</div>
      `;
      }
      else
      {
                return `
        <div class="product" id=${product.uuid}>
           <input name="add_favorite_product" type="checkbox"  id='${product.name}' >
            <span>${product.brand}</span>
            <a href="${product.link}">${product.name}</a>
            <span>${product.price}</span>
        </div>
      `;
      }
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
const renderIndicators = (products,pagination) => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
  //Feature 9 - Number of recent products indicator
  spanNbRecentProducts.innerHTML = NBFilterRecentProduct(products);
  
  //Feature 10 - p50, p90 and p95 price value indicator

  spanP50.innerHTML=p(0.50,products);
  spanP90.innerHTML=p(0.90,products);
  spanP95.innerHTML=p(0.95,products);
  //Feature 11 - Last released date indicator

  spanLastReleased.innerHTML=LastReleased(products);
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
  
  let currentTime = new Date();
  let twoweekago = new Date(currentTime.setDate(currentTime.getDate()-14));
  
  for (let i = 0; i < products.length; i++){
    if (new Date(products[i].released)>=twoweekago){
      new_product.push(products[i])
    }
  
  }
  renderProducts(new_product);
}
function NBFilterRecentProduct(products){
  var new_product=[];
  let currentTime = new Date();
  let twoweekago = new Date(currentTime.setDate(currentTime.getDate()-14));
  
  for (let i = 0; i < products.length; i++){
    if (new Date(products[i].released)>=twoweekago){
      new_product.push(products[i])
    }
  
  }
  return(new_product.length);
}

// Filter by older products

function FilterOldProduct(products){
  var old_product=[];
  
  let currentTime = new Date();
  let twoweekago = new Date(currentTime.setDate(currentTime.getDate()-14));
  
  for (let i = 0; i < products.length; i++){
    if (new Date(products[i].released)<=twoweekago){
      old_product.push(products[i])
    }
  
  }
  renderProducts(old_product)
}



//Feature 4 - Filter by reasonable price

function FilterReasonableprice(products)
{
  var cheapest_product=products.filter((product) => product.price < 50);
  renderProducts(cheapest_product)
}


//- Filter  by expensive price

function FilterExpensiveprice(products)
{
  var cheapest_product=products.filter((product) => product.price > 200);
  renderProducts(cheapest_product)
}

//Feature 5 - Sort by price
//Feature 6 - Sort by date

//Desc
function Sort_price_DESC(products){
  renderProducts(products.sort(function (product1,product2){ return(product1.price <= product2.price) }))
};

//Asc
function Sort_price_ASC(products){
  renderProducts(products.sort(function (product1,product2){ return(product1.price >= product2.price) }))
};

//Feature 6 - Sort by date
//DESC the oldest to the newest
function Sort_date_DESC(products){
  renderProducts( products.sort(function (date1,date2){ return(new Date(date1.date) > new Date(date2.date)) }))
};
//ASC the most recent product to the oldest product
function Sort_date_ASC(products){
  renderProducts( products.sort(function (date1,date2){ return(new Date(date1.date) < new Date(date2.date)) }))
};

  //Feature 9 - Number of recent products indicator

function NBFilterRecentProduct(products){
  var new_product=[];
  let currentTime = new Date();
  let twoweekago = new Date(currentTime.setDate(currentTime.getDate()-14));
  
  for (let i = 0; i < products.length; i++){
    if (new Date(products[i].released)>=twoweekago){
      new_product.push(products[i])
    }
  
  }
  return(new_product.length);
}

//Feature 10 - p50, p90 and p95 price value indicator
function p(percentile,products){
  let sortpricemarket=products.sort(function (product1,product2){ return(product1.price >= product2.price)});
  let len_brands=sortpricemarket.length;
  return products[parseInt(percentile*len_brands)].price
};

//Feature 11 - Last released date indicator


function LastReleased(products){
  let SortedReleasedProducts = products.sort(function (product1,product2){ return(product1.released <= product2.released)});
  return (SortedReleasedProducts[0].released);
}

//Feature 12 - Save as favorite

function addfavorite(product){
  if(currentFavorite.includes(product) == false)
  {
    currentFavorite.push(product)
  }
  else if(currentFavorite.includes(product) == true)
  {
    for(var i = 0; i < currentFavorite.length; i++)
    {
      if(currentFavorite[i] == product)
      {
        currentFavorite.splice(i,1);
      }
    }
  }
}

//Feature 4 - Filter by favorite

function Favorite() {
  if(checkFavorite == 0)
  {
    checkFavorite = 1;
    renderProducts(currentFavorite);
  }
  else
  {
    checkFavorite = 0;
    renderProducts(currentProducts);
  }
}





//Render Page


const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(products,pagination);
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
  if (event.target.value == "all"){

    fetchProducts(currentPagination.currentPage,139)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination.pageSize));
  }
  else{
    fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
  }

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
selectReleased.addEventListener('click', event => {
  FilterRecentProduct(currentProducts)
});

//Feature 4 - Filter by reasonable price
selectPrice.addEventListener('click', event => {
  FilterReasonableprice(currentProducts)
});

//FilterExpensiveprice(currentProducts)
//FilterOldProduct(currentProducts)




//Feature 5 - Sort by price
//Feature 6 - Sort by date
selectsort.addEventListener('change', event => {
  let evenenment=event.target.value
  switch (evenenment) {
    case 'price-asc':
      Sort_price_ASC(currentProducts)
      break;
    case 'price-desc':
      Sort_price_DESC(currentProducts)
      break;
    case 'date-asc':
      Sort_date_ASC(currentProducts)

      break;
    case 'date-desc':
      Sort_date_DESC(currentProducts)
      break;
  }
});

selectFavorite.addEventListener('click', event => {
    Favorite()
});







