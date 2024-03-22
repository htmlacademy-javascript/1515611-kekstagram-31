//модуль, который создает данные

import { NAMES, MESSAGES } from "./constants.js";
import { getRandomInteger, getRandomArrayElement } from "./utils.js";

const createArray = () => {
  const Array = [];
  for (let i = 1; i <= 25; i++) {
    const user = {
      id: i,
      url: `photos/${i}.jpg`,
      description: "Тестим новую камеру!",
      likes: getRandomInteger(15, 200),
    };

    const comments = [];
    const commentsCount = getRandomInteger(0, 30);
    for (let j = 0; j <= commentsCount; j++) {
      const comment = {
        id: getRandomInteger(0, 1000),
        avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
        message: getRandomArrayElement(MESSAGES),
        name: getRandomArrayElement(NAMES),
      };
      comments.push(comment);
    }

    user.comments = comments;

    Array.push(user);
    console.log(createArray.comments);
  }
  return Array; //функция возвращает объект user со свойствами: id, url, description, likes
};

export { createArray };
