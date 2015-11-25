var Piston = require("../lib/Piston");
var specPath = "../pistonSpecs/spotify.json";
var spotify = new Piston(specPath);

// spotify.searchArtist("Muse", "artist");
spotify.searchAlbum("ok computer", "album");
// spotify.getAlbum("0sNOF9WDwhWunNAHPD3Baj");
// spotify.getAlbumTracks("0sNOF9WDwhWunNAHPD3Baj");
// spotify.getArtist("0OdUWJ0sBjDrqHygGUXeCF");
// spotify.getUser("tuggareutangranser");
