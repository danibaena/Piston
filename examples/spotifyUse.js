'use strict';
let Pistonify = require('../lib/Pistonify');
let specPath = '../pistonSpecs/spotify.json';
let spotify = new Pistonify(specPath);

/*Example with callback*/

spotify.searchArtist('Bob Marley & The Wailers', function (err, response, body) {
  console.log(body);
});

/*Example with promises and personalized extract field*/

/*spotify.searchArtist('Bob Marley & The Wailers', 'artists.items.followers.total')
  .then(function (data) {
    console.log(data);
  });*/

/*Example with promises*/

/*spotify.searchArtist('Bob Marley & The Wailers')
  .then(function (data) {
    console.log(data);
  });*/

/*spotify.searchAlbum('ok computer', 'albums.items.name')
  .then(function (data) {
    console.log(data);
  });*/

/*spotify.getAlbum("0sNOF9WDwhWunNAHPD3Baj")
  .then(function(data) {
    console.log(data);
  });*/

/*spotify.getAlbumTracks('0sNOF9WDwhWunNAHPD3Baj')
  .then(function (data) {
    console.log(data);
  });*/

/*spotify.getArtist("0OdUWJ0sBjDrqHygGUXeCF")
  .then(function(data) {
    console.log(data);
  });*/

/*spotify.getUser("tuggareutangranser")
  .then(function(data) {
    console.log(data);
  });*/

/*spotify.searchTrack('Redemption Song')
  .then(function (data) {
    console.log(data);
  });*/

/*spotify.search('Exodus', 'album', 'albums')
  .then(function (data) {
    console.log(data);
  });*/
