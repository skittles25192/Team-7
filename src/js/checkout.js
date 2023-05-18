import { loadHeaderFooter } from './utils.mjs';
import { updateCartCount } from './superscript.mjs';

loadHeaderFooter()
  .then(() => {
    updateCartCount();
    const addToCartBtn = document.querySelector('#addToCart');
    if(addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        updateCartCount();
      });
    }
  })
  .catch((error) => {
    alert('Error loading header and footer: ' + error);
  });