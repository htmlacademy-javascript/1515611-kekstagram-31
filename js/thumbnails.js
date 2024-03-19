//Модуль, отвечающий за отрисовку миниатюр

import { openModal } from "./picture-modal";

//секция, в которую мы будем добавлять сгенерированные фото
const pictures = document.querySelector(".pictures");
//место в шаблоне, куда вставим данные
const cardTemplate = document
  .querySelector("#picture")
  .content.querySelector(".picture");

//функция отрисовки фотографий
const renderPhotos = function (data) {
  const cardListFragment = document.createDocumentFragment();
  data.forEach(({ url, description, comments, likes }) => {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.addEventListener("click", () => {
      openModal(url, description, comments, likes);
    });
    cardElement.querySelector(".picture__img").src = url;
    cardElement.querySelector(".picture__img").alt = description;
    cardElement.querySelector(".picture__comments").textContent =
      comments.length;
    cardElement.querySelector(".picture__likes").textContent = likes;
    cardListFragment.appendChild(cardElement);
  });
  pictures.appendChild(cardListFragment);
};

export { renderPhotos };
