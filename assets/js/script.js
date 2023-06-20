document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.getElementById('searchButton');
  const clearButton = document.getElementById('clearButton');
  const searchResults = document.getElementById('searchResults');
  searchButton.addEventListener('click', searchMovies);
  clearButton.addEventListener('click', clearResults);

  function searchMovies() {
    const searchText = document.getElementById('searchText').value;
    if (searchText.trim() !== '') {
      const apiKey = '6fa1d761f4de3a57995383a6c3373f34';
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchText}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          searchResults.innerHTML = '';
          data.results.forEach((movie) => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            const title = document.createElement('h2');
            title.innerText = movie.title;
            title.addEventListener('click', () => toggleDetails(movieCard));
            movieCard.appendChild(title);
            const releaseDate = document.createElement('p');
            releaseDate.innerText = `Release Date: ${movie.release_date}`;
            movieCard.appendChild(releaseDate);
            const posterPath = movie.poster_path;
            if (posterPath) {
              const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
              const posterImage = document.createElement('img');
              posterImage.src = posterUrl;
              posterImage.alt = movie.title;
              movieCard.appendChild(posterImage);
            }
            const detailsContainer = document.createElement('div');
            detailsContainer.classList.add('details-container');
            movieCard.appendChild(detailsContainer);
            const trailerButton = document.createElement('button');
            trailerButton.innerText = 'Toggle Trailer';
            trailerButton.classList.add('blue-text'); // Added class for styling
            trailerButton.addEventListener('click', () => toggleTrailer(detailsContainer, movie.id));
            detailsContainer.appendChild(trailerButton);
            const reviewButton = document.createElement('button');
            reviewButton.innerText = 'Toggle Reviews';
            reviewButton.classList.add('blue-text'); // Added class for styling
            reviewButton.addEventListener('click', () => toggleReviews(detailsContainer, movie.id));
            detailsContainer.appendChild(reviewButton);
            searchResults.appendChild(movieCard);
          });
        })
        .catch((error) => {
          console.log('An error occurred:', error);
        });
    }
  }
  function clearResults() {
    const searchText = document.getElementById('searchText');
    searchText.value = ''; 
    searchResults.innerHTML = ''; 
  }
  function toggleDetails(movieCard) {
    const detailsContainer = movieCard.querySelector('.details-container');
    detailsContainer.classList.toggle('hidden');
  }
  function toggleTrailer(detailsContainer, movieId) {
    const trailerContainer = detailsContainer.querySelector('.trailer-container');
    if (trailerContainer) {
      trailerContainer.remove();
    } else {
      fetchTrailers(movieId)
        .then((trailers) => {
          if (trailers.length > 0) {
            const newTrailerContainer = document.createElement('div');
            newTrailerContainer.classList.add('trailer-container');
            trailers.forEach((trailer) => {
              const trailerLink = document.createElement('a');
              trailerLink.href = `https://www.youtube.com/watch?v=${trailer.key}`;
              trailerLink.innerText = `Watch Trailer ${trailer.name}`;
              newTrailerContainer.appendChild(trailerLink);
            });
            detailsContainer.appendChild(newTrailerContainer);
          }
        })
        .catch((error) => {
          console.log('Error fetching trailers:', error);
        });
    }
  }
  function toggleReviews(detailsContainer, movieId) {
    const reviewContainer = detailsContainer.querySelector('.review-container');
    if (reviewContainer) {
      reviewContainer.remove();
    } else {
      fetchReviews(movieId)
        .then((reviews) => {
          if (reviews.length > 0) {
            const newReviewContainer = document.createElement('div');
            newReviewContainer.classList.add('review-container');
            reviews.forEach((review) => {
              const reviewParagraph = document.createElement('p');
              reviewParagraph.innerText = review.content;
              newReviewContainer.appendChild(reviewParagraph);
            });
            detailsContainer.appendChild(newReviewContainer);
          }
        })
        .catch((error) => {
          console.log('Error fetching reviews:', error);
        });
    }
  }
  function fetchTrailers(movieId) {
    const apiKey = '6fa1d761f4de3a57995383a6c3373f34';
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => data.results)
      .catch((error) => {
        console.log('Error fetching trailers:', error);
        return [];
      });
  }
  function fetchReviews(movieId) {
    const apiKey = '6fa1d761f4de3a57995383a6c3373f34';
    const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => data.results)
      .catch((error) => {
        console.log('Error fetching reviews:', error);
        return [];
      });
  }
});