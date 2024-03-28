const imgPreview = document.querySelector('.img-upload__preview img');
const radioList = document.querySelector('.effects__list');

const removeEffects = () => {
  imgPreview.classList.remove('effects__preview--sepia');
  imgPreview.classList.remove('effects__preview--chrome');
  imgPreview.classList.remove('effects__preview--phobos');
  imgPreview.classList.remove('effects__preview--marvin');
  imgPreview.classList.remove('effects__preview--heat');
};

//Функция для применения эффекта на фото большого кота

radioList.addEventListener('change', function (evt) {
  removeEffects();
  if (evt.target.value === 'none') {
    return;
  }
  imgPreview.classList.add(`effects__preview--${evt.target.value}`);
});
