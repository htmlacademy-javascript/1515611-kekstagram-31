// Отобразить фотографии других пользователей.

// Заведите модуль, который будет отвечать за отрисовку миниатюр.

// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Описание изображения description подставьте в атрибут alt изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

// Подключите модуль в проект.

import { createArray } from "./data.js";
const fillPhotos = function () {
  //В users записываем массив пользователей
  const users = createArray();

  //Секция, в которую мы вставляем сгенерированные данные
  const pictures = document.querySelector(".pictures");
  const userTemplate = document
    .querySelector("#picture")
    .content.querySelector(".picture");

  const usersListFragment = document.createDocumentFragment();
  users.forEach((user) => {
    const userElement = userTemplate.cloneNode(true);
    userElement.querySelector(".picture__img").src = user.url;
    userElement.querySelector(".picture__img").alt = user.description;
    userElement.querySelector(".picture__comments").textContent =
      user.comments.length;
    userElement.querySelector(".picture__likes").textContent = user.likes;
    usersListFragment.appendChild(userElement);
  });
  pictures.appendChild(usersListFragment);
};

export { fillPhotos };
