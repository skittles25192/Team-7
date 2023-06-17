export default function buzzAnimation() {
  const backpack = document.querySelector('.backpack');
  backpack.classList.add('buzz-animation');
  // Remove the animation class after a certain duration
  setTimeout(function () {
    backpack.classList.remove('buzz-animation');
  }, 1000);
}
