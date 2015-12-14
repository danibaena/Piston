var Piston = require('../lib/Piston');
var specPath = '../pistonSpecs/airbnb.json';
var airbnb = new Piston(specPath);

airbnb.getUser(1)
  .then(function (data) {
    console.log(data);
  });

airbnb.login('i1264348@trbvm.com', '123456')
  .then(function (data) {
    console.log(data);
  });
