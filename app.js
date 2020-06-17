const fs = require('fs');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const domain = "www.randomjob.tk"
const sslport = 443;
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

async function DBUpdate() {
    await connection.query(
        `INSERT INTO visiter VALUES (${date.getFullYear()}, ${date.getMonth()},${date.getDate()}, ${count});`
    );
    count = await 0;
}

var date = new Date();

app.get('/', (req, res) => {
    var today = date.getYear() + " " + date.getMonth() + " " + date.getDate();

    setInterval(() => {
        date.setSeconds(date.getSeconds() + 1);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        if (hours === 23 && minutes === 59 && seconds === 59) {
            DBUpdate();
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
try {
    const options = {
        key: fs.readFileSync('./keys/private.pem'),
        cert: fs.readFileSync('./keys/public.pem')
    };
  
    https.createServer(options, app).listen(sslport, sslport, () => {
        console.log(`[HTTPS] Server is started on port ${sslport}`);
      });

  } catch (error) {
    console.log('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
    console.log(error);
  }
