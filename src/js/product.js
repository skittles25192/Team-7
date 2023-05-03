import {getParameter} from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParameter("product");
productDetails(productId);

console.log(productId)