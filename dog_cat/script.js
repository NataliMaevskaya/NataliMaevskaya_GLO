'use strict';

const cat = document.getElementById('cat-btn'),
      dog = document.getElementById('dog-btn'),
      cardWrapper = document.querySelector('.card-wrapper');

      cat.addEventListener('click', () => {
        fetch('https://aws.random.cat/meow')
        .then((response) => {if (response.status !== 200) {
                throw new Error('status is not 200!');
            }
            return (response.json());
        })
        .then((response) => {
            console.log(response);
            const arr = response.file.split('.');
            const extension = (arr[arr.length - 1]).toLowerCase();
            if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif'){
                cardWrapper.innerHTML = 
            `<img src="${response.file}" style="max-width: 100%;
            max-height: 80vh;
            box-shadow: 1px 1px 0 0 #ffffff inset, 0 2px 3px 0 #B3B3B3;">`;
            } else {
                cardWrapper.innerHTML = 
                `<video width="400" height="300" controls="controls">
                //  <source src="${response.file}" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></source>`;
            }
    
            
        })
        .catch(err => console.error(err));
    });

dog.addEventListener('click', () => {
    fetch('https://random.dog/woof.json')
    .then((response) => {if (response.status !== 200) {
            throw new Error('status is not 200!');
        }
        return (response.json());
    })
    .then((response) => {
        console.log(response);
        const arr = response.url.split('.');
        const extension = (arr[arr.length - 1]).toLowerCase();
        if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif'){
            cardWrapper.innerHTML = 
        `<img src="${response.url}" style="max-width: 100%;
        max-height: 80vh;
        box-shadow: 1px 1px 0 0 #ffffff inset, 0 2px 3px 0 #B3B3B3;">`;
        } else {
            cardWrapper.innerHTML = 
            `<video width="400" height="300" controls="controls">
             <source src="${response.url}" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></source>`;
        }

        
    })
    .catch(err => console.error(err));
});