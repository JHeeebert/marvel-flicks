//namespace = "MarvelFlicks".MarvelApi;
//const string =
//  "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=e3438d4d175fedcdc6c2e3ad5914b6f8&hash=ffd275c5130566a2916217b101f26150";
//var _marvel = new MarvelApi.Marvel();

const menuButton = document.getElementById("menu-button");

// Add click event listener to the menu button
menuButton.addEventListener("click", () => {
  // Toggle the visibility of the navbar items
  const navbarItems = document.querySelector(".lg\\:flex");
  navbarItems.classList.toggle("hidden");
});
