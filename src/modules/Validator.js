class Validator {
    constructor({selector, pattern = {}, method}) {
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' && item.type !== 'button';
        });
        this.buttonsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() === 'button' || item.type === 'button';
        });
        this.emptyFields = false;
        this.error = new Set();
    }
    init() {
        this.startAttributes();
        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach( elem => elem.addEventListener('change', this.checkIt.bind(this)));
        this.form.addEventListener('submit', e => {
            this.elementsForm.forEach(elem => this.checkIt({target: elem}));
            if (this.error.size) {
                e.preventDefault();           
            } 
        });
    }

    startAttributes() {
        this.buttonsForm.forEach((elem) => {
            elem.setAttribute('disabled', 'true');
        });  

        this.elementsForm.forEach( (elem) => {
            elem.setAttribute('autocomplete', 'off');
        })

    }

    isValid(elem) {
        const validatorMethod = {
            notEmpty(elem) {
                if (elem.value.trim() === '') {
                    return false;
                }
                return true;
            },
            pattern(elem, pattern) {
                return pattern.test(elem.value);
            }
        };

        if (this.method) {
            const method = this.method[elem.id];
            if (method) {
                return method.every( item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
            }
        } else {
            console.warn('Необходимо передать id полей ввода и методы проверки этих полей ');
        }        
        return true;
    }

    checkIt(event) {
        const target = event.target;
        if(this.isValid(target)) {
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            this.showError(target);
            this.error.add(target);
        }
        if (!this.emptyFields) { 
            this.elementsForm.forEach((elem) => {
                if (elem.value === '') {
                    this.emptyFields = true; // есть пустые поля в форме
                    return;
                }
            });
        }else {
            let len = this.elementsForm.length,
                numNotEmpty = 0;
            this.elementsForm.forEach((elem) => {
                if (elem.value !== '') {
                    numNotEmpty++;
                }                
            }); 
            if (numNotEmpty === len) {
                this.emptyFields = false;
            }
        }
        if (!this.error.size && !this.emptyFields) {
            this.buttonsForm.forEach((elem) => {
                elem.removeAttribute('disabled');
            });
            this.emptyFields = false;
            }    
        // console.log(this.error);
    }

    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        
        
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле!';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) { //nextElementSibling - проверяет элемент справа
            elem.nextElementSibling.remove();
        } 
        
    }

    applyStyle() {
        const style = document.createElement('style');
        style.textContent = `
        input.success {
            border: 2px solid green !important
        }
        input.error {
            border: 2px solid red !important
        }
        .validator-error {
            font-size: 12px !important;
            font-family: sans-serif !important;
            color: red !important;
        }`;
        document.head.appendChild(style);
    }
    setPattern() {
        if (!this.pattern.name) {
            this.pattern.name = /[а-яёa-z]/gi;
        } 
        if (!this.pattern.email) {
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
        }
        if (!this.pattern.phone) {
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/; 
        }
        // console.log(this.pattern);
    }
}

export default Validator;