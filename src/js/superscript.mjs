export async function updateCartCount() {
    const itemCountElement = document.querySelector('#itemCount');
    const itemCount = JSON.parse(localStorage.getItem('so-cart')).length;
  
    if (itemCount) {
      itemCountElement.textContent = itemCount;
    }
  }