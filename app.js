const fs = require('fs');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
var cookieSession = require('cookie-session')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/html', express.static(__dirname + '/html'));
app.use('/img', express.static(__dirname + '/img'));

var count = 0;

app.set('trust proxy', 1);

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));

const connection = mysql.createConnection({

    host: conf.host,

    user: conf.user,

    password: conf.password,

    port: conf.port,

    database: conf.database

});

connection.connect();

let DBdata = [];

function addZeroMonth(date) {
    if ((date.getMonth() + 1) < 10) return `0${date.getMonth() + 1}`;
    else return `${date.getMonth() + 1}`;
}

function addZeroDate(date) {
    if (date.getDate() < 10) return `0${date.getDate()}`;
    else return `${date.getDate()}`;
}

var date = new Date();
function server_time() {
    date.setSeconds(date.getSeconds() + 1);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    console.log(hours + ":" + minutes + ":" + seconds);
}

app.get('/', (req, res) => {
    var date = new Date();
    var dateString = `${date.getFullYear()}-${addZeroMonth(date)}-${addZeroDate(date)}`;
    var today = date.getYear() + " " + date.getMonth() + " " + date.getDate();

    setInterval(() => {
        date.setSeconds(date.getSeconds() + 1);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        console.log(hours + ":" + minutes + ":" + seconds);
        if (hours === 23 && minutes === 59 && seconds === 59) {
            //수정해야하는 DB 푸쉬
            DBdata.push({
                "date": dateString,
                "value": count
            });
            count = 0;
        }
    }, 1000);
    console.log(req.session.lastVisit);
    if (req.session.lastVisit != today) {
        req.session.lastVisit = today;
        count++;
    }

    fs.readFile(path.join(__dirname, 'html', 'index.html'), (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        console.log(count);
        res.end(data);
    })
});

app.get('/detail.html', (req, res) => {
    fs.readFile(path.join(__dirname, 'html', 'detail.html'), (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});
app.get('/api/visiters', (req,res)=>{
    connection.query(
        'SELECT * FROM  visiter',
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})


app.get('/statistics.html', (req, res) => {
    
    fs.readFile(path.join(__dirname, 'html', 'statistics.html'), (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));