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
//Create Global variable for movie-titles and an array
var movies = [
    { name: 'captain-america-fa' },
    { name: 'captain-marvel' },
    { name: 'iron-man' },
    { name: 'iron-Man-2' },
    { name: 'hulk' },
    { name: 'thor' },
    { name: 'the-avengers' },
    { name: 'thor-dark-world' },
    { name: 'iron-man-3' },
    { name: 'captain-america-winter-soldier' },
    { name: 'guardians' },
    { name: 'guardians-2' },
    { name: 'avengers-ultron' },
    { name: 'ant-man' },
    { name: 'captain-amaerica-cw' },
    { name: 'black-widow' },
    { name: 'spider-man-homecoming' },
    { name: 'black-panther' },
    { name: 'doctor-strange' },
    { name: 'thor-rangarok' },
    { name: 'antman-wasp' },
    { name: 'avengers-infinity-war' },
    { name: 'avengers-end-game' },
    { name: 'spiderman-far-from-home' },
    { name: 'shang-chi-ten-rings' },
    { name: 'eternals' },
    { name: 'spiderman-no-way-home' },
    { name: 'doctor-strange-multiverse' },
    { name: 'thor-love-and-thunder' },
    { name: 'antman-quantumania' },
    { name: 'guardians-3' },
 ]
search.addEventListener("event type", () => {
    const searchInput = document.querySelector('.input')
    searchInput.addEventListener("input", (e) => {
        //declare and assign the value of whater is typed in searchbar
        let value = e.target.value
        //Check input and if its greater than 0
        if (value && value.trim().length > 0) {
            //Redefine the value, take out white space and change input to all lower-case            
            value = value.trim().toLowerCase()
        } else {
           
            clearList()
        }
    })
})
const clearButton = document.getElementById('clear')

clearButton.addEventListener("click", () => {
    
})
 
// movieList takes in the results of the search
function movieList(results) {
    for (const film of results) {
        //Creates li item for each result
        const resultItem = document.createElement('li')
        //adds class to results
        resultItem.classList.add('result-item')
        // grabbing the name of the current point of the loop and adding the name as the list item's text
        const text = document.createTextNode(film.name)
        //appemds text to result 
        resultItem.appendChild(text)
        //appends result to list
        list.appendChild(resultItem)
    }
    if (results.length === 0) {
        blankForm()
    }
}

searchInput.addEventListener("input", (e) => {
    let value = e.target.value
    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase()

        //return on the results of the movieList if the search includes movie name
        movieList(movies.filter(film => {
            return film.name.includes(value)
        }))
    }
})
function clearList() {
    while (list.firstChild) {
        list.removeChild(list.firstChild)
    }
}
function blankForm() {
    //create element for error message as list item ("li")
    const error = document.createElement("li")
    //add class name of "error-message" to elemeent
    error.classList.add('error-message')
    //text that will appear for error message 
    const text = document.createTextNode('We arent finding what you are searching for!!!')
    //append text to element we created
    error.appendChild(text)
    list.appendChild(error)
}



// Build Search bar function
function fetchMovies(apiKey, callback) {
  // Construct the API URL
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  // Make a GET request to the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => callback(data.results))
    .catch(error => console.log(error));
}

// Function to display movies based on search input
function searchMovies() {
  const input = document.getElementById('searchbar').value.toLowerCase();
  const movies = document.getElementsByClassName('movies');

  for (let i = 0; i < movies.length; i++) {
    const movieTitle = movies[i].innerHTML.toLowerCase();
    if (!movieTitle.includes(input)) {
      movies[i].style.display = "none";
    } else {
      movies[i].style.display = "list-item";
    }
  }
}

// API key for The Movie Database (TMDB)


//const apiKey = '6fa1d761f4de3a57995383a6c3373f34';
const apiKey = "6fa1d761f4de3a57995383a6c3373f34"
// Call fetchMovies function to fetch movie data
fetchMovies(apiKey, movies => {
  // Create movie elements
  const moviesContainer = document.getElementById('movies-container');
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.className = 'movies';
    movieElement.innerHTML = movie.title;
    moviesContainer.appendChild(movieElement);
  });

  // Add event listener to search bar
  const searchbar = document.getElementById('searchbar');
  searchbar.addEventListener('input', searchMovies);
});
