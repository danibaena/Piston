describe("Functions", function(){
 var Functions = require("../lib/Functions");
 var functions;
 var SpecFile = require("../lib/Piston");
 var specFile = new SpecFile();

 beforeEach(function() {
  var specObject = specFile.parseSpec("../pistonSpecs/airbnb.json");
  functions = new Functions(specObject);
});

 describe("can parse a spec object", function(){
   it("Returns the function as an object given a function name", function(){
    var functionName = "get_user";
    expect(functions.parseFunctions(functionName))
    .toEqual(jasmine.any(Object));
  });
   it("extracts the relevant data from a function", function(){
    var extractedArray = [["user", "first_name"], ["user", "picture_url"]];
    var functionName = "get_user";
    expect(functions.extractData(functions.parseFunctions(functionName)))
    .toEqual(extractedArray);
   });
   it("creates a list of the functions available in the spec",function(){
    var expectedFunctions = ["get_user", "login"];
    expect(functions.list()).toEqual(expectedFunctions);
   });
 });
});