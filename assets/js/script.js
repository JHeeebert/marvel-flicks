const menuButton = document.getElementById("menu-button");
const navbarItems = document.querySelector(".hidden.lg\\:flex");

function toggleMenu() {
  navbarItems.classList.toggle("hidden");
}

menuButton.addEventListener("click", toggleMenu);

const clearButton = document.getElementById("clearButton");
const searchText = document.getElementById("searchText");

clearButton.addEventListener("click", function () {
  searchText.value = "";
});
