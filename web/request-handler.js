exports.datadir = __dirname + "data/sites.txt"; // tests will need to override this.
var fs = require('fs'), returnCode = 404;

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GETS, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 //seconds
};

exports.handleRequest = function (request, response) {
  // console.log(request.url);
  if (request.url === '/' || request.url === '/index.html') {
    // console.log("I'm inside the if condition");
    returnCode = 200;
    defaultCorsHeaders["Content-Type"] = "text/html";
    response.writeHead(returnCode, defaultCorsHeaders);
    fs.readFile(__dirname + '/public/index.html','utf8',function (err, data) {
      if (err) throw err;
      // console.log(data);
      response.end(data);
    });
    return;
  }
  if (request.url === '/styles.css') {
    returnCode = 200;
    defaultCorsHeaders["Content-Type"] = "text/css";
    response.writeHead(returnCode, defaultCorsHeaders);
    // console.log(__dirname + '/public/styles.css');
    fs.readFile(__dirname + '/public/styles.css','utf8',function (err, data) {
      if (err) throw err;
      response.end(data);
    });
    return;
  }
  if (request.method === 'GET' && (request.url === '/' || request.url === '/index.html')) {
    console.log("I'm inside the if condition of GET");
    returnCode = 200;
    defaultCorsHeaders["Content-Type"] = "text/html";
    response.writeHead(returnCode, defaultCorsHeaders);
    fs.readFile(__dirname + '/public/index.html','utf8',function (err, data) {
      if (err) throw err;
      // console.log(data);
      response.end(data);
    });
    return;
  }
  if (request.method === 'POST' && request.url === '/') {
    console.log("I'm inside the if condition of POST");
    returnCode = 201;
    // handle form data from client, add it to sites.txt, respond with 201
    defaultCorsHeaders["Content-Type"] = "text/html";
    response.writeHead(returnCode, defaultCorsHeaders);
    response.end();
    return;
  }
};























