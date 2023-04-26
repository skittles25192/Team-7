import { setLocalStorage, getLocalStorage } from './utils.mjs';
import { findProductById } from './productData.mjs';

function addProductToCart(product) {
  const currentCart = getLocalStorage('so-cart') || [];
  const updatedCart = [...currentCart, product];
  setLocalStorage('so-cart', updatedCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
