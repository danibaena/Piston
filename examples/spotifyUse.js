var Piston = require('../lib/Piston');
var specPath = '../pistonSpecs/spotify.json';
var spotify = new Piston(specPath);

/*spotify.searchArtist('Bob Marley & The Wailers')
  .then(function() {
    console.log(spotify.getResponse());
  });*/

/*spotify.searchAlbum('ok computer')
  .then(function() {
    console.log(spotify.getResponse());
  });*/

/*spotify.getAlbum("0sNOF9WDwhWunNAHPD3Baj")
  .then(function() {
    console.log(spotify.getResponse());
  });*/

spotify.getAlbumTracks('0sNOF9WDwhWunNAHPD3Baj')
  .then(function () {
    console.log(spotify.getResponse());
  });

  /*spotify.getArtist("0OdUWJ0sBjDrqHygGUXeCF")
    .then(function() {
      console.log(spotify.getResponse());
    });*/

  /*spotify.getUser("tuggareutangranser")
    .then(function() {
      console.log(spotify.getResponse());
    });*/

  /*spotify.searchTrack('Redemption Song')
    .then(function() {
      console.log(spotify.getResponse());
    });*/

  // spotify.search('Exodus', 'album', 'albums')
  //   .then(function () {
  //     console.log(spotify.getResponse());
  //   });
