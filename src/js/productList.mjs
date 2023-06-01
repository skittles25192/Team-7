import { getProductsByCategory } from './externalServices.mjs';
import { renderListWithTemplate } from './utils.mjs';

export default async function productList(selector, category) {

    const element = document.querySelector(selector);
    const  products = await getProductsByCategory(category);
    renderListWithTemplate(productCardTemplate, element, products, 'afterbegin', true);
}

function productCardTemplate(product) {
    return `<li title="${product.Name}" id="${product.FinalPrice}" class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`
}
