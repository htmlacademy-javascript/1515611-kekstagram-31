//Задача № 1

const checkStringLength = function (charset, length) {
  if (charset.length <= length) {
    return true;
  } else {
    return false;
  }
};

//Задача № 2

const checkPalindrom = function (checkString) {
  const resultStr = checkString.replaceAll(' ', '').toLowerCase();
  let counter = '';
  for (let i = resultStr.length - 1; i >= 0; i--) {
    counter += resultStr[i];
  }
  return counter === resultStr;
};

//Задача № 4
/*
startDayTime - начало рабочего дня
endDayTime - конец рабочего дня
startMeetingTime - начало встречи
meetingTime - продолжительность встречи в минутах
*/

// разделяем на 2 числа в массиве и превращаем в минуты
const checkMeetingTime = (
  startDayTime,
  endDayTime,
  startMeetingTime,
  meetingTime
) => {
  const startDayTimeSplit = startDayTime.split(':');
  const endDayTimeSplit = endDayTime.split(':');
  const startMeetingTimeSplit = startMeetingTime.split(':');

  const startDayTimeMin =
    Number(startDayTimeSplit[0]) * 60 + Number(startDayTimeSplit[1]);
  const endDayTimeMin =
    Number(endDayTimeSplit[0]) * 60 + Number(endDayTimeSplit[1]);
  const startMeetingTimeMin =
    Number(startMeetingTimeSplit[0]) * 60 + Number(startMeetingTimeSplit[1]);

  return (
    startMeetingTimeMin >= startDayTimeMin &&
    startMeetingTimeMin + meetingTime <= endDayTimeMin
  );
};
