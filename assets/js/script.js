namespace = "MarvelFlicks".MarvelApi;
const string =
  "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=e3438d4d175fedcdc6c2e3ad5914b6f8&hash=ffd275c5130566a2916217b101f26150";
var _marvel = new MarvelApi.Marvel();

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
