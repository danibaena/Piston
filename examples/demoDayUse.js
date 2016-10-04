'use strict';
let colors = require('colors');
let Pistonify = require('../lib/Pistonify');
let spotifySpecPath = '../pistonifySpecs/spotify.json';
let spotify = new Pistonify(spotifySpecPath);
let echonestSpecPath = '../pistonifySpecs/echonest.json';
let echonest = new Pistonify(echonestSpecPath);

let song = 'New born';

console.log("\nWe're searching the Spotify API for the song:".yellow);
console.log(song.green);
spotify.searchTrack(song, 'tracks.items.0.artists.name.0')
  .then(function (data) {
    console.log("\nWe've got this artist name from Spotify API:".yellow);
    console.log(data.green);
    // console.log('Popularity according Spotify is: ', data.popularity[0]);

    console.log('\nAnd now we are going to check how hot the artist is in Echonest API:'.yellow);
    echonest.hotttnesss(data)
      .then(function (data) {
        console.log(data.hotttnesss.toString().green);
        echonest.images(data.id)
          .then(function (data) {
            console.log('\nFor that artist in Echonest API we can get this public domain images:'.yellow);
            data.forEach(function (value) {
              console.log(value.green);
            });
          });
      });
  });
