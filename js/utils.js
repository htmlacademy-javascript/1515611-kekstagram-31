//МОДУЛЬ СО ВСПОМОГАТЕЛЬНЫМИ ФУНКЦИЯМИ

//получение рандомного числа
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//получение рандомного элемента массива
const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

//закрытие модалки по Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

//место в шаблоне, куда вставим данные об ошибке
const errorTemplate = document
  .querySelector('#data-error')
  .content.querySelector('.data-error');

const ALERT_SHOW_TIME = 5000;

//Функция отрисовки сообщения об ошибке

const renderError = function (data) {
  const messageElement = errorTemplate.cloneNode(true);
  document.body.appendChild(messageElement);
  setTimeout(() => {
    messageElement.remove();
  }, ALERT_SHOW_TIME);
};

export { getRandomInteger, getRandomArrayElement, isEscapeKey, renderError };
