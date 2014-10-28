var http = require('http');
var $ = require('jquery')(require("jsdom").jsdom().parentWindow);
var Q = require('q');

getPage()
.then(getFormData)
.fail(function(err) { console.log(err); });


function getPage() {

  var deferred = Q.defer();

  var options = {
    hostname: 'www.surveymonkey.com',
    port: 80,
    path: '/s/SZD7B2T',
    method: 'GET'
  };

  var req = http.request(options, function(res) {
    var data = '';
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function() {
      deferred.resolve(data);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.end();

  return deferred.promise;
};

function getFormData(page) {
  var form = {};
  var elem = $(page);
  console.log(page)
  //form.__EVENTVALIDATION = 
};