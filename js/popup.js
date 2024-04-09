//МОДУЛЬ ДЛЯ ПОКАЗА СООБЩЕНИЙ ФОРМЫ
import { isEscapeKey } from './utils.js';

//Показ окна об успешной отправке
const successPopupTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');

const closeSuccessPopup = () => {
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', isEscapeKey);
};

const showSuccessPopup = () => {
  const successPopupElement = successPopupTemplate.cloneNode(true);
  successPopupElement
    .querySelector('.success__button')
    .addEventListener('click', () => {
      closeSuccessPopup();
    });
  document.addEventListener('keydown', (e) => {
    if (isEscapeKey(e)) {
      closeSuccessPopup();
    }
  });
  document.body.append(successPopupElement);
};

//Показ сообщения об ошибке

const errorPopupTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');
const closeErrorPopup = () => {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', isEscapeKey);
};

const showErrorPopup = () => {
  const errorPopupElement = errorPopupTemplate.cloneNode(true);
  errorPopupElement
    .querySelector('.error__button')
    .addEventListener('click', () => {
      closeErrorPopup();
    });
  document.addEventListener('keydown', (e) => {
    if (isEscapeKey(e)) {
      closeErrorPopup();
    }
  });
  document.body.append(errorPopupElement);
};
export { showSuccessPopup, showErrorPopup };
