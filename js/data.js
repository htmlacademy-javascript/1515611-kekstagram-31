//модуль, который создает данные

import { names, messages } from "./constants.js";
import { getRandomInteger, getRandomArrayElement } from "./utils.js";

const createArray = () => {
  const Arr = [];
  for (let i = 1; i <= 25; i++) {
    const obj = {
      id: i,
      url: `photos/${i}.jpg`,
      description: "desc",
      likes: getRandomInteger(15, 200),
    };

    const comments = [];
    const commentsCount = getRandomInteger(0, 30);
    for (let j = 0; j <= commentsCount; j++) {
      const comment = {
        id: getRandomInteger(0, 1000),
        avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
        message: getRandomArrayElement(messages),
        name: getRandomArrayElement(names),
      };
      comments.push(comment);
    }

    obj.comments = comments;

    Arr.push(obj);
  }
  return Arr;
};

export { createArray };
