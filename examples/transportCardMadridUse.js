'use strict';
let Piston = require("../lib/Piston");
let specPath = "../pistonSpecs/transportCardMadrid.json";
let transportCardMadrid = new Piston(specPath);

transportCardMadrid.getCardExpireDate(2510010062804)
  .then(function(data) {
    console.log(data);
  });
