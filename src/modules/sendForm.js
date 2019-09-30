const sendForm = (idForm) => {
    
    
    const errorMessage = 'Что-то пошло не так!',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо, мы скоро с вами свяжемся.';

        const form = document.getElementById(idForm);  

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = `font-size: 2rem;
                                       color: #fff;`;

        //событие submit на форме
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const elementsForm = [...form.elements].filter(item => {
                return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
            });
            let len = elementsForm.length,
                numNotEmpty = 0;
            elementsForm.forEach((elem) => {
                if (elem.value !== '') {
                    numNotEmpty++;
                }                
            }); 
            if (numNotEmpty !== len) {
                return;
            }
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;

            const formData = new FormData(form);
            let body = {};
            // for(let value of formData.entries()) {
            //     body[value[0]] = value[1];
            // }
            formData.forEach((val, key) => {
                body[key] = val;
            });

            postData(body)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('status ntwork is not 200!');
                    }
                    statusMessage.textContent = successMessage;
                })
                .catch((err) => {
                    statusMessage.textContent = errorMessage;
                    console.error(err);
                })
                .finally(() => clearFormFields(form));
            // postData(body, 
            //     () => {
            //     statusMessage.textContent = successMessage;
            //     clearFormFields(form);
            //     },
            //     (error) => {
            //     statusMessage.textContent = errorMessage;
            //     clearFormFields(form);
            //     console.error(error);
            //     });
        });

        const postData = (body) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'default',
                body: JSON.stringify(body)
            });
            // return new Promise((resolve, reject) => {
            //     const request = new XMLHttpRequest();

            //     request.addEventListener('readystatechange', () => {
            //         if (request.readyState !== 4) {
            //             return;
            //         }
            //         if (request.status === 200) {
            //             resolve();
            //             // outputData();
            //         } else {
            //             reject(request.status);
            //             // errorData(request.status);                        
            //         }
            //     });

            //     request.open('POST', './server.php');
            //     // request.setRequestHeader('Content-Type', 'multipart/form-data'); // если сервер понимает form-data
            //     request.setRequestHeader('Content-Type', 'application/json');
                
            //     // request.send(formData);
            //     request.send(JSON.stringify(body));
            // });
            
        };
        const clearFormFields = (form) => {
            for (const elem of form.elements) {
                if (elem.tagName.toLowerCase() !== 'button' && elem.type !== 'button') {
                    elem.value = '';
                    elem.classList.remove('success');
                }
            }
    
        };
        
};

export default sendForm;