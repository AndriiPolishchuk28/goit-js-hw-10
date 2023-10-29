export function fetchBreeds(option) {
  return fetch('https://api.thecatapi.com/v1/breeds', option);
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
}
