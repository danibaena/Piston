'use strict';
let Pistonify = require("../lib/Pistonify");
let specPath = "./pistonifySpecs/spotify.yml";
let spotify = new Pistonify(specPath);

spotify.searchArtist('Rosendo')
  .then(function (data) {
    console.log(data);
  });