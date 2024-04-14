const getData = function (onSuccess, onError) {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((body) => onSuccess(body))
    .catch((err) => {
      onError(err);
    });
};

export { getData };
