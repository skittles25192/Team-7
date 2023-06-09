export async function updateCartCount() {
  const itemCountElement = document.querySelector('#itemCount');

  const itemCount = localStorage.getItem('so-cart') ? JSON.parse(localStorage.getItem('so-cart')).length : 0;

  if(itemCount) {
    itemCountElement.textContent = itemCount;
  } else {
    itemCountElement.textContent = 0
  }
}