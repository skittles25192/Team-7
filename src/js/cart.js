import { loadHeaderFooter } from './utils.mjs';
import { updateCartCount } from './superscript.mjs';
import shoppingCart from './shoppingCart.mjs';

loadHeaderFooter()
  .then(() => {
    updateCartCount();
  })
  .catch((error) => {
    alert('Error loading header and footer: ' + error);
  });
shoppingCart();
