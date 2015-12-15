function Actions (specObject, promise, request) {
  this.specObject = specObject;
  this.promise = promise;
  this.request = request;
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
  var requestPromisified = this.promise.promisify(this.request);
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
        data = self.extractResponse(data, parsedAction.extract);
        return data;
      // self.response = data;
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

Actions.prototype.parseResponse = require('./post-process/parseResponse.js');

Actions.prototype.extractResponse = require('./post-process/extractResponse.js');

module.exports = Actions;
