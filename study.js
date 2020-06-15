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



var dataArray =[];

if(currentTime.currrntHour === 23 && currentTime.currrntMinute === 59 && currentTime.currrntSecond === 59){
    /* 방문자수를 DB에 저장 */
}

console.log(dateString);



var cookieSession = require('cookie-session')
var count =0;

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.use(function (req, res, next) {
    var date = new Date();
    var today=date.getYear()+" "+date.getMonth()+" "+date.getDate();
  // Update views
  console.log(req.session.lastVisit);
  if(req.session.lastVisit != today){
    req.session.lastVisit = today;
    count++;
  }
  if(date.getHours() === 23 && date.getMinutes===59 && date.getSeconds===59 && date.getMilliseconds===999) {
    dateArray.push(count);
    count=0;
  }

  // Write response
  res.end(count + 'visit')
})





var now = new Date();
setInterval("server_time()", 1000);
function server_time()
{
    now.setSeconds(now.getSeconds()+1);
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    if (hours < 10){
        hours = "0" + hours;
    }
    if (minutes < 10){
        minutes = "0" + minutes;
    }
    if (seconds < 10){
        seconds = "0" + seconds;
    }
    console.log(hours + ":" + minutes + ":" + seconds);
}