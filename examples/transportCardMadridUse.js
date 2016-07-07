'use strict';
let Pistonify = require("../lib/Pistonify");
let specPath = "../pistonSpecs/transportCardMadrid.json";
let transportCardMadrid = new Pistonify(specPath);

transportCardMadrid.getCardExpireDate(2510010062804)
  .then(function(data) {
    console.log(data);
  });
