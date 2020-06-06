var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname=url.parse(_url, true).pathname;
    var title = queryData.id;

    if (pathname == '/') {
        if(queryData.id === undefined){
            var title="sibal";
            fs.readFile(`${queryData.id}`, 'utf8', (err, description) => {
                console.log(0);
                var template = `
                <html>
                <p>${title}</p>
                <p><a href="/?id=index.html">생성기 페이지</a></p>
                <p><a href="/?id=detail.html">자세한 정보 페이지</a></p>
                <p><a href="/?id=statistics.html">통계 페이지</a></p>
                </html>
                `;
                response.writeHead(200);
                response.end(template);
            });
        }
        fs.readFile(`${queryData.id}`, 'utf8', (err, description) => {
            var template=`
                ${description}
            `;
            response.writeHead(200);
            response.end(template);
        });
    } else {
        response.writeHead(404);
        response.end("Not Found");
    }


});
app.listen(3000);