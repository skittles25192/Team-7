import { getLocalStorage} from './utils.mjs';

export function getCartAmount() {
    const cartItems = getLocalStorage('so-cart');
    if(cartItems != null)
    {
    LoadCartAmount(cartItems.length)
    }  
  
  }



export function LoadCartAmount(arrayCount) {
   if(arrayCount != null){

    var html = document.querySelector('.badge');

    if(html != null){

        document.querySelector('.badge').innerHTML = arrayCount;
    }
}

  }
  
getCartAmount();