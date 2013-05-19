var http = require('http-get');
var fs = require('fs');

var downloadUrls = function(urls){
  for(var i = 0; i < urls.length; i++){
    http.get(urls[i], __dirname + "../../../data/sites/" + urls[i], function (error, result) {
      if (error) {
        console.error(error);
      } else {
        console.log('File downloaded at: ' + result.file);
      }
    });
  }
};

exports.readUrls = (function(filePath, cb){
  fs.readFile('/Users/hackreactor/code/googamanga/2013-04-web-historian/data/sites.txt','utf8',function (err, data) {
    if (err) throw err;
    var array = data.toString().split("\n");
    cb(array);
  });
})('/Users/hackreactor/code/googamanga/2013-04-web-historian/data/sites.txt', downloadUrls);

// * * * * * node Users/.../html-fetcher-helpers.readUrls