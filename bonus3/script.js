'use strict';

const h1 = document.querySelector('#color'),
      button = document.querySelector('#change');

      h1.textContent = '#008d3b';
      document.body.style.background = '#008d3b';
      
button.addEventListener('click', () => {
    const color = '#'+Math.floor(Math.random()*16777215).toString(16);
    h1.textContent = color;
    document.body.style.background = color;
});