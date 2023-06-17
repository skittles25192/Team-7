import { getParameter, loadHeaderFooter } from './utils.mjs';
import productDetails from './productDetails.mjs';
import { updateCartCount } from './superscript.mjs';

const productId = getParameter('product');

// productDetails(productId)
//     .then(() => {
//         loadHeaderFooter()
//             .then(() => {
//                 updateCartCount();
//                 const addToCartBtn = document.querySelector('#addToCart');
//                 if (addToCartBtn) {
//                     addToCartBtn.addEventListener('click', () => {
//                     updateCartCount();
//                     });
//                 }
//                 })
//             .catch((error) => {
//             alert('Error loading header and footer: ' + error);
//         });
//     });

async function loadAsyncFn() {
  try {
    await productDetails(productId);
    await loadHeaderFooter();

    updateCartCount();
    const addToCartBtn = document.querySelector('#addToCart');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        updateCartCount();
      });
    }
  } catch (error) {
    alert('Error loading header and footer or Product Details: ' + error);
  }
}

loadAsyncFn();
