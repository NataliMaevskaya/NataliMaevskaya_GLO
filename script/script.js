window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    // Timer
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
            
        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),            
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),                
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);

                return {timeRemaining, hours, minutes, seconds};
        }
        function updateClock() {
            let timer = getTimeRemaining();
            for (let key in timer) {
                if(timer[key] < 0) {
                    timer[key] ='00';
                } else {
                    timer[key] = beginZero(timer[key]);
                }
                
            }

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            if(timer.timeRemaining > 0) {
                setInterval(updateClock, 1000);
            }
        }
        function beginZero(amount) {
            if (amount < 10 && amount >= 0) {
                amount = '0' + amount;
            }
            return amount;
        }
        updateClock();
            
    }
    let date = new Date();
    
    date.setHours(0, 0, 0, 0);
    // date.setDate(date.getDate() - 1);
    date.setDate(date.getDate() + 1);
    countTimer(date);
    //// setInterval(countTimer, 1000, '12 september 2019');
});