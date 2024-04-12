// Функция getData, которая принимает колбэки, которые вызовутся после успешного и неуспешного вызова fetch и парса body.
const getData = function (onSuccess, onError) {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((body) => onSuccess(body))
    .catch((err) => {
      console.error(err);
      onError();
    });
};

export { getData };
