'use strict';
let Pistonify = require('../lib/Pistonify');
let specPath = '../pistonSpecs/airbnb.json';
let airbnb = new Pistonify(specPath);

// airbnb.getUser(1)
//   .then(function (data) {
//     console.log('getUser data: ', data);
//   });

airbnb.login('i1264348@trbvm.com', '123456')
  .then(function (data) {
    console.log('login data: ', data);
    // console.log(airbnb.stateObject);
  });


