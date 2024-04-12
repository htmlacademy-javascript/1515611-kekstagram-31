//Модуль, отвечающий за отрисовку миниатюр

import { openModal } from './picture-modal';

//Секция, в которую мы будем добавлять сгенерированные фото
const pictures = document.querySelector('.pictures');
//Место в шаблоне, куда вставим данные
const cardTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

let cards = [];
//Функция отрисовки фотографий
const renderPhotos = function (data) {
  cards.forEach((card) => {
    pictures.removeChild(card);
  });
  cards = [];

  const cardListFragment = document.createDocumentFragment();
  data.forEach(({ url, description, comments, likes }) => {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.picture__img').src = url;
    cardElement.querySelector('.picture__img').alt = description;
    cardElement.querySelector('.picture__comments').textContent =
      comments.length;
    cardElement.querySelector('.picture__likes').textContent = likes;
    cardListFragment.appendChild(cardElement);
    cardElement.addEventListener('click', () => {
      openModal(url, description, comments, likes);
    });
    cards.push(cardElement);
  });
  pictures.appendChild(cardListFragment);
};

export { renderPhotos };
