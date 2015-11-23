var Piston = require("../lib/Piston");
var currentPiston;
var specPath = "../pistonSpecs/airbnb.json";
currentPiston = new Piston(specPath);
currentPiston.get_user(1);