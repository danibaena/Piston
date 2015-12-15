'use strict';
let Piston = require("../lib/Piston");
let spotifySpecPath = "../pistonSpecs/spotify.json";
let spotify = new Piston(spotifySpecPath);
let echonestSpecPath = "../pistonSpecs/echonest.json";
let echonest = new Piston(echonestSpecPath);

/*echonest.hotttnesss('Bob Marley')
  .then(function (data) {
    console.log(data);
  });*/

/*spotify.searchArtist('Bob Marley')
  .then(function (data) {  
    console.log(data);
  });*/

spotify.searchArtist('Muse')
  .then(function (data) {
    console.log("We've got this artist name from Spotify API: ", data.name[0]);
    console.log("And now we are going to check how hot the artist is:");
    echonest.hotttnesss(data.name[0]).then(function (data) {
      console.log(data[0]);
    });
  });