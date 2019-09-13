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
                // console.log(timeRemaining);
                // console.log(dateStop);
                // console.log(dateNow);
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
    console.log(document.documentElement.clientWidth);

    //Меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const  handlerMenu = () => {
            // menu.classList.toggle('active-menu');
            if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
                menu.style.transform = `translate(0)`;
            } else {
                menu.style.transform = `translate(-100%)`;
            }
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
            
        
    };
    toggleMenu();
    
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close');        

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                // console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent));
                
                if (document.documentElement.clientWidth > 426) {
                    popup.style.opacity = 0;
                    animate();
                }
                popup.style.display = 'block';
                            
            });            
        });

        let showModal;
        let animate = function() {
            showModal = requestAnimationFrame(animate);
            if (popup.style.opacity < 1) {
                popup.style.opacity = +popup.style.opacity + 0.04;
            } else {
                cancelAnimationFrame(showModal);
            }
        };
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };
    togglePopUp();

    
});