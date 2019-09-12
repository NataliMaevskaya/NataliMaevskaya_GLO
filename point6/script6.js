const date = new Date();
const hours = date.getHours();
let result = '';

if (hours >= 22 || hours < 3) {
    result += 'Доброй ночи!';
} else if (hours >= 3 && hours < 10) {
    result += 'Доброе утро!';
}else if (hours >= 10 && hours < 15) {
    result += 'Добрый день!';
} else {
    result += 'Добрый вечер!';
}

function getWeekDay(date) {
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];  
    return days[date.getDay()];
}

const weekDay = getWeekDay(date);
const time = date.toLocaleTimeString('en');
const dateNY = new Date(date.getFullYear() + 1, 0, 1);
const daysUntilNY = Math.floor((dateNY.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
const leftWord = getNoun(daysUntilNY, 'остался', 'осталось', 'осталось');
const dayWord = getNoun(daysUntilNY, 'день', 'дня', 'дней');

function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }

result = `<p>${result}<br>
          Сегодня: ${weekDay}<br>
          Текущее время: ${time}<br>
          До нового года ${leftWord} ${daysUntilNY} ${dayWord}</p>`;
const elemBody = document.querySelector('body');
elemBody.innerHTML = result;