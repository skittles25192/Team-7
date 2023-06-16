import { loadHeaderFooter } from './utils.mjs';
import { updateCartCount } from './superscript.mjs';
import { checkLogin } from './auth.mjs';

checkLogin();

loadHeaderFooter()
  .then(() => {
    updateCartCount();
  })
  .catch((error) => {
    alert('Error loading header and footer: ' + error);
  });
