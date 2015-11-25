var Piston = require("../lib/Piston");
var specPath = "../pistonSpecs/airbnb.json";
var airbnb = new Piston(specPath);

airbnb.getUser(7771271);
airbnb.login("i1264348@trbvm.com", "123456");