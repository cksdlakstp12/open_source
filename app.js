const http = require('http');
const fs = require('fs');
const url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;

    if (pathname == '/') {
        
        response.writeHead(200);
        response.end(__dirname, _url);
    
    }

});

app.listen(3000);