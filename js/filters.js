import { renderPhotos } from './thumbnails';
import { getRandomArrayElement, debounce } from './utils';
import { getData } from './api';

const defaultButton = document.querySelector('#filter-default');
const randomPhotosButton = document.querySelector('#filter-random');
const discussedPhotosButton = document.querySelector('#filter-discussed');

const RENDER_DELAY = 1000;

const renderDebouncedPhotos = debounce((selectedFilter) => {
  if (selectedFilter === 'default') {
    getData(
      (data) => {
        renderPhotos(data);
      },
      () => {
        renderError();
      }
    );
  }
  if (selectedFilter === 'random') {
    getData(
      (data) => {
        const uniquePhotos = [];
        while (uniquePhotos.length < 10) {
          const randomElement = getRandomArrayElement(data);
          const allPhotosUnique = uniquePhotos.every((photo) => {
            return photo.url !== randomElement.url;
          });
          if (allPhotosUnique) {
            uniquePhotos.push(randomElement);
          }
        }
        renderPhotos(uniquePhotos);
      },
      () => {
        renderError();
      }
    );
  }
  if (selectedFilter === 'discussed') {
    getData(
      (data) => {
        const array = data.sort((a, b) => {
          return b.comments.length - a.comments.length;
        });
        renderPhotos(array);
      },
      () => {
        renderError();
      }
    );
  }
}, RENDER_DELAY);

function clearActiveBtnClass() {
  defaultButton.classList.remove('img-filters__button--active');
  randomPhotosButton.classList.remove('img-filters__button--active');
  discussedPhotosButton.classList.remove('img-filters__button--active');
}

function addActiveClass(button) {
  button.classList.add('img-filters__button--active');
}

defaultButton.addEventListener('click', () => {
  clearActiveBtnClass();
  addActiveClass(defaultButton);
  renderDebouncedPhotos('default');
});
randomPhotosButton.addEventListener('click', () => {
  clearActiveBtnClass();
  addActiveClass(randomPhotosButton);
  renderDebouncedPhotos('random');
});
discussedPhotosButton.addEventListener('click', () => {
  clearActiveBtnClass();
  addActiveClass(discussedPhotosButton);
  renderDebouncedPhotos('discussed');
});
