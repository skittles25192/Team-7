import { setLocalStorage, getLocalStorage, alertMessageDuration, removeAllAlerts} from './utils.mjs';
import { findProductById } from './externalServices.mjs';
import buzzAnimation from './buzzAnimation.js';

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  const product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails(product);
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById('addToCart').addEventListener('click', () => {
    addProductToCart(product);
    buzzAnimation();
    removeAllAlerts();
    alertMessageDuration('The product has been added');
  });
}

function addProductToCart(product) {
  const currentCart = getLocalStorage('so-cart') || [];
  const updatedCart = [...currentCart, product];
  setLocalStorage('so-cart', updatedCart);
}


function renderProductDetails(product) {
  document.querySelector('#productName').innerText = product.Brand.Name;
  document.querySelector('#productNameWithoutBrand').innerText = product.NameWithoutBrand;
  document.querySelector('#productImage').src = product.Images.PrimaryLarge;
  document.querySelector('#productImage').alt = product.Name;
  document.querySelector('#productFinalPrice').innerText = product.FinalPrice;
  document.querySelector('#productColorName').innerText = product.Colors[0].ColorName;
  document.querySelector('#productDescriptionHtmlSimple').innerHTML = product.DescriptionHtmlSimple;
  document.querySelector('#addToCart').dataset.id = product.Id;
}

