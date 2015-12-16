'use strict';
let Piston = require("../lib/Piston");
let specPath = "./pistonSpecs/spotify.yml";
let spotify = new Piston(specPath);

spotify.searchArtist('Rosendo')
  .then(function (data) {
    console.log(data);
  });