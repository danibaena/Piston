describe("Piston", function() {
  var Piston = require("../lib/Piston");
  var piston;

  beforeEach(function() {
    var specPath = "../pistonSpecs/airbnb.json";
    piston = new Piston(specPath);
  });

  describe("can use a json file", function() {
    it("Throws an error if file path is invalid", function() {
      specPath = "";
      expect(function() {
        new Piston(specPath);
      }).toThrow();
    });

    it("Throws an error if file extension is not json", function() {
      specPath = "../pistonSpecs/airbnb.piston";
      expect(function() {
        new Piston(specPath);
      }).toThrow();
    });

    it("Returns a valid object", function() {
      specPath = "../pistonSpecs/airbnb.json";
      expect(new Piston(specPath)).toEqual(jasmine.any(Object));
    });
  });
  describe("can create functions from keys", function() {
    it("correctly creates properties from a functions object", function() {
      piston.functionsInit();
      expect(piston.get_user).toEqual(jasmine.any(Function));
    });

    it("and the function returns an object", function() {
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
