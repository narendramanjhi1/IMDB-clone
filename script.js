const apiKey = '2ae9805c';
const searchInput = document.getElementById('searchInput');
const mainContent = document.getElementById('mainContent');
const favoritesList = document.getElementById('favoritesList');

let searchTimeout;

// Function to fetch search results and update UI
async function fetchSearchResults(query) {
  const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
  const data = await response.json();
  return data.Search || [];
}

// Function to render search results
function renderSearchResults(results) {
  mainContent.innerHTML = '';
  results.forEach(result => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('result-item');
    resultItem.innerHTML = `
      <h3>${result.Title}</h3>
      <p>${result.Year}</p>
      <button class="add-to-favorites">Add to Favorites</button>
    `;
    const addToFavoritesBtn = resultItem.querySelector('.add-to-favorites');
    addToFavoritesBtn.addEventListener('click', () => addToFavorites(result));
    resultItem.addEventListener('click', () => showMoviePage(result.imdbID));
    mainContent.appendChild(resultItem);
  });
}

// Function to show movie details page
async function showMoviePage(movieId) {
  const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`);
  const movie = await response.json();
  // Create and populate the movie page with details
  // You can append it to the mainContent element

  const homeButton = document.getElementById('homeButton');
  homeButton.addEventListener('click', () => showSearchResults());


}

// Function to add a movie to favorites
function addToFavorites(movie) {
  if (!favoritesList.querySelector(`[data-id="${movie.imdbID}"]`)) {
    const favoriteItem = document.createElement('li');
    favoriteItem.setAttribute('data-id', movie.imdbID);
    favoriteItem.innerHTML = `
      <span>${movie.Title} (${movie.Year})</span>
      <button class="remove-from-favorites">Remove</button>
    `;
    const removeFromFavoritesBtn = favoriteItem.querySelector('.remove-from-favorites');
    removeFromFavoritesBtn.addEventListener('click', () => removeFromFavorites(movie.imdbID));
    favoritesList.appendChild(favoriteItem);
  }
}

// Function to remove a movie from favorites
function removeFromFavorites(movieId) {
  const favoriteItem = favoritesList.querySelector(`[data-id="${movieId}"]`);
  if (favoriteItem) {
    favoritesList.removeChild(favoriteItem);
  }
}

// Function to handle search input changes
function handleSearchInput() {
  clearTimeout(searchTimeout);
  const query = searchInput.value.trim();
  if (query.length > 1) {
    searchTimeout = setTimeout(async () => {
      const results = await fetchSearchResults(query);
      renderSearchResults(results);
    }, 300);
  } else {
    mainContent.innerHTML = '';
  }
}

// Attach event listener to search input
searchInput.addEventListener('input', handleSearchInput);

// Function to show movie details page
async function showMoviePage(movieId) {
  const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`);
  const movie = await response.json();

  const moviePage = document.createElement('div');
  moviePage.classList.add('movie-page');
  moviePage.innerHTML = `
    <h2>${movie.Title} (${movie.Year})</h2>
    <p>Genre: ${movie.Genre}</p>
    <p>Director: ${movie.Director}</p>
    <p>Actors: ${movie.Actors}</p>
    <p>Plot: ${movie.Plot}</p>
    <button class="add-to-favorites">Add to Favorites</button>
  `;
  const addToFavoritesBtn = moviePage.querySelector('.add-to-favorites');
  addToFavoritesBtn.addEventListener('click', () => addToFavorites(movie));

  mainContent.innerHTML = '';
  mainContent.appendChild(moviePage);
}

// Function to show movie details page
async function showMoviePage(movieId) {
  const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`);
  const movie = await response.json();

  const moviePage = document.createElement('div');
  moviePage.classList.add('movie-page');
  moviePage.innerHTML = `
    <div class="movie-details">
      <div class="movie-poster">
        <img src="${movie.Poster}" alt="${movie.Title} Poster">
      </div>
      <div class="movie-info">
        <h2>${movie.Title} (${movie.Year})</h2>
        <p>Genre: ${movie.Genre}</p>
        <p>Director: ${movie.Director}</p>
        <p>Actors: ${movie.Actors}</p>
        <p>Plot: ${movie.Plot}</p>
        <button class="add-to-favorites">Add to Favorites</button>
      </div>
    </div>
  `;
  const addToFavoritesBtn = moviePage.querySelector('.add-to-favorites');
  addToFavoritesBtn.addEventListener('click', () => addToFavorites(movie));

  mainContent.innerHTML = '';
  mainContent.appendChild(moviePage);
}


