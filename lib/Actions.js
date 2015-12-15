'use strict';
function Actions (specObject, promise, request) {
  this.specObject = specObject;
  this.promise = promise;
  this.request = request;
  this.postProcess = require('./post-process/postProcess.js');
}

Actions.prototype.list = function () {
  let actions = this.specObject.actions;
  let names = [];
  for (let key in actions) {
    names[key] = actions[key].name;
  }
  return names;
};

Actions.prototype.parseAction = function (actionName) {
  let data = this.specObject.actions;

  for (let key in data) {
    if (data[key].name === actionName) {
      return data[key];
    }
  }
};

Actions.prototype.buildRequest = function (parsedAction) {
  let requestPromisified = this.promise.promisify(this.request);
  let options = this.createOptionsObject(parsedAction);
  let self = this;
  let data;

  return function () {
    if (arguments.length > 0) {
      options = self.processArguments(options, parsedAction.arguments, arguments);
      parsedAction.extract = self.processArguments(parsedAction.extract, parsedAction.arguments, arguments);
    }

    return requestPromisified(options)
      .then(function (response) {
        data = self.postProcess.parseResponse(response);
        data = self.postProcess.extractResponse(data, parsedAction.extract);
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
  let optionsStringified = JSON.stringify(parsedActionOptions);
  let auxiliar;

  parsedActionArguments.forEach(function (value, index) {
    auxiliar = '{' + value + '}';
    let reAuxiliar = new RegExp(auxiliar, 'g');
    optionsStringified = optionsStringified.replace(reAuxiliar, requestArguments[index]);
  });

  return JSON.parse(optionsStringified);
};

Actions.prototype.createOptionsObject = function (parsedAction) {
  let options = {};

  let excludedOptions = ['name', 'after', 'extract', 'arguments'];
  for (let key in parsedAction) {
    if (excludedOptions.indexOf(key) === -1) {
      options[key] = parsedAction[key];
    }
  }

  return options;
};

Actions.prototype.parseResponse = require('./post-process/parseResponse.js');

Actions.prototype.extractResponse = require('./post-process/extractResponse.js');

module.exports = Actions;
