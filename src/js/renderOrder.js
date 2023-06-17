import { checkLogin } from './auth.mjs';
import currentOrders from './currentOrders.mjs';
import { loadHeaderFooter } from './utils.mjs';
import { updateCartCount } from './superscript.mjs';

loadHeaderFooter()
.then(() => {
    updateCartCount();
})
// currentOrders will need to send the token to the server with the request or it will be denied. if checkLogin will return the token upon success
const token = checkLogin();
currentOrders('#orders', token);
