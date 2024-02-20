//Задача № 1

let checkStringLength = function (charset, length) {
  if (charset.length <= length) {
    return true;
  } else {
    return false;
  }
};

console.log(checkStringLength("проверяемая строка", 20));

//Задача № 2

let checkPalindrom = function (checkString) {
  // let resultStr = checkString;
  // resultStr = resultStr.replaceAll(' ', '');
  // resultStr = resultStr.toLowerCase();

  const resultStr = checkString.replaceAll(" ", "").toLowerCase();

  let counter = "";
  for (let i = resultStr.length - 1; i >= 0; i--) {
    counter += resultStr[i];
  }

  return counter === resultStr;
};

console.log(checkPalindrom("топот"));
