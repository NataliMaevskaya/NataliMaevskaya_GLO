document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    select.addEventListener('change', () => {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', 'cars.json');
            request.setRequestHeader('Content-Type', 'application/json');
            
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    const data = JSON.parse(request.responseText);
                        resolve(data);
                    
                } else {
                    reject('Произошла ошибка');
                }  
            });
            request.send();
        }).then(outputData)
            .catch(outputError);
    });
    const outputData = (data) => {
        console.log('data: ', data);
        if (select.value !== 'no') {
            
        data.cars.forEach(item => {
            if (item.brand === select.value) {
                const {brand, model, price} = item;
                output.innerHTML = `Тачка ${brand} ${model} <br>
                Цена: ${price}$`;
            }
        });
        } else {
            output.innerHTML = document.querySelector('option[value="no"]').innerText;
        }
    };
    const outputError = (data) => {
        output.innerHTML = data;
    };     

});