describe("Action", function() {
  var Action = require("../lib/Action");
  var action;
  var Piston = require("../lib/Piston");
  var piston;

  beforeEach(function() {
    var specPath = "../pistonSpecs/airbnb.json";
    piston = new Piston(specPath);
    action = new Action(piston.specObject);
  });

  describe("can parse a spec object", function() {
    it("Returns the function as an object given a function name", function() {
      var actionName = "get_user";
      expect(action.parseAction(actionName))
        .toEqual(jasmine.any(Object));
    });

    it("extracts the relevant data from a function", function() {
      var extractedArray = [
        ["user", "first_name"],
        ["user", "picture_url"]
      ];
      var actionName = "get_user";
      expect(action.extractData(action.parseAction(actionName)))
        .toEqual(extractedArray);
    });

    it("returns a request object with default values from specObject", function() {
      expect(action.parseDefaults(piston.specObject))
        .toEqual(jasmine.any(Function));
    });

    it("returns an options object with values from the parsedAction when there is no option field", function() {
      var parsedAction = {
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

      expect(action.createOptionsObject(parsedAction))
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
    });
    it("creates a list of the action available in the spec", function() {
      var expectedAction = ["get_user", "login"];
      expect(action.list()).toEqual(expectedAction);

    });
  });
});
