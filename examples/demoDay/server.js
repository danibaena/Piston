'use strict';
// grab the packages we need
let express = require('express');
let favicon = require('serve-favicon');
let app = express();
let bodyParser = require('body-parser');
let demoDay = require('./demoDayUse');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/img/favicon.ico'));
let port = process.env.PORT || 8080;


// routes will go here
app.get('/', function (req, res) {
  res.sendFile('index.html', {
    root: __dirname + '/public'
  });
});

app.post('/demoDay', function (req, res) {
  let song = req.body.song;
  let license = req.body.license;

  let callback = function () {
    let json = require(__dirname + '/public/json/demoDay.json');
    res.send(json);
  };

  demoDay(song, license, callback);
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
