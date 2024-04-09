// Функция getData, которая принимает колбэк, который вызовется после успешного вызова fetch и парса body.
const getData = function (onSuccess, onError) {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch((err) => {
      console.error(err);
      onError();
    });
};

export { getData };
