const changeImg = () => {
    const command = document.getElementById('command');
    command.addEventListener('mouseover', (event) => {
        let target = event.target;
        if (target.matches('.command__photo')) {
            changeImgPlace(target);
        }
    });
    command.addEventListener('mouseout', (event) => {
        let target = event.target;
        if (target.matches('.command__photo')) {
            changeImgPlace(target);
        }
    });
    const changeImgPlace = (target) => {
        const tmpImg = target.src;
        target.src = target.dataset.img;
        target.dataset.img = tmpImg;
    };  
};

export default changeImg;