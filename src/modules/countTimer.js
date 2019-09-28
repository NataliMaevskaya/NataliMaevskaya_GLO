const countTimer = (deadline) => {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {
        // secs += 1;
        // const convertGMTtoUTC = (date) => {
        //     const strUTC = date.toISOString();
        //     console.log('strUTC: ', strUTC);
        //     // console.log(strUTC.substr(0, 4), strUTC.substr(5, 7), strUTC.substr(8, 10), strUTC.substr(11, 13), strUTC.substr(14, 16), strUTC.substr(17, 19));
        //     // console.log('день: ', strUTC.substr(8, 10));
        //     // console.log('месяц: ', strUTC.substr(5, 7));
        //     // console.log('год: ', strUTC.substr(0, 4));

        //     return new Date(strUTC.substr(0, 4), strUTC.substr(5, 7), strUTC.substr(8, 10), strUTC.substr(11, 13), strUTC.substr(14, 16), strUTC.substr(17, 19));
        // };
        // const deadlineStrUTC = convertGMTtoUTC(deadline);
        // const deadlineStrUTC = convertGMTtoUTC(deadline),
        // dateNowStrUTC = convertGMTtoUTC(new Date());
        // console.log(deadlineStrUTC);
        // console.log(dateNowStrUTC);
        //                 2019-09-16T21:00:00.000Z
        // s            14 2019-09-16T14:38:22.858Z
        const dateStop = new Date(deadline).getTime(),
            // let    dateStop = new Date(deadline.getUTCFullYear(), deadline.getUTCMonth(), deadline.getUTCDate(), deadline.getUTCHours(), deadline.getUTCMinutes(), deadline.getUTCSeconds()).getTime(),            

            dateNow = new Date(),
            // now = new Date(),
            // now.setHours(23,59,secs),
            // dateNow = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()).getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);

        // console.log('dateStop: ', deadline.getUTCFullYear(), deadline.getUTCMonth(), deadline.getUTCDate(), deadline.getUTCHours(), deadline.getUTCMinutes(), deadline.getUTCSeconds());
        return {
            timeRemaining,
            hours,
            minutes,
            seconds
        };

    };

    const updateClock = () => {
        let timer = getTimeRemaining();
        for (let key in timer) {
            if (timer[key] < 0) {
                timer[key] = '00';
            } else {
                timer[key] = beginZero(timer[key]);
            }

        }

        timerHours.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;

        if (timer.timeRemaining > 0) {
            setTimeout(updateClock, 1000);
        }
        // if (timer.timeRemaining === 0) {
        //     let date = new Date();

        //     date.setHours(0, 0, 0, 0);
        //     date.setDate(date.getDate() + 1);
        //     countTimer(date);
        // }
    };

    const beginZero = (amount) => {
        if (amount < 10 && amount >= 0) {
            amount = '0' + amount;
        }
        return amount;
    };

    updateClock();

};

export default countTimer;