'use strict';

let lang = document.documentElement.lang;

const input = document.getElementById('select-cities');
input.value = '';
const dropdownLists = document.querySelector('.dropdown-lists');

const listDefault = document.querySelector('.dropdown-lists__list--default');
const listColDefault = listDefault.querySelector('.dropdown-lists__col');
const listSelect = document.querySelector('.dropdown-lists__list--select');
const listColSelect = listSelect.querySelector('.dropdown-lists__col');
const listAutocomplete = document.querySelector('.dropdown-lists__list--autocomplete');
const listColAutocomplete = listAutocomplete.querySelector('.dropdown-lists__col');

const btn = document.querySelector('.button');
// btn.removeAttribute('href');
btn.style.cssText = `pointer-events:none;`;

listColDefault.addEventListener('click', (event) => {
    let target = event.target;
    if (target.closest('.dropdown-lists__total-line') || target.matches('.dropdown-lists__total-line')) {
        let country;
        if (target.matches('.dropdown-lists__country')) {
            country = target.textContent;
            console.log('country: ', country);
        }
        if (!country && target.closest('.dropdown-lists__total-line')) {
            const parent = target.parentNode;
            country = parent.querySelector('.dropdown-lists__country').textContent;
        }
        fetch('db_cities.json')
        .then((response) => {
            if (response.status !== 200) {
                throw new Error('Status network is not 200!');
            }
            return (response.json());
        })
        .then((data) => {
            listDefault.style.cssText = `display: none !important;`;
            // listDefault.style.display = 'none';
            if (listColSelect.querySelector('.dropdown-lists__countryBlock')){
                const parent = listColSelect.querySelector('.dropdown-lists__countryBlock').parentNode;
                parent.removeChild(listColSelect.querySelector('.dropdown-lists__countryBlock'));
            }
            const len = data[lang.toUpperCase()].length;
            console.log('len: ', len);
            const listCountryCities = data[lang.toUpperCase()];
            console.log('listCountryCities: ', listCountryCities);
            for (let i = 0; i < len; i++) {
                if (listCountryCities[i]['country'] === country) {
                    const divCountryBlock = document.createElement('div');
                    divCountryBlock.className = 'dropdown-lists__countryBlock';
                    listColSelect.appendChild(divCountryBlock);

                    const divTotalLine = document.createElement('div');
                    divTotalLine.className = 'dropdown-lists__total-line';
                    divCountryBlock.appendChild(divTotalLine);

                    const listCountry = document.createElement('div');
                    listCountry.className = 'dropdown-lists__country';
                    listCountry.textContent = listCountryCities[i]['country'];
                    const listCount = document.createElement('div');
                    listCount.className = 'dropdown-lists__count';
                    listCount.textContent = listCountryCities[i]['count'];

                    divTotalLine.appendChild(listCountry);
                    divTotalLine.appendChild(listCount);

                    const cities = listCountryCities[i]['cities'];
                    console.log('cities: ', cities);
                    const citiesLen = cities.length;
                    // console.log(listCountryCities[i]['cities'].sort(sortBy('count', true, parseInt)));

                    

                    for (let i = 0; i < citiesLen; i++) {
                        const line = document.createElement('div');
                        line.className = 'dropdown-lists__line';
                        divCountryBlock.appendChild(line);

                        const city = document.createElement('div'),
                            count = document.createElement('div');

                        city.className = 'dropdown-lists__city';
                        count.className = 'dropdown-lists__count';
                        city.textContent = cities[i]['name'];
                        count.textContent = cities[i]['count']; 
                        line.appendChild(city);
                        line.appendChild(count);
                    }
                    
                }
            } 
            listSelect.style.cssText = `display: block !important;`;           
        })
        .catch(err => console.error(err));
    }
});
listColSelect.addEventListener('click', (event) => {
    let target = event.target;
    if (target.closest('.dropdown-lists__total-line') || target.matches('.dropdown-lists__total-line')) {
        listSelect.setAttribute('display', 'none');
        listDefault.removeAttribute('display');

        listSelect.style.cssText = `display: none !important;`; 
        listDefault.style.cssText = `display: block !important;`; 
    }
});
input.addEventListener('click', () => {
    listDefault.style.cssText = `display: block !important;`;
    if (listColDefault.querySelector('.dropdown-lists__countryBlock')){
        const parent = listColDefault.querySelector('.dropdown-lists__countryBlock').parentNode;
        parent.removeChildren(listColDefault.querySelector('.dropdown-lists__countryBlock'));
    }

const sortBy = (field, reverse, primer) => {

    const key = primer ? 
        function(x) {return primer(x[field]);} : 
        function(x) {return x[field];};
 
    reverse = !reverse ? 1 : -1;
 
    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
      }; 
 };
fetch('db_cities.json')
    .then((response) => {
        if (response.status !== 200) {
            throw new Error('Status network is not 200!');
        }
        return (response.json());
    })
    .then((data) => {
        // listDefault.removeAttribute('display'); 
        const len = data[lang.toUpperCase()].length;
        console.log('len: ', len);
        const listCountryCities = data[lang.toUpperCase()];
        console.log('listCountryCities: ', listCountryCities);
        for (let i = 0; i < len; i++) {
            const divCountryBlock = document.createElement('div');
            divCountryBlock.className = 'dropdown-lists__countryBlock';
            listColDefault.appendChild(divCountryBlock);

            const divTotalLine = document.createElement('div');
            divTotalLine.className = 'dropdown-lists__total-line';
            divCountryBlock.appendChild(divTotalLine);

            const listCountry = document.createElement('div');
            listCountry.className = 'dropdown-lists__country';
            listCountry.textContent = listCountryCities[i]['country'];
            const listCount = document.createElement('div');
            listCount.className = 'dropdown-lists__count';
            listCount.textContent = listCountryCities[i]['count'];

            divTotalLine.appendChild(listCountry);
            divTotalLine.appendChild(listCount);

            const top3cities = listCountryCities[i]['cities'].sort(sortBy('count', true, parseInt)).slice(0, 3);
            console.log('top3cities: ', top3cities);
            // console.log(listCountryCities[i]['cities'].sort(sortBy('count', true, parseInt)));

            

            for (let i = 0; i < 3; i++) {
                const line = document.createElement('div');
                line.className = 'dropdown-lists__line';
                divCountryBlock.appendChild(line);

                const city = document.createElement('div'),
                      count = document.createElement('div');

                city.className = 'dropdown-lists__city';
                if (i === 0) {
                    city.classList.add('dropdown-lists__city--ip');
                }
                count.className = 'dropdown-lists__count';
                city.textContent = top3cities[i]['name'];
                count.textContent = top3cities[i]['count']; 
                line.appendChild(city);
                line.appendChild(count);
            }

        }
        
    })
    .catch(err => console.error(err));

});
input.addEventListener('input', (e) => {
    listSelect.style.cssText = `display: none !important;`; 
    listDefault.style.cssText = `display: none !important;`;

    fetch('db_cities.json')
        .then((response) => {
            if (response.status !== 200) {
                throw new Error('Status network is not 200!');
            }
            return (response.json());
        })
        .then((data) => {
            if (listColAutocomplete.querySelector('.dropdown-lists__countryBlock')){
                const parent = listColAutocomplete.querySelector('.dropdown-lists__countryBlock').parentNode;
                parent.removeChild(listColAutocomplete.querySelector('.dropdown-lists__countryBlock'));
            }
            
            let key = e.data;
            if (key === null) {
                listDefault.style.cssText = `display: block !important;`;
                listAutocomplete.style.cssText = `display: none !important;`;
                return;
            }
            key = key.toUpperCase();
            let lang;
            if (/[A-Z]/.test(key)) {
                lang = 'EN';
            } else {
                lang = document.documentElement.lang.toUpperCase();
            }
            const len = data[lang].length;
            const listCountryCities = data[lang];
            console.log('listCountryCities: ', listCountryCities);
            

            const divCountryBlock = document.createElement('div');
                    divCountryBlock.className = 'dropdown-lists__countryBlock';
                    listColAutocomplete.appendChild(divCountryBlock); 
            for (let i = 0; i < len; i++) {                             

                    const cities = listCountryCities[i]['cities'];
                    console.log('cities: ', cities);
                    const citiesLen = cities.length;                    

                    for (let i = 0; i < citiesLen; i++) {
                        // console.log(cities[i]['name'].slice(0,1));
                        if (cities[i]['name'].slice(0,1) === key) {
                            const line = document.createElement('div');
                            line.className = 'dropdown-lists__line';
                            divCountryBlock.appendChild(line);

                            const city = document.createElement('div'),
                                count = document.createElement('div');

                            city.className = 'dropdown-lists__city';
                            count.className = 'dropdown-lists__count';
                            city.textContent = cities[i]['name'];
                            count.textContent = cities[i]['count']; 
                            line.appendChild(city);
                            line.appendChild(count);
                        }
                    }
                    
                    
                
            } 
            if(!divCountryBlock.hasChildNodes()) {
                const line = document.createElement('div');
                    line.className = 'dropdown-lists__line';
                    line.textContent = 'Ничего не найдено!';
                    divCountryBlock.appendChild(line);

                   
            }
            listAutocomplete.style.cssText = `display: block !important;`; 
            document.querySelector('label').style.cssText = `display: none !important`;          
        })
        .catch(err => console.error(err));
    
    
    
});
input.addEventListener('change', (e) => {
    if (e.target.value === '') {
        listDefault.style.cssText = `display: block !important;`;
        listAutocomplete.style.cssText = `display: none !important;`;
        document.querySelector('label').style.cssText = `display: block !important`;  
    }
});

