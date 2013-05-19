var http = require('http-get');

exports.readUrls = function(filePath, cb){
  // fixme
};

exports.downloadUrls = function(url){
  // for(var i = 0; i < urls.length; i++){
  // (function(url){ //from sites.txt
    http.get(url, __dirname + "../../../data/sites/" + url, function (error, result) {
      if (error) {
        console.error(error);
      } else {
        console.log('File downloaded at: ' + result.file);
      }
    });
  // }( urls[i] ));
};