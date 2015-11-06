describe("Functions", function(){
 var Functions = require("../lib/Functions");
 var functions = new Functions();
 var SpecFile = require("../lib/Piston");
 var specFile = new SpecFile();

 describe("Functions can parse an spec object", function(){
   it("Prints no way if ok", function(){
    specObject = specFile.parseSpec("../pistonSpecs/airbnb.json");
    specFile.parseFunctions
  });
 });
});