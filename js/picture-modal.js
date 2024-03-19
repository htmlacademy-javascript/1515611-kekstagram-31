//Модуль, отвечающий за модальное окно
import "./thumbnails.js";

const userModalElement = document.querySelector(".big-picture");
const userModalCloseElement = document.querySelector(".big-picture__cancel");
const socialComments = document.querySelector(".social__comments"); //
const socialCommentLi = socialComments
  .querySelector(".social__comment")
  .cloneNode(true);

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

//Функция открытия модалки
const openModal = (url, description, comments, likes) => {
  userModalElement.classList.remove("hidden");
  userModalElement.querySelector(".big-picture__img img").src = url;
  userModalElement.querySelector(".social__comment-total-count").textContent =
    comments.length;
  userModalElement.querySelector(".likes-count").textContent = likes;
  userModalElement.querySelector(".social__caption").textContent = description;
  socialComments.innerHTML = "";
  userModalElement
    .querySelector(".social__comment-count")
    .classList.add("hidden");
  userModalElement.querySelector(".comments-loader").classList.add("hidden");

  //Генерация комментов
  comments.forEach((comment) => {
    // функция будет вызываться от 0 до 30 раз, то есть столько, сколько комментов в массиве comments
    const commentSection = socialCommentLi.cloneNode(true);
    commentSection.querySelector(".social__picture").src = comment.avatar;
    commentSection.querySelector(".social__picture").alt = comment.name;
    commentSection.querySelector(".social__text").textContent = comment.message;
    socialComments.appendChild(commentSection);
  });

  //Выключение скролла
  document.querySelector("body").classList.add("modal-open");

  document.addEventListener("keydown", onDocumentKeydown);
};

const closeModal = () => {
  userModalElement.classList.add("hidden");
  document.querySelector("body").classList.remove("modal-open");
  document.removeEventListener("keydown", onDocumentKeydown);
};

userModalCloseElement.addEventListener("click", () => {
  closeModal();
});

export { openModal };
