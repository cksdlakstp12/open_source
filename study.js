var date = new Date();

var currentTime = {
    currentHour : date.getHours(),
    currnentMinute : date.getMinutes(),
    currentSecond : date.getSeconds()
}


function addZeroMonth(date) {
    if ((date.getMonth() + 1) < 10) return `0${date.getMonth() + 1}`;
    else return `${date.getMonth() + 1}`;
}

function addZeroDate(date) {
    if (date.getDate() < 10) return `0${date.getDate()}`;
    else return `${date.getDate()}`;
}

var dateString = `${date.getFullYear()}-${addZeroMonth(date)}-${addZeroDate(date)}`;

if(date.getHours() === 0) {
    dateArray.push()
}

var dataArray =[];

if(currentTime.currrntHour === 23 && currentTime.currrntMinute === 59 && currentTime.currrntSecond === 59){
    /* 방문자수를 DB에 저장 */
}

console.log(dateString);
