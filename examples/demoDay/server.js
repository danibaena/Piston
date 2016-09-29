'use strict';
// grab the packages we need
let express = require('express');
let favicon = require('serve-favicon');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(function (req, res, next) {
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});
app.set('etag', false);
let port = process.env.PORT || 8100;


// routes will go here
app.get('/', function (req, res) {
  res.sendFile('index.html', {
    root: __dirname + '/public'
  });
});

app.post('/demoDay', function (req, res) {
  let song = req.body.song;
  let license = req.body.license;
  let demoDay = require('./demoDayUse');

  let callback = function () {
    let pistonJson = require(__dirname + '/public/json/demoDay.json');
    res.send(pistonJson);
  };
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  demoDay(song, license, callback);
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);
