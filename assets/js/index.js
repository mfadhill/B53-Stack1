let isHamburberOpen = false;
const openHamburger = () => {
  let hamburgerItemsElement = document.getElementById("hamburger-bars-items");

  if (!isHamburberOpen) {
    hamburgerItemsElement.style.display = "block";
    isHamburberOpen = true;
  } else {
    hamburgerItemsElement.style.display = "none";
    isHamburberOpen = false;
  }
};