import { getLocalStorage, renderListWithTemplate, setLocalStorage } from './utils.mjs';

import { updateCartCount } from './superscript.mjs';

import buzzAnimation from './buzzAnimation.js';


export default function ShoppingCart() {
  const cartItems = getLocalStorage('so-cart') || [];
  const cartElement = document.querySelector('.product-list');  
  renderListWithTemplate(cartItemTemplate, cartElement, cartItems);
  //functionality to add total
  const subTotal = cartItems ? cartItems.reduce((acc, currentItem) => acc + currentItem.FinalPrice, 0) : 0;
  const itemCount = cartItems ? cartItems.length : 0;
  //Add the subtotal to the cart page
  if(cartItems.length != 0) {
    document.querySelector('.cart-total').textContent = `Subtotal: (${itemCount} Products) - $${subTotal.toFixed(2)}`;
  } else {
    document.querySelector('.cart-footer').classList.add('hide');
  }
  removeItem();
}


function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <i class="fa-solid fa-trash cart-card__delete"></i>
</li>`;

  return newItem;
}

function removeItem() {
  let cartList = document.querySelectorAll('.cart-list li');
  let cartProducts = [...cartList];

  for (let i = 0; i < cartList.length; i++) {
    cartList[i].addEventListener('click', remove);
  }

  function remove(event) {
    let index = cartProducts.indexOf(event.currentTarget);
    let currentCart = getLocalStorage('so-cart');
    if (currentCart && index >= 0 && index < currentCart.length) {
      currentCart.splice(index, 1);
      setLocalStorage('so-cart', currentCart);
      ShoppingCart();
      updateCartCount();
      buzzAnimation();
    }
  }
}