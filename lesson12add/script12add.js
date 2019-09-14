'use strict';

let ballImg = document.querySelector('.red-ball');
ballImg.style.cssText = 'position: relative;';

let btnActive = document.createElement('button');
btnActive.textContent = 'Active';
btnActive.classList.add('btn-active');
document.querySelector('body').insertBefore(btnActive, ballImg);

let btnReset = document.createElement('button');
btnReset.textContent = 'Reset';
btnReset.classList.add('btn-reset');
btnReset.style.marginLeft = '5px';
document.querySelector('body').insertBefore(btnReset, ballImg);

let activeAnimate = false,
    goBall,
    delta = 0;
// const width = document.documentElement.clientWidth;
const width = screen.width;
console.log('width: ', width);
let animate = () => {
    goBall = requestAnimationFrame(animate);
    delta ++;
    if (delta < width) {
        ballImg.style.left = delta + 'px';
    } else {
        activeAnimate = false;
        cancelAnimationFrame(goBall);        
    }    
}; 

btnActive.addEventListener('click', () => {
    if (activeAnimate) {
        cancelAnimationFrame(goBall);
        activeAnimate = false;
    } else {
        activeAnimate = true;        
        goBall = requestAnimationFrame(animate);
        
    }    
});
btnReset.addEventListener('click', () => {
    cancelAnimationFrame(goBall);
    activeAnimate = false;
    delta = 0;
    ballImg.style.left = delta;
});




