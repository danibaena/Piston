describe("Functions", function(){
 var Functions = require("../lib/Functions");
 var functions = new Functions();
 var SpecFile = require("../lib/Piston");
 var specFile = new SpecFile();

 describe("Functions can parse a spec object", function(){
   it("Returns the function as an object given a function name", function(){
    var specObject = specFile.parseSpec("../pistonSpecs/airbnb.json");
    var functionName = "get_user";
    expect(functions.parseFunctions(specObject, functionName))
    .toEqual(jasmine.any(Object));
  });
   it("extracts the relevant data from a function", function(){
    var extractedArray = [["user", "first_name"], ["user", "picture_url"]];
    var specObject = specFile.parseSpec("../pistonSpecs/airbnb.json");
    var functionName = "get_user";
    expect(functions.extractData(functions.parseFunctions(specObject, functionName)))
    .toEqual(extractedArray);
   });
 });
});