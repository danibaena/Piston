'use strict';
let Pistonify = require("../lib/Pistonify");
let specPath = "../pistonifySpecs/transportCardMadrid.json";
let transportCardMadrid = new Pistonify(specPath);

transportCardMadrid.getCardExpireDate(1234567890123) // Replace with your card id
  .then(function (data) {
    console.log(data);
  });
