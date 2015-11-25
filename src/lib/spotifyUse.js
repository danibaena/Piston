var Piston = require("../lib/Piston");
var specPath = "../pistonSpecs/spotify.json";
var spotify = new Piston(specPath);

spotify.search();
