const names = [
  "Иван",
  "Хун Себастьян",
  "Мария",
  "Кристоф",
  "Виктор",
  "Юлия",
  "Люпита",
  "Вашингтон",
  "Ивар",
  "Хуан Себастьян",
  "Марина",
  "Кристос",
  "Виктос",
  "Юля",
  "Люмита",
  "Вашинг",
  "Ивас",
  "Хан Себастьян",
  "Мариша",
  "Кристор",
  "Виктож",
  "Юлина",
  "Люпиджа",
  "Ваштон",
  "Ива",
];

const messages = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

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

console.log(createArray());
