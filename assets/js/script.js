const menuButton = document.getElementById("menu-button");
const dropdownMenu = document.querySelector(".absolute.right-0");

menuButton.addEventListener("click", function () {
  const expanded = menuButton.getAttribute("aria-expanded") === "true" || false;
  menuButton.setAttribute("aria-expanded", !expanded);
  dropdownMenu.style.display = expanded ? "none" : "block";
});

// Function to handle movie click event
function handleMovieClick(link) {
  window.location.href = link;
}

// Function to handle search
function searchMovies() {
  let input = document.getElementById('searchbar').value.toLowerCase();
  let movies = document.getElementsByClassName('movies');

  for (let i = 0; i < movies.length; i++) {
    let movieName = movies[i].getAttribute('data-movie-name').toLowerCase();
    if (!movieName.includes(input)) {
      movies[i].style.display = 'none';
    } else {
      movies[i].style.display = 'list-item';
    }
  }
}

// Array of movie names and corresponding links
const movies = [
  { name: 'captain america first avenger', link: 'https://www.themoviedb.org/movie/1771-captain-america-the-first-avenger' },
  { name: 'captain marvel', link: 'https://www.themoviedb.org/movie/299537-captain-marvel' },
  { name: 'iron man', link: 'https://www.themoviedb.org/movie/1726-iron-man' },
  { name: 'iron Man 2', link: 'https://www.themoviedb.org/movie/10138-iron-man-2' },
  { name: 'the incredible hulk', link: 'https://www.themoviedb.org/movie/1724-the-incredible-hulk' },
  { name: 'thor', link: 'https://www.themoviedb.org/movie/10195-thor' },
  { name: 'the avengers', link: 'https://www.themoviedb.org/movie/24428-the-avengers' },
  { name: 'thor darkworld', link: 'https://www.themoviedb.org/movie/76338-thor-the-dark-world' },
  { name: 'iron man 3', link: 'https://www.themoviedb.org/movie/68721-iron-man-3' },
  { name: 'captain america winter soldier', link: 'https://www.themoviedb.org/movie/100402-captain-america-the-winter-soldier' },
  { name: 'guardians', link: 'https://www.themoviedb.org/movie/118340-guardians-of-the-galaxy' },
  { name: 'guardians 2', link: 'https://www.themoviedb.org/movie/283995-guardians-of-the-galaxy-2' },
  { name: 'avengers age of ultron', link: 'https://www.themoviedb.org/movie/99861-avengers-age-of-ultron' },
  { name: 'ant man', link: 'https://www.themoviedb.org/movie/102899-ant-man' },
  { name: 'captain amaerica civil war', link: 'https://www.themoviedb.org/movie/271110-captain-america-civil-war' },
  { name: 'black widow', link: 'https://www.themoviedb.org/movie/497698-black-widow' },
  { name: 'spider man homecoming', link: 'https://www.themoviedb.org/movie/315635-spider-man-homecoming' },
  { name: 'black panther', link: 'https://www.themoviedb.org/movie/284054-black-panther' },
  { name: 'doctor strange', link: 'https://www.themoviedb.org/movie/284052-doctor-strange' },
  { name: 'thor rangarok', link: 'https://www.themoviedb.org/movie/284053-thor-ragnarok' },
  { name: 'antman wasp', link: 'https://www.themoviedb.org/movie/363088-ant-man-and-the-wasp' },
  { name: 'avengers infinity war', link: 'https://www.themoviedb.org/movie/299536-avengers-infinity-war' },
  { name: 'avengers end game', link: 'https://www.themoviedb.org/movie/299534-avengers-endgame' },
  { name: 'spiderman far from home', link: 'https://www.themoviedb.org/movie/429617-spider-man-far-from-home' },
  { name: 'shang-chi ten rings', link: 'https://www.themoviedb.org/movie/566525-shang-chi-and-the-legend-of-the-ten-rings' },
  { name: 'eternals', link: 'https://www.themoviedb.org/movie/524434-eternals' },
  { name: 'spiderman no way-home', link: 'https://www.themoviedb.org/movie/634649-spider-man-no-way-home' },
  { name: 'doctor strange multiverse', link: 'https://www.themoviedb.org/movie/453395-doctor-strange-in-the-multiverse-of-madness' },
  { name: 'thor love and thunder', link: 'https://www.themoviedb.org/movie/616037-thor-love-and-thunder' },
  { name: 'antman-quantumania', link: 'https://www.themoviedb.org/movie/640146-ant-man-and-the-wasp-quantumania' },
  { name: 'guardians 3', link: 'https://www.themoviedb.org/movie/447365-guardians-of-the-galaxy-vol-3' },
  { name: 'black panther wakanda forever', link: 'https://www.themoviedb.org/movie/505642-black-panther-wakanda-forever' },
];

function searchMovies(searchText) {
  const movie = movies.find((m) => m.name === searchText.toLowerCase());
  if (movie) {
    window.location.href = movie.link;
  } else {
    $("#searchResults").html('<div class="text-white">No results found.</div>');
  }
}

$(document).ready(function () {
 

  $("#searchButton").click(function () {
    const searchText = $("#searchText").val().toLowerCase();
    searchMovies(searchText);
  });

  
});

// Perform API request for each movie
for (const movie of movieNames) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${movie.name}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        const movieElement = document.createElement('li');
        movieElement.className = 'movies';
        movieElement.textContent = data.results[0].title;
        movieElement.setAttribute('data-movie-name', movie.name);
        movieElement.style.cursor = 'pointer';
        movieElement.addEventListener('click', () => {
          handleMovieClick(movie.link);
        });
        document.getElementById('movieList').appendChild(movieElement);
      }
    })
    .catch(error => {
      console.log('Error occurred while fetching movie data:', error);
    });
}
