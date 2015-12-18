'use strict';
// grab the packages we need
let express = require('express');
let favicon = require('serve-favicon');
let app = express();
app.use(express.static('public'));
app.use(favicon(__dirname + '/public/img/favicon.ico'));
let port = process.env.PORT || 8080;


// routes will go here
app.get('/', function (req, res) {
  res.sendFile('index.html', {root:__dirname + '/public'});
});

app.post('/demoDay', function(req, res) {
  let song = req.param('song');
  let license = req.param('license');
  // let demoDay = require('demoDayUse.js');

  res.send(song);
});

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);