const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const errorTemplate = document
  .querySelector('#data-error')
  .content.querySelector('.data-error');

const ALERT_SHOW_TIME = 5000;

const renderError = function () {
  const messageElement = errorTemplate.cloneNode(true);
  document.body.appendChild(messageElement);
  setTimeout(() => {
    messageElement.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomInteger,
  getRandomArrayElement,
  isEscapeKey,
  renderError,
  debounce,
};