const closeBtn = document.querySelector('.close-button');
dropdownLists.addEventListener('click', (e) => {
    let target = e.target;    

    if( target.matches('.dropdown-lists__city') || target.matches('.dropdown-lists__country')) {
        input.value = target.textContent;
        document.querySelector('label').style.cssText = `display: none !important`;  
        closeBtn.style.cssText = `display: block !important`; 
    }
    if (target.matches('.dropdown-lists__city')) {
        fetch('db_cities.json')
        .then((response) => {
            if (response.status !== 200) {
                throw new Error('Status network is not 200!');
            }
            return (response.json());
        })
        .then((data) => {
            const len = data[lang.toUpperCase()].length;
            console.log('len: ', len);
            const listCountryCities = data[lang.toUpperCase()];
            console.log('listCountryCities: ', listCountryCities);
            for (let i = 0; i < len; i++) {
                

                    const cities = listCountryCities[i]['cities'];
                    console.log('cities: ', cities);
                    const citiesLen = cities.length;
                    // console.log(listCountryCities[i]['cities'].sort(sortBy('count', true, parseInt)));

                    

                    for (let i = 0; i < citiesLen; i++) {
                        
                        if (cities[i]['name'] === input.value) {
                            btn.setAttribute('href', cities[i]['link']);
                            btn.style.cssText = '';

                        }
                    }
                    
            
            } 
        })
        .catch(err => console.error(err));
        
    }
});
closeBtn.addEventListener('click', () => {
    input.value = '';
    closeBtn.style.cssText = `display: none !important`; 

    listDefault.style.cssText = `display: none !important;`;
    listSelect.style.cssText = `display: none !important;`;
    listAutocomplete.style.cssText = `display: none !important;`;
});






            // <div class="dropdown-lists__countryBlock">
            //     <div class="dropdown-lists__total-line">
            //       <div class="dropdown-lists__country">Россия</div>
            //       <div class="dropdown-lists__count">144500000</div>
            //     </div>
            //     <div class="dropdown-lists__line">
            //       <div class="dropdown-lists__city dropdown-lists__city--ip">Москва</div>
            //       <div class="dropdown-lists__count">12615000</div>
            //     </div>