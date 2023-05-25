namespace = "MarvelFlicks".MarvelApi
const string = "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=e3438d4d175fedcdc6c2e3ad5914b6f8&hash=ffd275c5130566a2916217b101f26150"
var _marvel = new MarvelApi.Marvel();



const menuButton = document.getElementById("menu-button");
const dropdownMenu = document.querySelector(".absolute.right-0");

menuButton.addEventListener("click", function () {
  const expanded = menuButton.getAttribute("aria-expanded") === "true" || false;
  menuButton.setAttribute("aria-expanded", !expanded);
  dropdownMenu.style.display = expanded ? "none" : "block";
