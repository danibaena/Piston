var Promise = require("bluebird");
var request = require("request");
var colors = require("colors");

function Action(specObject) {
  this.specObject = specObject;
  this.baseRequest = this.parseDefaults();
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
  var requestPromisified = Promise.promisify(request);
  var options = this.createOptionsObject(parsedAction);
  var extractedData = this.extractData(parsedAction);
  var self = this;
  var data;
  var returnedFunction = function(param) {
    if (param !== undefined) {
      var fullUri = options.uri + param;
      options.uri = fullUri;
    }
    requestPromisified(options)
      .then(function(response) {
        // console.log(response.body);
        data = JSON.parse(response.body);
      })
      .then(function() {
        self.processResponse(data, extractedData);
        // console.log(data);
      })
      .catch(function(error) {
        throw error;
      });
  };
  return returnedFunction;
};

Action.prototype.createOptionsObject = function(parsedAction) {

  var options = {}

  if (parsedAction.options !== undefined) {
    return parsedAction.options
  }

  var excludedOptions = ['name', 'after', 'extract']
  for (var key in parsedAction) {
    if (excludedOptions.indexOf(key) === -1) {
      options[key] = parsedAction[key];
    }
  }

  return options;
};
Action.prototype.processArguments = function(string) {
  this.isArgument(parsedAction[key]) ? arguments[parsedAction[key][1]] : parsedAction[key];
};
Action.prototype.isArgument = function(string) {
  return string[0] === '<' && string[string.length - 1] === '>';
};

Action.prototype.parseDefaults = function() {
  var defaultsObject = {};
  if (this.specObject.defaults !== undefined) {
    defaultsObject = this.specObject.defaults;
  }

  defaultsObject.jar = true;
  return request.defaults(defaultsObject);
};

Action.prototype.extractData = function(parsedAction) {
  var fieldsToExtract = parsedAction.extract;
  console.log("fields to extract: ", fieldsToExtract);
  if (fieldsToExtract !== undefined) {
    return fieldsToExtract.map(function(value) {
      return value.split(".");
    });
  }
};

Action.prototype.processResponse = function(response, extractedData) {

  var responseBackup = response;

  for (key in extractedData) {
    var auxiliar = extractedData[key];

    for (key2 in extractedData[key]) {
      // console.log(auxiliar2);
      var auxiliar2 = extractedData[key][key2];
      if (response[auxiliar2]) {
        response = response[auxiliar2];
      }
    }
    console.log(auxiliar2.yellow + ":\n");
    if (response !== undefined) {
      console.log(response.green + "\n");
    } else {
      console.log("Not available for this user \n");
    }

    response = responseBackup;
  }
};

module.exports = Action;
