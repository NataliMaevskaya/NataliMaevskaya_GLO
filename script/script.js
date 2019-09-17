window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    // Timer
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
            
        function getTimeRemaining() {
            // secs += 1;
            

                // const convertGMTtoUTC = (date) => {
                //     const strUTC = date.toISOString();
                //     console.log('strUTC: ', strUTC);
                //     // console.log(strUTC.substr(0, 4), strUTC.substr(5, 7), strUTC.substr(8, 10), strUTC.substr(11, 13), strUTC.substr(14, 16), strUTC.substr(17, 19));
                //     // console.log('день: ', strUTC.substr(8, 10));
                //     // console.log('месяц: ', strUTC.substr(5, 7));
                //     // console.log('год: ', strUTC.substr(0, 4));
                    
                //     return new Date(strUTC.substr(0, 4), strUTC.substr(5, 7), strUTC.substr(8, 10), strUTC.substr(11, 13), strUTC.substr(14, 16), strUTC.substr(17, 19));
                // };
                // const deadlineStrUTC = convertGMTtoUTC(deadline);
                // const deadlineStrUTC = convertGMTtoUTC(deadline),
                // dateNowStrUTC = convertGMTtoUTC(new Date());
                // console.log(deadlineStrUTC);
                // console.log(dateNowStrUTC);
//                 2019-09-16T21:00:00.000Z
// s            14 2019-09-16T14:38:22.858Z
            let dateStop = new Date(deadline).getTime(),
            // let    dateStop = new Date(deadline.getUTCFullYear(), deadline.getUTCMonth(), deadline.getUTCDate(), deadline.getUTCHours(), deadline.getUTCMinutes(), deadline.getUTCSeconds()).getTime(),            
            
                dateNow = new Date(),
                // now = new Date(),
                // now.setHours(23,59,secs),
                // dateNow = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()).getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),                
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);

                // console.log('dateStop: ', deadline.getUTCFullYear(), deadline.getUTCMonth(), deadline.getUTCDate(), deadline.getUTCHours(), deadline.getUTCMinutes(), deadline.getUTCSeconds());
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
                setTimeout(updateClock, 1000);
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
    // date.setHours(date.getHours() - 3, 0, 0, 0);
    // date.setDate(date.getDate() - 1);
    date.setDate(date.getDate() + 1);
    // console.log(date);
    // let secs = 0;
    countTimer(date);

    //Меню
    const toggleMenu = () => {
        const menu = document.querySelector('menu'),
            body = document.querySelector('body');

        const  handlerMenu = () => {
            // menu.classList.toggle('active-menu');
            if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
                menu.style.transform = `translate(0)`;
            } else {
                menu.style.transform = `translate(-100%)`;
            }
        };
        body.addEventListener('click', (event) => {
            const target = event.target;
            // console.log(target);
            // if((target.closest('menu') && !target.matches('menu')) || (target.closest('.menu') && !target.matches('.menu'))) handlerMenu();
            if((target.closest('menu') && !target.matches('menu')) || target.closest('.menu')) {
                handlerMenu(); 
            }
            else if (target.closest('body') && !target.matches('menu')) {
                menu.style.transform = `translate(-100%)`;
            }
            
        });       
    };
    toggleMenu();
    
    //PopUp
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn');       

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

        popup.addEventListener('click', (event) => {
            let target = event.target;
            if(target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if(!target) {
                    popup.style.display = 'none';
                }
            }
            
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

    //табы 
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {

            for (let i = 0; i < tabContent.length; i++) {

                if(index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;

            //возвращает null, елси не нашел соответствующий селектор, поднимаяся выше к родителям при поиске
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if(item === target) {
                        toggleTabContent(i);
                    }
                });
            }                            
        });
    };
    tabs();    

    //слайдер 
    const slider = () => {
        const slide  = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            portfolioDots = document.querySelector('.portfolio-dots'),
            slider = document.querySelector('.portfolio-content');

            
        const addDots = (numDots) => {
            for (let i = 0; i < numDots; i++) {
                let newElem = document.createElement('li');
                newElem.classList.add('dot');
                if (i === 0) {
                    newElem.classList.add('dot-active');
                }
                portfolioDots.appendChild(newElem);
            }
        };
        addDots(slide.length);

        const dot = document.querySelectorAll('.dot');
        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };
        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            if(!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });
        slider.addEventListener ('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                stopSlide();
            }
        });
        slider.addEventListener ('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                startSlide();
            }
        });
        startSlide(1500);
    };
    slider();
});