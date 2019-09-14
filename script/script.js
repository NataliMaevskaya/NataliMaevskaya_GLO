window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    // Timer
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
            
        function getTimeRemaining() {
            // secs += 1;
            let dateStop = new Date(deadline).getTime(),
                // dateStop = new Date(deadline.getUTCFullYear(), deadline.getUTCMonth(), deadline.getUTCDate(), deadline.getUTCHours(), deadline.getUTCMinutes(), deadline.getUTCSeconds()).getTime(),            
                dateNow = new Date(),
                // now = new Date(),
                // now.setHours(23,59,secs),
                // dateNow = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()).getTime(),
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
            // if (timer.timeRemaining === 0) {
            //     let date = new Date();
                
            //     date.setHours(0, 0, 0, 0);
            //     date.setDate(date.getDate() + 1);
            //     countTimer(date);
            // }
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
    // let secs = 0;
    countTimer(date);

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
        let animate = () => {
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

    //scroll
    const scrollToId = () => {
        const menuHref = document.querySelectorAll('menu>ul>li>a');
        menuHref.forEach((elem) => {
            elem.addEventListener('click', () => {
                const idHref = elem.getAttribute('href');
                const block = document.querySelector(idHref);
                if (idHref === '#service-block') {
                    scrollToY(block.getBoundingClientRect().top, 200, 'easeInOutQuint');
                } else {
                    scrollToY(block.getBoundingClientRect().top, 500, 'easeInOutQuint');
                }
            });
        });
        const imgServiceScroll = document.querySelector('main>a');
        imgServiceScroll.addEventListener('click', () => {
            const block = document.querySelector('#service-block');
            scrollToY(block.getBoundingClientRect().top, 200, 'easeInOutQuint');
        } );

        
        //         // first add raf shim
        // // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
        window.requestAnimFrame = (function(){
            return  window.requestAnimationFrame       ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame    ||
                    function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                    };
        })();
        
        //   // main function
        function scrollToY(scrollTargetY, speed, easing) {
        //       // scrollTargetY: the target scrollY property of the window
        //       // speed: time in pixels per second
        //       // easing: easing equation to use
        
            let scrollY = window.scrollY || document.documentElement.scrollTop,
            currentTime = 0;
                scrollTargetY = scrollTargetY || 0;
                speed = speed || 2000;
                easing = easing || 'easeOutSine';
                
        
            // min time .1, max time .8 seconds
            let time = Math.max(0.5, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 10));
        
            // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
            let easingEquations = {
                    easeOutSine: function (pos) {
                        return Math.sin(pos * (Math.PI / 2));
                    },
                    easeInOutSine: function (pos) {
                        return (-0.5 * (Math.cos(Math.PI * pos) - 1));
                    },
                    easeInOutQuint: function (pos) {
                        if ((pos /= 0.5) < 1) {
                            return 0.5 * Math.pow(pos, 5);
                        }
                        return 0.5 * (Math.pow((pos - 2), 5) + 2);
                    }
                };
        
            // add animation loop
            function tick() {
                currentTime += 1 / 60;
        
                let p = currentTime / time;
                let t = easingEquations[easing](p);
        
                if (p < 1) {
                    window.requestAnimFrame(tick);
        
                    window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
                } else {
                    //   console.log('scroll done');
                    window.scrollTo(0, scrollTargetY);
                }
            }
        
            // call it once to get started
            tick();
        }
        // scrollTo(element, element.scrollTop, element.scrollTop + 400, 500, 0);
        // function scrollTo(element, from, to, duration, currentTime) {
        //     if (from <= 0) { from = 0;}
        //     if (to <= 0) { to = 0;}
        //     if (currentTime>=duration) { return; }
        //     let delta = to-from;
        //     let progress = currentTime / duration * Math.PI / 2;
        //     let position = delta * (Math.sin(progress));
        //     setTimeout(() => {
        //         top.window.scroll(0, from + position);
        //         // element.scrollTop = from + position;
        //         scrollTo(element, from, to, duration, currentTime + 10);
        //         // this.scrollTo(element, from, to, duration, currentTime + 10);
        //     }, 10);
        // }
    };
    scrollToId();
        

    
});