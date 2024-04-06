// МОДУЛЬ ДЛЯ ВАЛИДАЦИИ ФОРМЫ

const hashtagReg = /^#[a-zа-яё0-9\s]{1,19}$/i;
const findDuplicates = (arr) => {
  return arr.filter(
    (currentValue, currentIndex) => arr.indexOf(currentValue) !== currentIndex
  );
};

//Функция для выполнения всех условий валидации хэштэгов
const validateHashtags = (str) => {
  // Допущение строки, состоящего из одних пробелов
  if (str.trim() === '') {
    return true;
  }
  const hashtagsArray = str.split(' ');
  const isLessThan5 = hashtagsArray.length <= 5;
  if (!isLessThan5) {
    return false;
  }
  const isNoRepeats = findDuplicates(hashtagsArray).length === 0;
  if (!isNoRepeats) {
    return false;
  }
  const isAllHashtagsMatchRegexp = hashtagsArray.every((hashtag) => {
    return hashtagReg.test(hashtag);
  });
  return isAllHashtagsMatchRegexp;
};

//Функция для валидации комментария
const validateComment = (str) => {
  return str === '' || str.length <= 140;
};

let pristine;

const pristineReset = () => pristine.reset();

//Функция валидации для Pristine
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

  const setUserFormSubmit = (onSuccess) => {
    imgUploadForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const isValid = pristine.validate();
      if (!isValid) {
        const formData = new FormData(evt.target);
        fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
          method: 'POST',
          body: formData,
        }).then((response) => {
          if (response.ok) {
            onSuccess();
          } else {
            showAlert('Не удалось отправить форму');
          }
        });
      }
    });
  };
};

export { prepareImgUploadPristine, pristineReset };
