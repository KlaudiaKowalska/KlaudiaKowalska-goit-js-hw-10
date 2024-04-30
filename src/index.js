import axios from 'axios';
import Notiflix from 'notiflix';

const apiKey =
  'live_4kyZqahCxtmeNmLa0h67E6ePgx3Fi3yhzr5bzHbUaJW9wQAt9yf5Svso9oHl0LVB';

axios.defaults.headers.common['x-api-key'] = apiKey;

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.querySelector('.breed-select');
  const catInfo = document.querySelector('.cat-info');
  const loader = document.querySelector('.loader');

  Notiflix.Notify.init();

  function showLoader() {
    loader.style.display = 'block';
  }

  function hideLoader() {
    loader.style.display = 'none';
  }

  function showError() {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  }

  function showCatLoader() {
    catInfo.style.display = 'none';
    showLoader();
  }

  function displayCatInfo(cat) {
    catInfo.innerHTML = `
      <img src="${cat.imageUrl}" alt="Cat">
      <h2>${cat.breedName}</h2>
      <p><strong>Description:</strong> ${cat.description}</p>
      <p><strong>Temperament:</strong> ${cat.temperament}</p>
    `;
    catInfo.style.display = 'block';
  }

  breedSelect.addEventListener('change', () => {
    const selectedBreedId = breedSelect.value;

    hideLoader();
    catInfo.style.display = 'block';
    showCatLoader();

    fetchCatByBreed(selectedBreedId)
      .then(cat => {
        displayCatInfo(cat);
        hideLoader();
      })
      .catch(error => {
        console.error(error.message);
        showError();
        hideLoader();
      });
  });
  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
      hideLoader();
    })
    .catch(error => {
      console.error(error.message);
      showError();
      hideLoader();
    });
});
