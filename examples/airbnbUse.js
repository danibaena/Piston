'use strict';
let Pistonify = require('../lib/Pistonify');
let specPath = '../pistonifySpecs/airbnb.json';
let airbnb = new Pistonify(specPath);

airbnb.getUser(1)
  .then(function (data) {
    console.log('getUser data: ', data);
  });

airbnb.login('your@username.com', 'yourPassword')
  .then(function (data) {
    console.log('login data: ', data);
  });


