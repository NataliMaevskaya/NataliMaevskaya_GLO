const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.popup-btn');       

    popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
            // console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent));
            
            if (document.documentElement.clientWidth > 426) {
                popup.style.opacity = 0;
                animate();
            }
            popup.style.display = 'block';
                        
        });            
    });

    let showModal;
    let animate = () => {
        showModal = requestAnimationFrame(animate);
        if (popup.style.opacity < 1) {
            popup.style.opacity = +popup.style.opacity + 0.04;
        } else {
            cancelAnimationFrame(showModal);
        }
    };

    popup.addEventListener('click', (event) => {
        let target = event.target;
        const formBtn = popup.querySelector('.form-btn');
        if(target.classList.contains('popup-close')) {
            if (formBtn.nextElementSibling && formBtn.nextElementSibling.classList.contains('message-server')) { //nextElementSibling - проверяет элемент справа
                formBtn.nextElementSibling.remove();
            } 
            popup.style.display = 'none';
        } else {
            target = target.closest('.popup-content');
            if(!target) {
                if (formBtn.nextElementSibling && formBtn.nextElementSibling.classList.contains('message-server')) { //nextElementSibling - проверяет элемент справа
                    formBtn.nextElementSibling.remove();
                }
                popup.style.display = 'none';
            }
        }
        
    });
};

export default togglePopUp;