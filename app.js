var http = require('http');
var Q = require('q');
var encode = require('form-urlencoded').encode;
var cheerio = require('cheerio');
var chance = new require('chance')();

var fillForm = require('./fillKickballForm');

var i = 0;

fire();

function fire() {
  Q()
  .then(getSurvey)
  .then(getFormData)
  .then(encodeForm)
  .delay(randomDelay(4, 20))
  .then(postForm)
  .then(function(x){ console.log('POSTING FORM ' + i); i++; })
  .delay(randomDelay(15, 30))
  .then(fire)
  .fail(function(err) { console.log(err.stack); });
}


function getSurvey() {
  var deferred = Q.defer();

  var options = {
    hostname: 'www.surveymonkey.com',
    port: 80,
    path: '/s/R2ZG656',
    method: 'GET'
  };
  var req = http.request(options, function(res) {
    var data = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function() {
      deferred.resolve(data);
    });
    res.on('error', function(err) {
      console.log(err);
    });
  });
  
  req.on('error', function(err) {
    console.log(err);
  });

  req.end();
  return deferred.promise;
};

function getFormData(page) {
  var $ = cheerio.load(page);
  var form = {};
  fillForm(form);

  form.__EVENTVALIDATION =  $('#__EVENTVALIDATION')[0].attribs.value;
  form.__VIEWSTATE =  '';
  // form.input_719228758_61_8220005206_0 = 8220005202;
  // form.input_719228758_61_8220020117_0 = 8220005203;
  // form.input_719228758_61_8220005205_0 = 8220005204;
  // form.input_719228758_61_8220005207_0 = 8220020114;
  // form.input_719228758_61_8220020116_0 = 8220020115;
  form.NextButton = 'Done';
  form.hid_smC0l1d = 'VQ9TXVkmCqk6rBl7dfvUQg_3d_3d';
  form.hid_smRsL1d = '';
  form.hid_smRs1d = 'E6uK1MhOcpBUysyKlC0vrg_3d_3d';
  form.hid_smCSV = '';
  form.hid_smS1d = '4xSErAi_2fso5kAHNjabLJHQ_3d_3d';
  form.hid_smM0D = 'E6uK1MhOcpBUysyKlC0vrg_3d_3d';
  form.hid_smV3Rsn = 'ryjiA1jsXxArHG3rMuiwxg_3d_3d';
  form.hid_smS3CT1d = 'PlZjAt3xfOlSQesf0M2E9Q_3d_3d';
  form.hid_DC = $('#hid_DC')[0].attribs.value;
  form.Hidden_CollectorToken = '';
  form.Hidden_Simple = '';
  form.hid_l04dez =  $('#hid_l04dez')[0].attribs.value;

  // form.__EVENTVALIDATION = $('#__EVENTVALIDATION')[0].attribs.value;
  // form.__VIEWSTATE = '';
  // form.input_719248231_10_0_0 = '8220171630_0';
  // form.NextButton = 'Done';
  // form.hid_smC0l1d = 'oAo0Jwe9PDe3aHHLkI371w_3d_3d';
  // form.hid_smRsL1d = '';
  // form.hid_smRs1d = 'E6uK1MhOcpBUysyKlC0vrg_3d_3d';
  // form.hid_smCSV = '';
  // form.hid_smS1d = 'sNJEF6uVgsFVlVZA6o_2fc8w_3d_3d';
  // form.hid_smM0D = 'E6uK1MhOcpBUysyKlC0vrg_3d_3d';
  // form.hid_smV3Rsn = 'VW6Yh2TOSWXyxI41272YGQ_3d_3d';
  // form.hid_smS3CT1d = 'NlcVv92lW6m2Zs7czosHUA_3d_3d';
  // form.hid_DC = $('#hid_DC')[0].attribs.value;
  // form.Hidden_CollectorToken = '';
  // form.Hidden_Simple = '';
  // form.hid_l04dez = $('#hid_l04dez')[0].attribs.value;
  return {
    form: form,
    action: $('form#frmS')[0].attribs.action
  };
};

function encodeForm(obj) {
  console.log(obj.form)
  obj.form = encode(obj.form);
  return obj;
}

function randomDelay(minSeconds, maxSeconds) {
  return Math.floor(Math.random() * (maxSeconds * 1000 - minSeconds * 1000) + minSeconds * 1000);
}

function postForm(postInfo) {
  var deferred = Q.defer();

  var options = {
    hostname: 'www.surveymonkey.com',
    port: 80,
    path: postInfo.action,
    method: 'POST'
  };

  options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postInfo.form.length,
    'X-Forwarded-For': chance.ip()
  };

  var req = http.request(options, function(res) {
    var data = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function() {
      deferred.resolve(data);
    });
    res.on('error', function(err) {
      console.log(err);
    });
  });

  req.on('error', function(err) {
    console.log(err);
  });

  req.write(postInfo.form);
  req.end();

  return deferred.promise;
}
