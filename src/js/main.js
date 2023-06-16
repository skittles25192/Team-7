import { loadHeaderFooter } from './utils.mjs';
import { updateCartCount } from './superscript.mjs';
import { checkLogin } from './auth.mjs';

loadHeaderFooter()
  .then(() => {
    updateCartCount();
    checkLogin();
  })
  .catch((error) => {
    alert('Error loading header and footer: ' + error);
  });
