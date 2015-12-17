'use strict';
let colors = require('colors');
let fs = require('fs');
let Piston = require('../lib/Piston');
let spotifySpecPath = '../pistonSpecs/spotify.json';
let spotify = new Piston(spotifySpecPath);
let echonestSpecPath = '../pistonSpecs/echonest.json';
let echonest = new Piston(echonestSpecPath);
let song;
let license = 'public-domain';
let result = {};

let args = process.argv.slice(2);
if (args.length > 0) {
  if (args[0].indexOf('Gozadera') < 0) {
    song = args[0];
    if(args[1] !== undefined){
      license = args[1];
    }
    
  } else {
    console.log("\nWhy would you pollute the world with reggaeton, evil basterd!".red);
    return;
  }
} else {
  song = 'New born';
}

console.log("\nWe're searching the Spotify API for the song:".yellow);
console.log(song.green);
result["song"] = song;

spotify.searchTrack(song, 'tracks.items.0.artists.name.0')
  .then(function (data) {
    console.log("\nWe've got this artist name from Spotify API:".yellow);
    console.log(data.green);
    result["artist"] = data;

    console.log('\nAnd now we are going to check how hot the artist is in Echonest API:'.yellow);
    echonest.hotttnesss(data)
      .then(function (data) {
        console.log(data.hotttnesss.toString().green);
        result["hotttnesss"] = data.hotttnesss;

        echonest.images(data.id, license)
          .then(function (data) {
            console.log('\nFor that artist in Echonest API we can get this public domain images:'.yellow);
            result['images'] = [];
            data.forEach(function (value, index) {
              console.log(value.green);
              result.images[index] = value;
            });
            result['license'] = license;

            fs.writeFile("./examples/demoDay.json", JSON.stringify(result, null, 2), function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log("\nJSON saved".blue);
              }
            });
          });
      });
  });
