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

function getHeroData(id){
const url='https://superheroapi.com/api/access-token/search/name

fetch(url)
.then(response=>response.json())
.then(data=>{
  
});
}
function showHeroData(data) {
  const container = document.querySelector('.hero-container');
  const image = document.createElement('img');
  const name = document.createElement('h2');
  const fullName = document.createElement('p');
  const firstAppearance = document.createElement('p');

  image.src = data.image.url;
  name.textContent = data.name;
  fullName.textContent = `Full Name: ${}`;
  firstAppearance.textContent = `First Appearance: ${}`;

  container.appendChild(image);
  container.appendChild(name);
  container.appendChild(fullName);
  container.appendChild(firstAppearance);
}

getHeroData(30)

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
