import { loadHeaderFooter } from './utils.mjs';
import { updateCartCount } from './superscript.mjs';

loadHeaderFooter()
  .then(() => {
    updateCartCount();
  })
  .catch((error) => {
    alert('Error loading header and footer: ' + error);
  });
