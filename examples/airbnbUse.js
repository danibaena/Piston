'use strict';
let Piston = require('../lib/Piston');
let specPath = '../pistonSpecs/airbnb.json';
let airbnb = new Piston(specPath);

airbnb.getUser(1)
  .then(function (data) {
    console.log(data);
  });

airbnb.login('i1264348@trbvm.com', '123456')
  .then(function (data) {
    console.log(data);
  });
