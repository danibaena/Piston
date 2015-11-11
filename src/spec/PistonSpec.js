describe("Piston", function() {
  var Piston = require("../lib/Piston");
  var piston = new Piston();

  describe("can use a json file", function() {
    it("Throws an error if file path is invalid", function() {
      specPath = "";
      expect(function() {
        piston.parseSpec(specPath);
      }).toThrow();
    });

    it("Throws an error if file extension is not json", function() {
      specPath = "../pistonSpecs/airbnb.piston";
      expect(function() {
        piston.parseSpec(specPath);
      }).toThrow();
    });

    it("Returns a valid object", function() {
      specPath = "../pistonSpecs/airbnb.json";
      expect(piston.parseSpec(specPath)).toEqual(jasmine.any(Object));
    });
  });
  describe("can create functions from keys", function() {
    it("correctly creates properties from a functions object", function() {
      var piston = new Piston();
      piston.functionsInit();
      expect(piston.get_user).toEqual(jasmine.any(Function));
    });

    it("a function works as expected", function() {
      var piston = new Piston();
      piston.functionsInit();
      expect(piston.get_user()).toBe(jasmine.any(Object));
    });

  });
});

/* describe("Piston can show data from a response", function(){
   it("Extracts the specified fields from a parsed json response", function(){
    piston = new Piston();
    var specPath = "../pistonSpecs/airbnb.json";
    var specFile = piston.parseSpec(specPath);
    var responseMock = require("../pistonSpecs/response.json");
    var functionName = "get_user";
    piston.extractData(specFile, functionName, response);
    //expect(piston.extractData(specFile, functionName, response)).toBe(true);
  });
 });*/
