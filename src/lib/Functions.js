request = require('request');

function Functions(specObject) {
  this.specObject = specObject;
}

Functions.prototype.list = function() {
  var data = this.specObject.functions;
  var names = [];
  for (var key in data) {
    names[key] = data[key].name;
  }
  return names;
};

Functions.prototype.parseFunctions = function(functionName) {
  var data = this.specObject.functions;

  for (var key in data) {
    if (data[key].name === functionName) {
      return data[key];
    }
  }
};

Functions.prototype.buildRequest = function(parsedFunction) {

  var options = this.createOptionsObject(parsedFunction)
    // the place where we will store the request returned by parseDefaults
    /*  if (Piston.baseRequest)
        var request = Piston.baseRequest*/

  return function() {
    return request(options, function(error, response, body) {
      if (error) {
        console.log(error);
        return error;
      } else {
        console.log("\n" + typeof response);
        console.log("\n" + typeof response.statusCode);
        console.log("\n" + typeof body);
        console.log(response.statusCode, body);
        return response;
      }
    })
  };
};

Functions.prototype.createOptionsObject = function(parsedFunction) {

  var options = {}
    // concretar el if
  if (parsedFunction.options !== undefined)
    return parsedFunction.options

  var excludedOptions = ['name', 'after', 'extract']
  for (var key in parsedFunction) {
    if (excludedOptions.indexOf(key) === -1) {
      options[key] = parsedFunction[key]
    }
  }

  return options
};

Functions.prototype.parseDefaults = function() {
  return request.defaults(this.specObject.default)

};

Functions.prototype.extractData = function(parsedFunction) {
  var fieldsToExtract = parsedFunction.extract;

  return fieldsToExtract.map(function(value) {
    return value.split(".");
  });
};

module.exports = Functions;
