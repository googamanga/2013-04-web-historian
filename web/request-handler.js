exports.datadir = __dirname + "data/sites.txt"; // tests will need to override this.
var fs = require('fs'), returnCode = 404;
var querystring = require('querystring');
var url = require('url');
var downloader = require('../workers/lib/html-fetcher-helpers.js');


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GETS, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 //seconds
};

exports.handleRequest = function (request, response) {

  if (request.url === '/styles.css') {
    returnCode = 200;
    defaultCorsHeaders["Content-Type"] = "text/css";
    response.writeHead(returnCode, defaultCorsHeaders);
    fs.readFile(__dirname + '/public/styles.css','utf8',function (err, data) {
      if (err) throw err;
      response.end(data);
    });
    return;
  }
  if (request.method === 'GET' && (request.url === '/' || request.url === '/index.html')) {
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
  if (request.method === 'GET') {
    siteURl = url.parse(request.url).pathname.slice(1);
    defaultCorsHeaders["Content-Type"] = "text/html"; // cuts off wwww. and .com
    fs.readFile('/Users/hackreactor/code/googamanga/2013-04-web-historian/data/sites.txt','utf8',function (err, data) {
      if (err) throw err;
      var array = data.toString().split("\n");
      console.log(__dirname);
      console.log('array', array);
      console.log('siteURl', siteURl);
      for (var i = 0; i < array.length; i++) {
        if(array[i] === siteURl) {
          i = -1;
          console.log(i);
          break;
        }
      }
      if (i === -1 ){
        response.writeHead(200, defaultCorsHeaders);
        response.end('/'+siteURl+'/');
      } else {
        console.log("INSIDE 404");
        console.log(request.url);
        response.writeHead(404, defaultCorsHeaders);
        response.end();
      }
    });
    return;
  }
  if (request.method === 'POST' && request.url === '/') {
    // handle form data from client, add it to sites.txt
    var fullBody = '';
      request.on('data', function(chunk) {
        fullBody += chunk;
      });
      request.on('end', function() {
        var data = querystring.parse(fullBody);
        console.log("exports.datadir:", exports.datadir);
        fs.appendFile('/Users/hackreactor/code/googamanga/2013-04-web-historian/data/sites.txt', data['url'] + "\n");  //upgrade to async later
        downloader.downloadUrls(data['url']);
      });

    returnCode = 302;
    defaultCorsHeaders["Content-Type"] = "text/html";
    defaultCorsHeaders["Location"] = "/";
    response.writeHead(returnCode, defaultCorsHeaders);
    response.end();
    return;
  }
};























