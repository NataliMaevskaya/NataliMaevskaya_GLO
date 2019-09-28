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

export default scrollToId;