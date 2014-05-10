var fs = require('fs')
var path = require('path');
var http = require('http');

var file = process.argv[2];
var filepath = path.join(__dirname, file);
var readStream = fs.createReadStream(filepath);

var options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'POST',
  headers: {'Authorization': 'Basic ' + new Buffer(':apabepa').toString('base64')}
};

var req = http.request(options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk.toString());
  });
});

readStream.on('open', function() {
    readStream.pipe(req);
});

readStream.on('error', function(err) {
    console.log('Something went wrong!');
});
