describe("Piston", function() {
  var Piston = require("../lib/Piston");
  var currentPiston;

  beforeEach(function() {
    var specPath = "../pistonSpecs/airbnb.json";
    currentPiston = new Piston(specPath);
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

  describe("can create action from keys", function() {
    it("correctly creates properties from a action object", function() {
      var functionName = "getUser";
      expect(currentPiston[functionName]).toEqual(jasmine.any(Function));
    });
  });
});
