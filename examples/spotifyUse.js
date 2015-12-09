var Piston = require("../lib/Piston");
var specPath = "../pistonSpecs/spotify.json";
var spotify = new Piston(specPath);

spotify.searchArtist("Muse", "artist")
  .then(function() {
    console.log(spotify.getResponse());
  });
spotify.searchAlbum("ok computer", "album")
  .then(function() {
    console.log(spotify.getResponse());
  });
spotify.getAlbum("0sNOF9WDwhWunNAHPD3Baj")
  .then(function() {
    console.log(spotify.getResponse());
  });
spotify.getAlbumTracks("0sNOF9WDwhWunNAHPD3Baj")
  .then(function() {
    console.log(spotify.getResponse());
  });
spotify.getArtist("0OdUWJ0sBjDrqHygGUXeCF")
  .then(function() {
    console.log(spotify.getResponse());
  });
spotify.getUser("tuggareutangranser")
  .then(function() {
    console.log(spotify.getResponse());
  });
