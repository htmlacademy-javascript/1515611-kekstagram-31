//МОДУЛЬ ДЛЯ ЭФФЕКТОВ ФИЛЬТРА И СЛАЙДЕРА

const imgPreview = document.querySelector('.img-upload__preview img');
const radioList = document.querySelector('.effects__list');

const removeEffects = () => {
  imgPreview.classList.remove('effects__preview--sepia');
  imgPreview.classList.remove('effects__preview--chrome');
  imgPreview.classList.remove('effects__preview--phobos');
  imgPreview.classList.remove('effects__preview--marvin');
  imgPreview.classList.remove('effects__preview--heat');
};

//Функция для применения эффекта фильтра на фото большого кота

radioList.addEventListener('change', function (evt) {
  removeEffects();
  if (evt.target.value === 'none') {
    return;
  }
  imgPreview.classList.add(`effects__preview--${evt.target.value}`);
});

//Слайдер

const sliderElement = document.querySelector('.effect-level__slider');
const scaleInput = document.querySelector('.scale__control--value');
const controlMinus = document.querySelector('.scale__control--smaller');
const controlPlus = document.querySelector('.scale__control--bigger');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {});

let imgScale = 100;
//Нажатие на кнопку "минус"
controlMinus.addEventListener('click', () => {
  imgScale = Math.max(25, imgScale - 25);
  scaleInput.value = imgScale + '%';
  imgPreview.style.transform = `scale(${imgScale / 100})`;
});

//Нажатие на кнопку "плюс"
controlPlus.addEventListener('click', () => {
  imgScale = Math.min(100, imgScale + 25);
  scaleInput.value = imgScale + '%';
  imgPreview.style.transform = `scale(${imgScale / 100})`;
});

function resetScale() {
  imgScale = 100;
  imgPreview.style.transform = `scale(1)`;
  scaleInput.value = '100%';
}

export { resetScale };
