//Модуль, отвечающий за модальное окно
import './thumbnails.js';
import { isEscapeKey } from './utils.js';

const userModalElement = document.querySelector('.big-picture');
const userModalCloseElement = document.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments'); //
const socialCommentLi = socialComments
  .querySelector('.social__comment')
  .cloneNode(true);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

//Закрытие модалки
const closeModal = () => {
  userModalElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

//Функция отрисовки комментов
const renderComments = (array) => {
  array.forEach((comment) => {
    const commentSection = socialCommentLi.cloneNode(true);
    commentSection.querySelector('.social__picture').src = comment.avatar;
    commentSection.querySelector('.social__picture').alt = comment.name;
    commentSection.querySelector('.social__text').textContent = comment.message;
    socialComments.appendChild(commentSection);
  });
};

let commentsParts = [];
let nextCommentsPartIndex = 1;
//Подгрузка по пять комментов
const loadNextComments = () => {
  if (nextCommentsPartIndex < commentsParts.length) {
    renderComments(commentsParts[nextCommentsPartIndex]);
    nextCommentsPartIndex += 1;
  }
};

//Функция открытия модалки
const openModal = (url, description, comments, likes) => {
  //Очистка комментариев от предыдущей миниатюры
  commentsParts = [];
  nextCommentsPartIndex = 1;

  userModalElement.classList.remove('hidden');
  userModalElement.querySelector('.big-picture__img img').src = url;
  userModalElement.querySelector('.social__comment-total-count').textContent =
    comments.length;
  userModalElement.querySelector('.likes-count').textContent = likes;
  userModalElement.querySelector('.social__caption').textContent = description;
  socialComments.innerHTML = '';
  userModalElement
    .querySelector('.social__comment-count')
    .classList.add('hidden');

  if (comments.length > 0) {
    //Разбиение комментов по 5
    const commentPartsCount = Math.ceil(comments.length / 5);
    for (let i = 0; i < commentPartsCount; i++) {
      const array = comments.slice(i * 5, i * 5 + 5);
      commentsParts.push(array);
    }
    //Отрисовка первых 5 комментов
    renderComments(commentsParts[0]);
  }

  //Выключение скролла
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

userModalCloseElement.addEventListener('click', () => {
  closeModal();
});
//Добавление клика на "Загрузить еще"
userModalElement
  .querySelector('.comments-loader')
  .addEventListener('click', loadNextComments);

export { openModal };
