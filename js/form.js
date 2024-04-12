//МОДУЛЬ ДЛЯ РАБОТЫ С ФОРМОЙ
import { prepareImgUploadPristine, pristineReset } from './validation.js';
import { isEscapeKey } from './utils.js';
import { resetScale } from './effects.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const editImage = document.querySelector('.img-upload__overlay');
const formInput = document.querySelector('.img-upload__input');
const closeForm = document.querySelector('.img-upload__cancel');
const startStateInput = document.querySelector('.img-upload__input');
const imgPreview = document.querySelector('.img-upload__preview img');
const hashtagInput = editImage.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

let currentImage;
let isHashtagInputFocused = false; //задаем изначальное состояние
let isCommentInputFocused = false;

const showModal = (doShow = true) => {
  if (doShow) {
    editImage.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onEscapeKeyDown);
  } else {
    editImage.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  }
};

//Загрузка фотографии с компа
const renderPreviewImage = (evt) => {
  currentImage = evt.target.files[0];
  imgPreview.src = URL.createObjectURL(currentImage);
};

//Функция открытия модалки
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

//Функция закрытия модалки
function closeModal() {
  startStateInput.value = null;
  showModal(false);
  pristineReset();
  document.removeEventListener('keydown', onEscapeKeyDown);
}

//Функция с обработчиками
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

export { prepareLoadImageForm, closeModal };
