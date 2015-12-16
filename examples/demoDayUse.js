'use strict';
let Piston = require('../lib/Piston');
let spotifySpecPath = '../pistonSpecs/spotify.json';
let spotify = new Piston(spotifySpecPath);
let echonestSpecPath = '../pistonSpecs/echonest.json';
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
    console.log('Popularity according Spotify is: ', data.popularity[0]);

    console.log('And now we are going to check how hot the artist is in Echonest API:');
    echonest.hotttnesss(data.name[0])
      .then(function (data) {
        console.log(data.hotttnesss);
        echonest.images(data.id)
          .then(function (data) {
            console.log('Images:')
            data.forEach(function (value) {
              console.log(value);
            });
          });
      });
  });
