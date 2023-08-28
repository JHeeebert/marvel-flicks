document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.getElementById('searchButton');
  const clearButton = document.getElementById('clearButton');
  const searchInput = document.getElementById('searchText');
  const searchResults = document.getElementById('searchResults');

  searchButton.addEventListener('click', searchMarvelContent);
  clearButton.addEventListener('click', clearResults);

  function searchMarvelContent() {
    const searchText = searchInput.value.trim();

    if (searchText !== '') {
      const apiKey = '6fa1d761f4de3a57995383a6c3373f34';

      const mcuQuery = `Marvel ${searchText}`;
      const mcuUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${mcuQuery}`;

      fetch(mcuUrl)
        .then((response) => response.json())
        .then((mcuData) => {
          const mcuResults = mcuData.results.filter(
            (content) => content.media_type === 'movie' || content.media_type === 'tv'
          );

          displayResults(mcuResults);

          const storedResults = localStorage.getItem('searchedResults');
          const updatedResults = storedResults ? JSON.parse(storedResults).concat(mcuResults) : mcuResults;
          localStorage.setItem('searchedResults', JSON.stringify(updatedResults));
        })
        .catch((error) => {
          console.log('An error occurred:', error);
        });
    }
  }

  function clearResults() {
    searchInput.value = '';
    searchResults.innerHTML = '';
  }

  function displayResults(results) {
    searchResults.innerHTML = '';
    results.forEach((content) => {
      const contentCard = createContentCard(content);
      searchResults.appendChild(contentCard);
    });
  }

  const storedResults = localStorage.getItem('searchedResults');
  if (storedResults) {
    const parsedResults = JSON.parse(storedResults);
    displayResults(parsedResults);
  }

  function createContentCard(content) {
    const contentCard = document.createElement('div');
    contentCard.classList.add('content-card');

    const title = document.createElement('h2');
    title.innerText = content.title || content.name;
    contentCard.appendChild(title);

    const releaseDate = document.createElement('p');
    releaseDate.innerText = `Release Date: ${content.release_date || content.first_air_date}`;
    contentCard.appendChild(releaseDate);

    const posterPath = content.poster_path;
    if (posterPath) {
      const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
      const posterImage = document.createElement('img');
      posterImage.src = posterUrl;
      posterImage.alt = content.title || content.name;
      contentCard.appendChild(posterImage);
    }

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details-container');
    contentCard.appendChild(detailsContainer);

    const trailerButton = document.createElement('button');
    trailerButton.innerText = 'Toggle Trailer';
    trailerButton.classList.add('blue-text');
    trailerButton.addEventListener('click', () => toggleTrailer(detailsContainer, content.id));
    detailsContainer.appendChild(trailerButton);

    const reviewButton = document.createElement('button');
    reviewButton.innerText = 'Toggle Reviews';
    reviewButton.classList.add('blue-text');
    reviewButton.addEventListener('click', () => toggleReviews(detailsContainer, content.title || content.name));
    detailsContainer.appendChild(reviewButton);

    return contentCard;
  }

  function toggleTrailer(detailsContainer, contentId) {
    const trailerContainer = detailsContainer.querySelector('.trailer-container');
    if (trailerContainer) {
      trailerContainer.remove();
    } else {
      fetchTrailers(contentId)
        .then((trailers) => {
          if (trailers.length > 0) {
            const newTrailerContainer = document.createElement('div');
            newTrailerContainer.classList.add('trailer-container');
            trailers.forEach((trailer) => {
              const trailerBox = document.createElement('div');
              trailerBox.classList.add('trailer-box');
              const trailerLink = document.createElement('a');
              trailerLink.href = `https://www.youtube.com/watch?v=${trailer.key}`;
              trailerLink.innerText = `Watch Trailer ${trailer.name}`;
              trailerBox.appendChild(trailerLink);
              newTrailerContainer.appendChild(trailerBox);
            });
            detailsContainer.appendChild(newTrailerContainer);
          }
        })
        .catch((error) => {
          console.log('Error fetching trailers:', error);
          displayErrorMessage('An error occurred while fetching trailers. Please try again later.');
        });
    }
  }

  function toggleReviews(detailsContainer, contentTitle) {
    const reviewContainer = detailsContainer.querySelector('.review-container');
    if (reviewContainer) {
      reviewContainer.remove();
    } else {
      fetchReviews(contentTitle)
        .then((reviews) => {
          if (reviews.length > 0) {
            const newReviewContainer = document.createElement('div');
            newReviewContainer.classList.add('review-container');
            reviews.forEach((review) => {
              const reviewBox = document.createElement('div');
              reviewBox.classList.add('review-box');
              const reviewParagraph = document.createElement('p');
              reviewParagraph.innerText = review.Source + ': ' + review.Value;
              reviewBox.appendChild(reviewParagraph);
              newReviewContainer.appendChild(reviewBox);
            });
            detailsContainer.appendChild(newReviewContainer);
          }
        })
        .catch((error) => {
          console.log('Error fetching reviews:', error);
          displayErrorMessage('An error occurred while fetching reviews. Please try again later.');
        });
    }
  }

  function fetchTrailers(contentId) {
    const apiKey = '6fa1d761f4de3a57995383a6c3373f34';
    const url = `https://api.themoviedb.org/3/movie/${contentId}/videos?api_key=${apiKey}`;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => data.results.filter((result) => result.site === 'YouTube'))
      .catch((error) => {
        console.log('Error fetching trailers:', error);
        return [];
      });
  }

  function fetchReviews(contentTitle) {
    const apiKey = 'f72fd7a';
    const encodedTitle = encodeURIComponent(contentTitle);
    const url = `https://www.omdbapi.com/?t=${encodedTitle}&apikey=${apiKey}&type=movie`;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Ratings) {
          return data.Ratings;
        }
        return [];
      })
      .catch((error) => {
        console.log('Error fetching reviews:', error);
        return [];
      });
  }

  function displayErrorMessage(message) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    errorMessage.innerText = message;
    searchResults.appendChild(errorMessage);
  }
});

