import { renderPhotos } from './thumbnails.js';
import { prepareLoadImageForm } from './form.js';
import { getData } from './api.js';
import { renderError } from './utils.js';
import './filters.js';

getData(
  (data) => {
    renderPhotos(data);
  },
  () => {
    renderError();
  }
);
prepareLoadImageForm();
