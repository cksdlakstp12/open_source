const port = process.env.PORT || 5000;
const http = require('http'); 
const express = require('express');
const path = require('path');
const fs = require('fs'); // 파일 읽기, 쓰기 등 을 할 수 있는 모듈 
const app = express();
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/html', express.static(__dirname + '/html'));
app.use('/img', express.static(__dirname + '/img'));

const connection = mysql.createConnection({

    host: conf.host,

    user: conf.user,

    password: conf.password,

    port: conf.port,

    database: conf.database

});

connection.connect();

let DBdata = [];

app.get('/', (req, res)=>{
    fs.readFile(path.join(__dirname,'html', 'index.html'), (err, data)=>{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    })
})
app.get('/detail.html', (req, res)=>{
    fs.readFile(path.join(__dirname,'html', 'detail.html'), (err, data)=>{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    })
})

app.get('/statistics.html', (req, res)=>{
    /*
    connection.query(
        'SELECT * FROM  visiter',
        (err, rows, fields) => {
            DBdata.push(rows);
        }
    )*/
    fs.readFile(path.join(__dirname,'html', 'statistics.html'), (err, data)=>{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));