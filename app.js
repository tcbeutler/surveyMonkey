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


// __EVENTVALIDATION: $('#__EVENTVALIDATION')[0].value
// __VIEWSTATE: 
// input_719228758_61_8220005206_0:8220005202
// input_719228758_61_8220020117_0:8220005203
// input_719228758_61_8220005205_0:8220005204
// input_719228758_61_8220005207_0:8220020114
// input_719228758_61_8220020116_0:8220020115
// NextButton:Done
// hid_smC0l1d:VQ9TXVkmCqk6rBl7dfvUQg_3d_3d
// hid_smRsL1d:
// hid_smRs1d:E6uK1MhOcpBUysyKlC0vrg_3d_3d
// hid_smCSV:
// hid_smS1d:4xSErAi_2fso5kAHNjabLJHQ_3d_3d
// hid_smM0D:E6uK1MhOcpBUysyKlC0vrg_3d_3d
// hid_smV3Rsn:ryjiA1jsXxArHG3rMuiwxg_3d_3d
// hid_smS3CT1d:PlZjAt3xfOlSQesf0M2E9Q_3d_3d
// hid_DC:$('#hid_DC')[0].value
// Hidden_CollectorToken:
// Hidden_Simple:
// hid_l04dez: $('#hid_l04dez')[0].value