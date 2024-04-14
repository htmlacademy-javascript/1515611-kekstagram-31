import { renderPhotos } from './thumbnails.js';
import { prepareLoadImageForm } from './form.js';
import { getData } from './api.js';
import { renderError } from './utils.js';
import { showFilters } from './filters.js';

getData(
  (data) => {
    renderPhotos(data);
    showFilters();
  },
  () => {
    renderError();
  }
);
prepareLoadImageForm();
