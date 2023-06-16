import { getParameter, loadHeaderFooter } from './utils.mjs';
import { updateCartCount } from './superscript.mjs';
import { login } from './auth.mjs';

loadHeaderFooter()
  .then(() => {
    updateCartCount();
    const redirect = getParameter('redirect');

    document.querySelector('#login').addEventListener('click', (e) => {
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      login({ email, password }, redirect);
    });
  })
  .catch((error) => {
    alert('Error loading header and footer: ' + error);
  });
