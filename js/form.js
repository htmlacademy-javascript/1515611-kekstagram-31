//Модуль, отвечающий за работу с формой

const editImage = document.querySelector('.img-upload__overlay');
const formInput = document.querySelector('.img-upload__input');
const closeForm = document.querySelector('.img-upload__cancel');
const startStateInput = document.querySelector('.img-upload__input');
const effectRadios = document.querySelectorAll('.effects__radio');
const imgPreview = document.querySelector('.img-upload__preview img'); //фотография большого кота

const removeEffects = () => {
  imgPreview.classList.remove('effects__preview--sepia');
  imgPreview.classList.remove('effects__preview--chrome');
  imgPreview.classList.remove('effects__preview--phobos');
  imgPreview.classList.remove('effects__preview--marvin');
  imgPreview.classList.remove('effects__preview--heat');
};

let currentImage;

//Функция для применения эффекта на фото большого кота
const addRadiokHandler = function (radio) {
  radio.addEventListener('change', function () {
    removeEffects();

    if (radio.id === 'effect-chrome') {
      imgPreview.classList.add('effects__preview--chrome');
    }

    if (radio.id === 'effect-sepia') {
      imgPreview.classList.add('effects__preview--sepia');
    }

    if (radio.id === 'effect-marvin') {
      imgPreview.classList.add('effects__preview--marvin');
    }

    if (radio.id === 'effect-phobos') {
      imgPreview.classList.add('effects__preview--phobos');
    }

    if (radio.id === 'effect-heat') {
      imgPreview.classList.add('effects__preview--heat');
    }
  });
};

//Функция закрытия модалки
const closeModal = () => {
  startStateInput.value = null;
  editImage.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

//Функция открытия модалки
const openModal = (evt) => {
  currentImage = evt.target.files[0];
  if (currentImage) {
    // потому что пользователь может нажать и "Отмена"
    editImage.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    // imgPreview.src = URL.createObjectURL(currentImage);
  }
};
// Функция для валидации формы-----------Не сделано----------------

const chooseEffectForm = document.querySelector('.form');
const pristine = new Pristine();
const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

//Функция с обработчиками
const prepareLoadImageForm = () => {
  formInput.addEventListener('change', openModal);
  closeForm.addEventListener('click', closeModal);

  for (let i = 0; i < effectRadios.length; i++) {
    addRadiokHandler(effectRadios[i]);
  }
};

export { prepareLoadImageForm };
