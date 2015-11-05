describe("Piston", function() {
 var Piston = require("../lib/Piston");
 var piston = new Piston();
 var specPath;
 var specFile;

 describe("Piston can use a json file", function(){
   it("Throws an error if file path is invalid",function(){
    specPath = "";
    expect(function () {
     piston.specParse(specPath);
   }).toThrow();
  });

   it("Throws an error if file extension is not json", function(){
    specPath = "../pistonSpecs/airbnb.piston";
    expect(function () {
     piston.specParse(specPath);
   }).toThrow();
  });

   it("Returns a valid object", function(){
    specPath = "../pistonSpecs/airbnb.json";
    expect(piston.specParse(specPath)).toEqual(jasmine.any(Object));
  });
 });

 describe("Piston can extract data from response", function(){
   it("Extracts the specified fields from a parsed json response", function(){
    piston = new Piston();
    var specPath = "../pistonSpecs/airbnb.json";
    var specFile = piston.specParse(specPath);
    console.log(specFile);
    var response = require("../pistonSpecs/response.json");
    var functionName = "get_user";
    piston.extractData(specFile, functionName, response);
    //expect(piston.extractData(specFile, functionName, response)).toBe(true);
  });
 });

});


