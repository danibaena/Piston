var Piston = require("../lib/Piston");
var currentPiston;
var specPath = "../pistonSpecs/airbnb.json";
currentPiston = new Piston(specPath);
currentPiston.getUser(7771271);
currentPiston.login("i1264348@trbvm.com", "123456");