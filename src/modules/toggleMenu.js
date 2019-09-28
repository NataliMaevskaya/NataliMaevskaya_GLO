const toggleMenu = () => {
    const menu = document.querySelector('menu'),
        body = document.querySelector('body');

    const  handlerMenu = () => {
        // menu.classList.toggle('active-menu');
        if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
            menu.style.transform = `translate(0)`;
        } else {
            menu.style.transform = `translate(-100%)`;
        }
    };
    body.addEventListener('click', (event) => {
        const target = event.target;
        // console.log(target);
        // if((target.closest('menu') && !target.matches('menu')) || (target.closest('.menu') && !target.matches('.menu'))) handlerMenu();
        if((target.closest('menu') && !target.matches('menu')) || target.closest('.menu')) {
            handlerMenu(); 
        }
        else if (target.closest('body') && !target.matches('menu')) {
            menu.style.transform = `translate(-100%)`;
        }
        
    });       
};

export default toggleMenu;