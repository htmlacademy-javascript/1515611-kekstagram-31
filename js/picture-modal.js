import './thumbnails.js';
import { isEscapeKey } from './utils.js';

const userModalElement = document.querySelector('.big-picture');
const userModalCloseElement = document.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments'); //
const socialCommentLi = socialComments
  .querySelector('.social__comment')
  .cloneNode(true);
const socialCommentsCount = document.querySelector(
  '.social__comment-shown-count'
);
const socialTotalCount = userModalElement.querySelector(
  '.social__comment-total-count'
);

const closeModal = () => {
  userModalElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

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

const loadNextComments = () => {
  if (nextCommentsPartIndex < commentsParts.length) {
    const currentComments = commentsParts[nextCommentsPartIndex];
    renderComments(currentComments);
    nextCommentsPartIndex += 1;
    let commentsNumber = parseInt(socialCommentsCount.textContent, 10);
    commentsNumber += currentComments.length;
    socialCommentsCount.textContent = commentsNumber;
    if (socialCommentsCount.textContent === socialTotalCount.textContent) {
      document.querySelector('.comments-loader').classList.add('hidden');
    }
  }
};

const openModal = (url, description, comments, likes) => {
  commentsParts = [];
  nextCommentsPartIndex = 1;
  userModalElement.classList.remove('hidden');
  userModalElement.querySelector('.big-picture__img img').src = url;
  userModalElement.querySelector('.social__comment-total-count').textContent =
    comments.length;
  userModalElement.querySelector('.likes-count').textContent = likes;
  userModalElement.querySelector('.social__caption').textContent = description;
  socialComments.innerHTML = '';
  if (comments.length > 0) {
    const commentPartsCount = Math.ceil(comments.length / 5);
    for (let i = 0; i < commentPartsCount; i++) {
      const array = comments.slice(i * 5, i * 5 + 5);
      commentsParts.push(array);
    }
    socialCommentsCount.textContent = commentsParts[0].length;
    renderComments(commentsParts[0]);
    if (socialCommentsCount.textContent === socialTotalCount.textContent) {
      document.querySelector('.comments-loader').classList.add('hidden');
    } else {
      document.querySelector('.comments-loader').classList.remove('hidden');
    }
  }
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

userModalCloseElement.addEventListener('click', () => {
  closeModal();
});

userModalElement
  .querySelector('.comments-loader')
  .addEventListener('click', loadNextComments);

export { openModal };
