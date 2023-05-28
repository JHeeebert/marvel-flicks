//namespace = "MarvelFlicks".MarvelApi;
//const string =
//  "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=e3438d4d175fedcdc6c2e3ad5914b6f8&hash=ffd275c5130566a2916217b101f26150";
//var _marvel = new MarvelApi.Marvel();

const menuButton = document.getElementById("menu-button");
const menuItems = document.getElementById("menu-items");

menuButton.addEventListener("click", () => {
  menuItems.classList.toggle("hidden");
});

const navLinks = menuItems.getElementsByTagName("a");
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", () => {
    menuItems.classList.add("hidden");
  });
}
document.addEventListener("DOMContentLoaded", function () {
  var flipCards = document.querySelectorAll(".flip-card");
  var isFlipped = false;

  flipCards.forEach(function (flipCard) {
    flipCard.addEventListener("click", function () {
      if (isFlipped) {
        flipCards.forEach(function (card) {
          card.classList.remove("flip");
        });
      } else {
        flipCard.classList.add("flip");
      }
      isFlipped = !isFlipped;
    });
  });
});
