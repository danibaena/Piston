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

  describe("can create action from keys", function() {
    it("correctly creates properties from a action object", function() {

      expect(piston.get_user).toEqual(jasmine.any(Function));
    });

    it("and the action returns an object", function() {

      piston.get_user();
      expect(piston.get_user()).toBe();
    });

  });
});
