import { openModal } from './picture-modal';

const pictures = document.querySelector('.pictures');
const cardTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

let cards = [];

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
