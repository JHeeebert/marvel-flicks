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
    { name: 'captain-america-ws' },
]
search.addEventListener("event type", () => {
    var searchInput = document.querySelector('.input')
    searchInput.addEventListener("input", (e) => {
//declare and assign the value of whater is typed in searchbar
        let value = e.target.value
//Check input and if its greater than 0
        if (value && value.trim().length > 0){
//Redefine the value, take out white space and change input to all lower-case            
        value = value.trim().toLowerCase()    
    }else {
        //Return Nothing!!!!!
        // add error message if wanted 
    }   
    })
})
var clearButton = document.getElementById('clear')

clearButton.addEventListener("click", () => {
    //write function that clears previous results from page
})
console.log(movies)


// Build Search bar function
function search_page() {
    let input = document.getElementById('searchbar').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('movies');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "list-item";
        }
    }
}