//МОДУЛЬ ДЛЯ ЭФФЕКТОВ ФИЛЬТРА И СЛАЙДЕРА

const effectLevel = document.querySelector('.img-upload__effect-level');
const imgPreview = document.querySelector('.img-upload__preview img');
const radioList = document.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const scaleInput = document.querySelector('.scale__control--value');
const controlMinus = document.querySelector('.scale__control--smaller');
const controlPlus = document.querySelector('.scale__control--bigger');
const effectValue = document.querySelector('.effect-level__value');

const effects = {
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    measure: '',
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    measure: '',
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    measure: '%',
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    measure: 'px',
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    measure: '',
  },
};

const removeEffect = () => {
  console.log('remove efect');
  imgPreview.removeAttribute('style');
  effectLevel.classList.add('visually-hidden');
};

let currentSelectedEffect = 'none';

//Функция для применения эффекта фильтра на фото большого кота
radioList.addEventListener('change', function (evt) {
  const effectName = evt.target.value;
  currentSelectedEffect = effectName;
  removeEffect();
  if (effectName === 'none') {
    return;
  }

  //Получаем настройки текущего эффекта
  const effectOptions = effects[effectName];
  //Обновляем максимальное и максимальное значение слайдера
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effectOptions.min,
      max: effectOptions.max,
    },
    step: effectOptions.step,
  });
  sliderElement.noUiSlider.set(effectOptions.max);

  imgPreview.style.filter = `${effectOptions.filter}(${effectOptions.max}${effectOptions.measure})`;
  effectLevel.classList.remove('visually-hidden');
});

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', () => {
  if (currentSelectedEffect !== 'none') {
    const effectOptions = effects[currentSelectedEffect];
    const value = sliderElement.noUiSlider.get();
    effectValue.value = value;
    imgPreview.style.filter = `${effectOptions.filter}(${value}${effectOptions.measure})`;
  }
});

//Изменение масштаба картинки-----------------------------------------
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

export { resetScale, removeEffect, effectLevel };
