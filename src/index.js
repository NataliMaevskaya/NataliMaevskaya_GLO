'use strict';


import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import scrollToId from './modules/scrollToId';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImg from './modules/changeImg';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import SliderCarousel from './modules/SliderCarousel';
import Validator from './modules/Validator';


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

const options = {
    main: '.companies-wrapper',
    wrap: '.companies-hor',
    // prev: '#test-left',
    // next: '#test-right',
    slidesToShow: 4,
    infinity: true,

    responsive: [{
        breakpoint: 1024,
        slidesToShow: 3
    },
    {
        breakpoint: 768,
        slidesToShow: 2
    },
    {
        breakpoint: 576,
        slidesToShow: 1
    }]
 };
const carousel = new SliderCarousel(options);
carousel.init();

const valid = new Validator({
    selector: '#form1',
    pattern: {
        phone: /^\+\d+$/,
       // phone: /^\+375([-()23459]){4}\d{7}$/,
       // phone: /^\+380\d{7}$/,
       // name: /[а-яё]/gi
       name: /^[а-яё\s]+$/i
       // name: /^[а-яё]*[\s]*[А-ЯЁ]*$/gi
       //  name: /^[[А-ЯЁ]*[а-яё]*\s*]*$/gi
       //  name: /^[a-z\' \']+$/gi
       //  name: /^[a-zA-Z]+$/g
    },
    method: {
       'form1-name': [
           ['notEmpty'],
           ['pattern', 'name']
        ],
       'form1-email': [
           ['notEmpty'],
           ['pattern', 'email']
       ],
       'form1-phone': [
           ['notEmpty'],
           ['pattern', 'phone']
       ]
        
    }
});
valid.init();
const valid2 = new Validator({
    selector: '#form2',
    pattern: {
       phone: /^\+\d+$/,
       name: /^[а-яё\s]+$/i,
       message: /^[а-яё\s]+$/i
    },
    method: {
       'form2-name': [
           ['notEmpty'],
           ['pattern', 'name']
        ],
       'form2-email': [
           ['notEmpty'],
           ['pattern', 'email']
       ],
       'form2-phone': [
           ['notEmpty'],
           ['pattern', 'phone']
       ],
       'form2-message': [
           ['notEmpty'],
           ['pattern', 'message']
       ]         
    }
});
valid2.init();
const valid3 = new Validator({
    selector: '#form3',
    pattern: {
       phone: /^\+\d+$/,
       name: /^[а-яё\s]+$/i
    },
    method: {
       'form3-name': [
           ['notEmpty'],
           ['pattern', 'name']
        ],
       'form3-email': [
           ['notEmpty'],
           ['pattern', 'email']
       ],
       'form3-phone': [
           ['notEmpty'],
           ['pattern', 'phone']
       ]
        
    }
});
valid3.init();

