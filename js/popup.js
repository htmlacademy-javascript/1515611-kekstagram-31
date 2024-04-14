import { isEscapeKey } from './utils.js';
import { addEscListener } from './form.js';

const closeSuccessPopup = () => {
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', isEscapeKey);
};

const successPopupTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');

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
  successPopupElement.addEventListener('click', (evt) => {
    if (evt.target === successPopupElement) {
      closeSuccessPopup();
    }
  });
  document.body.append(successPopupElement);
};

const errorPopupTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');

const escHandler = (e) => {
  if (isEscapeKey(e)) {
    closeErrorPopup();
  }
};

function closeErrorPopup() {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', escHandler);
  addEscListener();
}

const showErrorPopup = () => {
  const errorPopupElement = errorPopupTemplate.cloneNode(true);
  errorPopupElement
    .querySelector('.error__button')
    .addEventListener('click', () => {
      closeErrorPopup();
    });

  errorPopupElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('error')) {
      closeErrorPopup();
    }
  });
  document.addEventListener('keydown', escHandler);
  document.body.append(errorPopupElement);
};
export { showSuccessPopup, showErrorPopup };
