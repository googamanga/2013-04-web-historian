exports.datadir = __dirname + "data/sites.txt"; // tests will need to override this.
var fs = require('fs');

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GETS, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 //seconds
};

exports.handleRequest = function (request, response) {
  console.log(exports.datadir);
  if (request.url === '/' || request.url === '/index.html') {
    fs.readFile('./public/index.html','utf8',function (err, data) {
      if (err) throw err;
      returnCode = 200;
      defaultCorsHeaders["Content-Type"] = "text/html";
      response.writeHead(returnCode, defaultCorsHeaders);
      response.end(data);
      return;
    });
  }
  if (request.url === '/styles.css') {
    fs.readFile('./public/styles.css','utf8',function (err, data) {
      if (err) throw err;
      returnCode = 200;
      defaultCorsHeaders["Content-Type"] = "text/css";
      response.writeHead(returnCode, defaultCorsHeaders);
      response.end(data);
      return;
    });
  }
};