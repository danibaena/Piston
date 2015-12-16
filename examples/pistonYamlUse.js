'use strict';
let Piston = require("../lib/Piston");
let specPath = "../pistonSpecs/spotify.yaml";
let spotify = new Piston(specPath);

spotify.searchArtist('Rosendo', function (err, response, body) {
  console.log(body);
});