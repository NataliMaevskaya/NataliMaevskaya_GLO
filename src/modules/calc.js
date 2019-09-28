const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total');
    let totalAmount;

    let showTotal,
        startAnimate = false,
        totalStart = 0,
        delta;

    const cancelAnimateData = () => {
        totalStart = 0;
        delta = 0;
        startAnimate = false;
        cancelAnimationFrame(showTotal);
    };
    let animate = () => {
        showTotal = requestAnimationFrame(animate);
        startAnimate = true;
        
        if (totalStart <= totalAmount && totalAmount !== 0) {
            if (totalStart === 0) {
                if (totalAmount % 100 === 0) {
                    delta = 100;
                } else if (totalAmount % 10 === 0) {
                    delta = 10; 
                    if (totalAmount % 4 === 0) {
                        delta *= 4;
                    } else if (totalAmount % 3 === 0) {
                        delta *= 3;
                    } 
                    // else if (totalAmount % 2 === 0) {
                    //     delta *= 2;   
                    // }                              
                } else if (totalAmount % 3 === 0) {
                    delta = 3;
                } else if (totalAmount % 2 === 0) {
                    delta = 2;
                } else {
                    delta = 1;
                }
            }
            totalValue.textContent = +totalStart;
            totalStart += delta; 
        } else {
            cancelAnimateData();
        }
    };

    const countSum = () => {
        let total = 0,
        countValue = 1,
        dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }
            
        if (typeValue && squareValue) {
            total = price * +typeValue * squareValue * countValue * dayValue;
        } 

        totalAmount = Math.round(total);
        animate();           
    };  
    

    calcBlock.addEventListener('change', (event) => {
        let target = event.target;

        if (target.matches('select') || target.matches('input')) {
            if (startAnimate) { 
                cancelAnimateData();
            }
            countSum();
        }
    });
    // ввод только цифр (Общая площадь, Количество помещений,Срок исполнения)
    calcBlock.addEventListener('input', (event) => {
        let target = event.target;

        if (target.matches('input')) {
            target.value = target.value.replace(/\D/g, '');
        }
    });
};

export default calc;