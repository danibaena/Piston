function Actions (specObject, promise, request) {
  this.specObject = specObject;
  this.Promise = promise;
  this.request = request;
  this.parseString = require('xml2js').parseString;
}

Actions.prototype.list = function () {
  var actions = this.specObject.actions;
  var names = [];
  for (var key in actions) {
    names[key] = actions[key].name;
  }
  return names;
};

Actions.prototype.parseAction = function (actionName) {
  var data = this.specObject.actions;

  for (var key in data) {
    if (data[key].name === actionName) {
      return data[key];
    }
  }
};

Actions.prototype.buildRequest = function (parsedAction) {
  var requestPromisified = this.Promise.promisify(this.request);
  var options = this.createOptionsObject(parsedAction);
  var self = this;
  var data;

  return function () {
    if (arguments.length > 0) {
      options = self.processArguments(options, parsedAction.arguments, arguments);
      parsedAction.extract = self.processArguments(parsedAction.extract, parsedAction.arguments, arguments);
    }

    return requestPromisified(options)
      .then(function (response) {
        data = self.parseResponse(response);
        data = self.extractResponse.extractResponse(data, parsedAction.extract);
        self.response = data;
      // self.token = token
      })
      .catch(function (error) {
        throw error
      });
  };
};

Actions.prototype.processArguments = function (parsedActionOptions, parsedActionArguments, requestArguments) {
  var optionsStringified = JSON.stringify(parsedActionOptions);
  var auxiliar;

  parsedActionArguments.forEach(function (value, index) {
    auxiliar = '{' + value + '}';
    var reAuxiliar = new RegExp(auxiliar, 'g');
    optionsStringified = optionsStringified.replace(reAuxiliar, requestArguments[index]);
  });

  return JSON.parse(optionsStringified);
};

Actions.prototype.createOptionsObject = function (parsedAction) {
  var options = {};

  var excludedOptions = ['name', 'after', 'extract', 'arguments'];
  for (var key in parsedAction) {
    if (excludedOptions.indexOf(key) === -1) {
      options[key] = parsedAction[key];
    }
  }

  return options;
};

Actions.prototype.parseResponse = function (response) {
  var contentType = response.headers['content-type'];
  var data;

  if (contentType.indexOf('application/json') !== -1) {
    data = JSON.parse(response.body);
  } else if (contentType.indexOf('text/xml') !== -1) {
    this.parseString(response.body, function (err, result) {
      data = result;
    });
  }
  return data;
};

Actions.prototype.extractResponse = require('./post-process/extractResponse.js');

module.exports = Actions;
