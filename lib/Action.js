function Action(specObject, promise, request) {
  this.specObject = specObject;
  this.Promise = promise;
  this.request = request;
  this.parseString = require("xml2js").parseString;
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
  var requestPromisified = this.Promise.promisify(this.request);
  var options = this.createOptionsObject(parsedAction);
  var extractedData = this.extractData(parsedAction);
  var self = this;
  var data;

  return function() {
    if (arguments.length > 0) {
      options = self.processArguments(options, parsedAction.arguments, arguments);
    }

    return requestPromisified(options)
      .then(function(response) {
        data = self.objectify(response);
      })
      .then(function() {
        // console.log(self.processResponse(data, extractedData));
        data = self.processResponse(data, extractedData);
        // token = self.processToken(data, afterData);
      })
      .then(function(){
        self.response = data;
        // self.token = token;
      })
      .catch(function(error) {
        throw error;
      });
  };
};

Action.prototype.processArguments = function(parsedActionOptions, parsedActionArguments, requestArguments) {
  var optionsStringified = JSON.stringify(parsedActionOptions);
  var auxiliar;

  parsedActionArguments.forEach(function(value, index) {
    auxiliar = "{" + value + "}";
    var reAuxiliar = new RegExp(auxiliar, "g")
    optionsStringified = optionsStringified.replace(reAuxiliar, requestArguments[index]);
  });

  return JSON.parse(optionsStringified);
};

Action.prototype.createOptionsObject = function(parsedAction) {
  var options = {};

  var excludedOptions = ['name', 'after', 'extract', 'arguments'];
  for (var key in parsedAction) {
    if (excludedOptions.indexOf(key) === -1) {
      options[key] = parsedAction[key];
    }
  }

  return options;
};

Action.prototype.extractData = function(parsedAction) {
  var fieldsToExtract = parsedAction.extract;

  if (fieldsToExtract !== undefined) {
    return fieldsToExtract.map(function(value) {
      return value.split(".");
    });
  }
};

Action.prototype.processResponse = function(response, extractedData) {
  var result;
  if (typeof extractedData === 'undefined') {
    return response;
  }

  var isArray = function(a) {
    return (!!a) && (a.constructor === Array);
  };
  var isObject = function(a) {
    return (!!a) && (a.constructor === Object);
  };

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function processObject(object, fieldsToExtract) {
    return fieldsToExtract.map(function(innerArray) {
      return innerArray.reduce(function(previous, current) {
        if (isArray(previous) && !isNumeric(current)) {
          current = [current.split()];
          previous = processArray(previous, current);
        } else {
          previous = previous[current];
        }
        return previous;
      }, object);
    });
  }

  function processArray(array, fieldsToExtract) {
    return array.map(function(innerObject) {
      return processObject(innerObject, fieldsToExtract);
    })
  }

  if (isArray(response)) {
    result = processArray(response, extractedData);
  } else if (isObject(response)) {
    result = processObject(response, extractedData);
  }

  return result;
};

Action.prototype.objectify = function(response) {
  var contentType = response.headers["content-type"];
  var data;

  if (contentType.indexOf("application/json") !== -1) {
    data = JSON.parse(response.body);
  } else if (contentType.indexOf("text/xml") !== -1) {
    this.parseString(response.body, function(err, result) {
      data = result;
    });
  }
  return data;
};

module.exports = Action;
