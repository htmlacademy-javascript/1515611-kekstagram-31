import { closeModal, removeEscListener } from './form.js';
import { showSuccessPopup, showErrorPopup } from './popup.js';

const hashtagReg = /^#[a-zа-яё0-9\s]{1,19}$/i;
const findDuplicates = (arr) =>
  arr.filter(
    (currentValue, currentIndex) => arr.indexOf(currentValue) !== currentIndex
  );

const validateHashtags = (str) => {
  if (str.trim() === '') {
    return true;
  }
  const hashtagsArray = str
    .toLowerCase()
    .split(' ')
    .filter((hashtag) => hashtag !== '');
  const isLessThan5 = hashtagsArray.length <= 5;
  if (!isLessThan5) {
    return false;
  }
  const isNoRepeats = findDuplicates(hashtagsArray).length === 0;
  if (!isNoRepeats) {
    return false;
  }
  const isAllHashtagsMatchRegexp = hashtagsArray.every((hashtag) =>
    hashtagReg.test(hashtag)
  );
  return isAllHashtagsMatchRegexp;
};

const validateComment = (str) => str === '' || str.length <= 140;

let pristine;

const pristineReset = () => {
  pristine.reset();
};

const prepareImgUploadPristine = (imgUploadForm) => {
  pristine = new Pristine(imgUploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error',
  });
  pristine.addValidator(
    imgUploadForm.querySelector('.text__hashtags'),
    validateHashtags,
    'Неправильный хэштег'
  );
  pristine.addValidator(
    imgUploadForm.querySelector('.text__description'),
    validateComment,
    'Комментарий должен быть не длиннее 140 символов'
  );
  const buttonSubmit = document.querySelector('.img-upload__submit');
  const uploadForm = document.querySelector('.img-upload__form');

  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      buttonSubmit.setAttribute('disabled', '');
      fetch('https://31.javascript.htmlacademy.pro/kekstagram/', {
        method: 'POST',
        body: formData,
      }).then((response) => {
        if (response.ok) {
          closeModal();
          buttonSubmit.removeAttribute('disabled');
          uploadForm.reset();
          showSuccessPopup();
        } else {
          buttonSubmit.removeAttribute('disabled');
          showErrorPopup();
          removeEscListener();
        }
      });
    }
  });
};

export { prepareImgUploadPristine, pristineReset };
