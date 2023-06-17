import productList from './productList';
import { loadHeaderFooter, getParameter } from './utils.mjs';
import { updateCartCount } from './superscript.mjs';
import { checkLogin } from './auth.mjs';

const category = getParameter('category');
productList('.product-list', category);

loadHeaderFooter()
  .then(() => {
    updateCartCount();
    document.querySelector('.title').innerHTML = toTitleCase(category);
  })
  .catch((error) => {
    alert('Error loading header and footer: ' + error);
  });

function toTitleCase(str) {
  return str.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
