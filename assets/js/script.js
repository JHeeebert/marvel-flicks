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

const url = 'https://online-movie-database.p.rapidapi.com/auto-complete?q=Avengers';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '78a6737bf0msh512c51f3b45bc1cp117602jsndaa6a14db3f3',
    'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
  }
};

function fetchimdb() {
  const apiKey = "6fa1d761f4de3a57995383a6c3373f34";
  const searchQuery = "Captain America: The First Avenger";
  const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    searchQuery
  )}`;
  fetch(searchURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data.results.length > 0) {
        const movieId = data.results[0].id;
        const movieDetailsURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=reviews`;
        fetch(movieDetailsURL)
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            const avengersPoster = document.querySelector('img[src="https://wallpapercave.com/dwp1x/wp5271850.jpg"]');
            const avengersTitle = document.querySelector('div.movie-title');
            avengersPoster.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
            avengersTitle.textContent = data.title;
            console.log(data);
          })
          .catch(function (error) {
            console.log("An error occurred while fetching movie details:", error);
          });
      } else {
        console.log("No movie found with the given search query.");
      }
    })
    .catch(function (error) {
      console.log("An error occurred while searching for movies:", error);
    });
}
fetchimdb();

function fetchMovie(searchQuery, posterSelector, titleSelector) {
  const apiKey = "6fa1d761f4de3a57995383a6c3373f34";
  const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    searchQuery
  )}`;
  fetch(searchURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (data.results.length > 0) {
        const movieId = data.results[0].id;
        const movieDetailsURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=reviews`;
        fetch(movieDetailsURL)
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {
            const poster = document.querySelector(posterSelector);
            const title = document.querySelector(titleSelector);
            poster.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
            title.textContent = data.title;
            // Added click event to open search link on poster click. I'm going to be making changes to this
            poster.addEventListener("click", function () {
              window.location.href = `https://www.themoviedb.org/search?query=${encodeURIComponent(
                searchQuery
              )}`;
            });
            console.log(data);
          })
          .catch(function (error) {
            console.log("An error occurred while fetching movie details:", error);
          });
      } else {
        console.log("No movie found with the given search query.");
      }
    })
    .catch(function (error) {
      console.log("An error occurred while searching for movies:", error);
    });
}

fetchMovie(
  "Iron Man",
  'img[src="https://wallpapercave.com/dwp1x/wp1279357.jpg"]',
  "div.movie-title"
);
fetchMovie(
  "Captain Marvel",
  'img[src="https://wallpapercave.com/dwp1x/wp4331452.jpg"]',
  "div.movie-title"
);
fetchMovie(
  "Iron Man 2",
  'img[src="https://wallpapercave.com/dwp1x/wp3202075.jpg"]',
  "div.movie-title"
);
fetchMovie(
  "Iron Man 3",
  'img[src="https://wallpapercave.com/dwp1x/wp1878498.jpg"]',
  "div.movie-title"
);
fetchMovie(
  "The Incredible Hulk",
  'img[src="https://wallpapercave.com/dwp1x/d0lhZD.jpg"]',
  "div.movie-title"
);
fetchMovie(
  "Thor",
  'img[src="https://wallpapercave.com/dwp1x/wp1863190.jpg"]',
  "div.movie-title"
);
fetchMovie(
  "The Avengers",
  'img[src="https://wallpapercave.com/dwp1x/wp2036004.jpg"]',
  "div.movie-title"
);
fetchMovie(
  "Thor: The Dark World",
  'img[src="https://wallpapercave.com/dwp1x/wp3628960.jpg"]',
  "div.movie-title"
);
fetchMovie(
  "Captain America: The Winter Soldier",
  'img[src="https://wallpapercave.com/dwp1x/wp3541800.jpg"]',
  "div.movie-title"
);
