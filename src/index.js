import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
};

let selectedBreed = null;
let selectedId = '';

axios.defaults.headers.common['x-api-key'] =
  'live_wH2p61wQZCkhShlatD1n6Wz8tVnB0mced6L10yg25DytZNMNWUQhJ9NwlZf0meyf';

fetchBreeds(axios)
  .then(res => {
    if (!res.length) {
      refs.loader.classList.add('visible');
    }
    return res.json();
  })
  .then(res => {
    refs.loader.classList.remove('visible');
    markUpOption(res);
    selectedBreed = res;
  })
  .catch(onError);

refs.select.addEventListener('change', changeHandler);

function changeHandler() {
  refs.loader.classList.add('visible');
  selectedId = refs.select.value;
  fetchCatByBreed(refs.select.value)
    .then(res => res.json())
    .then(res => {
      refs.loader.classList.remove('visible');
      markUpForBreed(...res);
    })
    .catch(() => {
      refs.catInfo.innerHTML = '';
      onError();
    });
}

function markUpForBreed(data) {
  const selected = selectedBreed.filter(el => el.id === selectedId);
  return (refs.catInfo.innerHTML = `<img src="${data.url}" alt="cat" width="600" height="500" >
  <div class="wrap-info">
  <h2>${selected[0].name}</h2>
  <p>${selected[0].description}</p>
  <h3>Temperament: ${selected[0].temperament}</h3>
  </div>
  `);
}

function markUpOption(value) {
  value.forEach(({ id, name }) => {
    refs.select.insertAdjacentHTML(
      'beforeend',
      `<option value="${id}">${name}</option>`
    );
  });
}

function onError() {
  return Notify.failure('ops! Something went wrong! Try reloading the page!');
}
