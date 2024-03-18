// Отобразить фотографии других пользователей.

// Заведите модуль, который будет отвечать за отрисовку миниатюр.

// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Описание изображения description подставьте в атрибут alt изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

const pictures = document.querySelector(".pictures");
const cardTemplate = document
  .querySelector("#picture")
  .content.querySelector(".picture");

const renderPhotos = function (data) {
  //В users записываем массив пользователей
  // const users = createArray();

  //Секция, в которую мы вставляем сгенерированные данные

  const cardListFragment = document.createDocumentFragment();
  data.forEach(({ url, description, comments, likes }) => {
    const cardElement = cardTemplate.cloneNode(true);
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
