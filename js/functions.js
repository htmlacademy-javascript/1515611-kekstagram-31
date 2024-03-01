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

//Задача № 4
/*
startDayTime - начало рабочего дня
endDayTime - конец рабочего дня
startMeetingTime - начало встречи
meetingTime - продолжительность встречи в минутах
*/

const checkMeetingTime = (
  startDayTime,
  endDayTime,
  startMeetingTime,
  meetingTime
) => {
  const startDayTimeSplit = startDayTime.split(":");
  const endDayTimeSplit = endDayTime.split(":");
  const startMeetingTimeSplit = startMeetingTime.split(":");

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

console.log(
  "checkMeetingTime",
  checkMeetingTime("08:00", "17:30", "16:00", 90)
);
