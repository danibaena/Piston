'use strict';
let colors = require('colors');
let fs = require('fs');
let Pistonify = require('../../lib/Pistonify');
let spotifySpecPath = './../pistonSpecs/spotify.json';
let spotify = new Pistonify(spotifySpecPath);
// let echonestSpecPath = './../pistonSpecs/echonest.json';
// let echonest = new Pistonify(echonestSpecPath);
let result = {};

module.exports = function (song, license, callback) {
  song = song === undefined ? 'New born' : song;
  if (song !== 'Gozadera') {
    console.log("\nWe're searching the Spotify API for the song:".yellow);
    console.log(song.green);
    result["song"] = song;

    spotify.searchTrack(song, 'tracks.items.0.artists.name.0')
      .then(function (data) {
        console.log("\nWe've got this artist name from Spotify API:".yellow);
        console.log(data.green);
        result["artist"] = data;

        result["hotttnesss"] = data.hotttnesss;
        result['images'] = [];
        result['images'][0] = "http://i.imgur.com/H3UIU7g.jpg";
        result['images'][1] = "http://i.imgur.com/H3UIU7g.jpg";
        result['license'] = license;

        fs.writeFile("./public/json/demoDay.json", JSON.stringify(result, null, 2), function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("\nJSON saved".blue);
            callback();
          }
        });

        /*console.log('\nAnd now we are going to check how hot the artist is in Echonest API:'.yellow);
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

                fs.writeFile("./public/json/demoDay.json", JSON.stringify(result, null, 2), function (err) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("\nJSON saved".blue);
                    callback();
                  }
                });
              });
          });*/
      });
  } else {
    console.log("\nWhy would you pollute the world with reggaeton, evil basterd!".red);
    result['artist'] = "Why would you pollute the world with reggaeton, evil basterd!";
    result['hotttnesss'] = 0;
    result['images'] = [];
    result['images'][0] = "http://i.imgur.com/H3UIU7g.jpg";
    result['images'][1] = "http://i.imgur.com/H3UIU7g.jpg";

    fs.writeFile("./public/json/demoDay.json", JSON.stringify(result, null, 2), function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("\nJSON saved".blue);
        callback();
      }
    });
  }
};
