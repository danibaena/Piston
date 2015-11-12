var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

function Action(specObject) {
  this.specObject = specObject;
}

Action.prototype.list = function() {
  var data = this.specObject.action;
  var names = [];
  for (var key in data) {
    names[key] = data[key].name;
  }
  return names;
};

Action.prototype.parseAction = function(actionName) {
  var data = this.specObject.action;

  for (var key in data) {
    if (data[key].name === actionName) {
      return data[key];
    }
  }
};

Action.prototype.buildRequest = function(parsedAction) {

  var options = this.createOptionsObject(parsedAction)
    // the place where we will store the request returned by parseDefaults
    /*  if (Piston.baseRequest)
        var request = Piston.baseRequest*/

  return function(callback) {
    return request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        status = "succeeded";
        callback(null, {
          status: status
        });
      } else {
        callback(error);
      }

/*      if (error) {
        console.log(error);
        callback(error);
      } else {
        console.log("\n" + typeof response);
        console.log("\n" + typeof response.statusCode);
        console.log("\n" + typeof body);
        console.log(response.statusCode, body);
        return response;
      }*/
    })
  };
};

Action.prototype.createOptionsObject = function(parsedAction) {

  var options = {}
    // concretar el if
  if (parsedAction.options !== undefined)
    return parsedAction.options

  var excludedOptions = ['name', 'after', 'extract']
  for (var key in parsedAction) {
    if (excludedOptions.indexOf(key) === -1) {
      options[key] = parsedAction[key]
    }
  }

  return options
};

Action.prototype.parseDefaults = function() {
  return request.defaults(this.specObject.default)

};

Action.prototype.extractData = function(parsedAction) {
  var fieldsToExtract = parsedAction.extract;

  return fieldsToExtract.map(function(value) {
    return value.split(".");
  });
};

module.exports = Action;
