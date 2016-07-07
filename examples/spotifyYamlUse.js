'use strict';
let Pistonify = require("../lib/Pistonify");
let specPath = "./pistonSpecs/spotify.yml";
let spotify = new Pistonify(specPath);

spotify.searchArtist('Rosendo')
  .then(function (data) {
    console.log(data);
  });