import axios from 'axios';

const apiKey =
  'live_4kyZqahCxtmeNmLa0h67E6ePgx3Fi3yhzr5bzHbUaJW9wQAt9yf5Svso9oHl0LVB'; // Wstaw swój klucz API tutaj

axios.defaults.headers.common['x-api-key'] = apiKey;

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      return response.data.map(breed => ({
        id: breed.id,
        name: breed.name,
      }));
    })
    .catch(error => {
      throw new Error('Wystąpił błąd podczas pobierania ras kotów.');
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      const catData = response.data[0];
      return {
        imageUrl: catData.url,
        breedName: catData.breeds[0].name,
        description: catData.breeds[0].description,
        temperament: catData.breeds[0].temperament,
      };
    })
    .catch(error => {
      throw new Error('Wystąpił błąd podczas pobierania informacji o kocie.');
    });
}
