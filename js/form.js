import { prepareImgUploadPristine, pristineReset } from './validation.js';
import { isEscapeKey } from './utils.js';
import { resetScale, removeEffect, effectLevel } from './effects.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imgUploadForm = document.querySelector('.img-upload__form');
const editImage = document.querySelector('.img-upload__overlay');
const formInput = document.querySelector('.img-upload__input');
const closeForm = document.querySelector('.img-upload__cancel');
const startStateInput = document.querySelector('.img-upload__input');
const imgPreview = document.querySelector('.img-upload__preview img');
const hashtagInput = editImage.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const effectsThumbs = document.querySelectorAll('.effects__preview');

let currentImage;
let isHashtagInputFocused = false; //задаем изначальное состояние
let isCommentInputFocused = false;

const showModal = (doShow = true) => {
  if (doShow) {
    editImage.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onEscapeKeyDown);
    removeEffect();
    effectLevel.classList.add('visually-hidden');
    document.querySelector('.img-upload__submit').removeAttribute('disabled');
  } else {
    editImage.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  }
};

const removeEscListener = () => {
  document.removeEventListener('keydown', onEscapeKeyDown);
};

const addEscListener = () => {
  document.addEventListener('keydown', onEscapeKeyDown);
};

const renderPreviewImage = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    currentImage = file;
    imgPreview.src = URL.createObjectURL(currentImage);
  }
  effectsThumbs.forEach((item) => {
    item.style.backgroundImage = `url(${URL.createObjectURL(currentImage)})`;
  });
};

const openModal = (evt) => {
  showModal();
  renderPreviewImage(evt);
  resetScale();
};

function onEscapeKeyDown(evt) {
  if (isEscapeKey(evt)) {
    if (!isHashtagInputFocused && !isCommentInputFocused) {
      closeModal();
    }
  }
}

function closeModal() {
  startStateInput.value = null;
  showModal(false);
  pristineReset();
  imgUploadForm.reset();
  document.removeEventListener('keydown', onEscapeKeyDown);
}

const prepareLoadImageForm = () => {
  hashtagInput.addEventListener('focus', () => {
    isHashtagInputFocused = true;
  });
  hashtagInput.addEventListener('blur', () => {
    isHashtagInputFocused = false;
  });
  commentInput.addEventListener('focus', () => {
    isCommentInputFocused = true;
  });
  commentInput.addEventListener('blur', () => {
    isCommentInputFocused = false;
  });
  formInput.addEventListener('change', openModal);
  closeForm.addEventListener('click', closeModal);
  prepareImgUploadPristine(imgUploadForm);
};

export { prepareLoadImageForm, closeModal, removeEscListener, addEscListener };
