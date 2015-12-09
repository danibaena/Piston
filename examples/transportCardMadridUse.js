var Piston = require("../lib/Piston");
var specPath = "../pistonSpecs/transportCardMadrid.json";
var transportCardMadrid = new Piston(specPath);

transportCardMadrid.getCardExpireDate(2510010062804)
  .then(function() {
    console.log(transportCardMadrid.getResponse());
  });
