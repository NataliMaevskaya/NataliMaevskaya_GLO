'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import scrollToId from './modules/scrollToId';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImg from './modules/changeImg';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Timer    
let date = new Date();    
date.setHours(0, 0, 0, 0);
// date.setHours(date.getHours() - 3, 0, 0, 0);
// date.setDate(date.getDate() - 1);
date.setDate(date.getDate() + 1);
countTimer(date);

//Menu    
toggleMenu();

// PopUp    
togglePopUp();

// Scroll    
scrollToId();

// Tabs     
tabs();    

// Slider    
slider();

// Change image    
changeImg();

// Calculator    
calc(100);

// Send AJAX form    
sendForm('form1');
sendForm('form2');
sendForm('form3');

