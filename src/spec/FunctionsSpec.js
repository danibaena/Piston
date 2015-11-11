describe("Functions", function() {
  var Functions = require("../lib/Functions");
  var functions;
  var SpecFile = require("../lib/Piston");
  var specFile = new SpecFile();

  beforeEach(function() {
    var specObject = specFile.parseSpec("../pistonSpecs/airbnb.json");
    functions = new Functions(specObject);
  });

  describe("can parse a spec object", function() {
    it("Returns the function as an object given a function name", function() {
      var functionName = "get_user";
      expect(functions.parseFunctions(functionName))
        .toEqual(jasmine.any(Object));
    });

    it("extracts the relevant data from a function", function() {
      var extractedArray = [
        ["user", "first_name"],
        ["user", "picture_url"]
      ];
      var functionName = "get_user";
      expect(functions.extractData(functions.parseFunctions(functionName)))
        .toEqual(extractedArray);
    });

    it("returns a request object with default values from specObject", function() {
      var specObject = specFile.parseSpec("../pistonSpecs/airbnb.json");
      expect(functions.parseDefaults(specObject))
        .toEqual(jasmine.any(Function));
    });

    it("returns an options object with values from the parsedFunction when there is no option field", function() {
      var parsedFunction = {
        "name": "get_user",
        "path": "v2/users/",
        "method": "GET",
        "headers": {
          "host": "api.airbnb.com",
          "User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0",
          "If-None-Match": "W/\"0ec4c2f8c1695ca2328859164f9b2485",
          "Connection": "keep-alive"
        },
        "after": false,
        "extract": [
          "user.first_name",
          "user.picture_url"
        ]
      };

      expect(functions.createOptionsObject(parsedFunction))
        .toEqual({
          "path": "v2/users/",
          "method": "GET",
          "headers": {
            "host": "api.airbnb.com",
            "User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0",
            "If-None-Match": "W/\"0ec4c2f8c1695ca2328859164f9b2485",
            "Connection": "keep-alive"
          }
        });

      it("creates a list of the functions available in the spec", function() {
        var expectedFunctions = ["get_user", "login"];
        expect(functions.list()).toEqual(expectedFunctions);

      });
    });
  });
});
