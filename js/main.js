import { createArray } from './data.js';
import { renderPhotos } from './thumbnails.js';
import { prepareLoadImageForm } from './form.js';

const photos = createArray();
renderPhotos(photos);
prepareLoadImageForm();
