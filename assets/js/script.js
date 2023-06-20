document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.getElementById('searchButton');
  const clearButton = document.getElementById('clearButton');
  const searchResults = document.getElementById('searchResults');

  searchButton.addEventListener('click', searchMarvelContent);
  clearButton.addEventListener('click', clearResults);

  function searchMarvelContent() {
    const searchText = document.getElementById('searchText').value;

    if (searchText.trim() !== '') {
      const apiKey = '6fa1d761f4de3a57995383a6c3373f34';

      const mcuQuery = `Marvel ${searchText}`;
      const mcuUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${mcuQuery}`;

      const sonyQuery = `Sony Marvel ${searchText}`;
      const sonyUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${sonyQuery}`;

      Promise.all([fetch(mcuUrl), fetch(sonyUrl)])
        .then((responses) => Promise.all(responses.map((response) => response.json())))
        .then(([mcuData, sonyData]) => {
          const combinedResults = [...mcuData.results, ...sonyData.results];

          searchResults.innerHTML = '';

          combinedResults.forEach((content) => {
            if (content.media_type === 'movie' || content.media_type === 'tv') {
              const contentCard = createContentCard(content);
              searchResults.appendChild(contentCard);
            }
          });
        })
        .catch((error) => {
          console.log('An error occurred:', error);
        });
    }
  }

  function clearResults() {
    searchResults.innerHTML = '';
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

    const trailerButton = document.createElement('button');
    trailerButton.innerText = 'Toggle Trailer';
    trailerButton.addEventListener('click', () => toggleTrailer(detailsContainer, content.id, content.media_type));
    detailsContainer.appendChild(trailerButton);

    const reviewButton = document.createElement('button');
    reviewButton.innerText = 'Toggle Reviews';
    reviewButton.addEventListener('click', () => toggleReviews(detailsContainer, content.title || content.name));
    detailsContainer.appendChild(reviewButton);

    contentCard.appendChild(detailsContainer);

    return contentCard;
  }

  function toggleTrailer(detailsContainer, contentId, mediaType) {
    const trailerContainer = detailsContainer.querySelector('.trailer-container');
    if (trailerContainer) {
      trailerContainer.remove();
    } else {
      fetchTrailers(contentId, mediaType)
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
        });
    }
  }

  function fetchTrailers(contentId, mediaType) {
    const apiKey = '6fa1d761f4de3a57995383a6c3373f34';
    const url = `https://api.themoviedb.org/3/${mediaType}/${contentId}/videos?api_key=${apiKey}`;

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
});
