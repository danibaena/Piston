'use strict';
function Actions (request) {
  this.request = request;
  this.postProcess = require('./post-process/postProcess.js');
}

Actions.prototype.buildRequest = function (action) {
  let request = this.request;
  let promise = function (param) {
    return new Promise((resolve, reject) => {
      request(param, function (error, content) {
        if (error) {
          reject(error);
        } else {
          resolve(content);
        }
      });
    });
  };
  let options = this.createOptionsObject(action);
  let self = this;

  function hasArguments () {
    return action.arguments && action.arguments.length > 0;
  }

  function findCallback (args) {
    return Array.from(args).find((item) => typeof item === 'function');
  }

  function hasArgumentExtract (args) {
    return args.length > action.arguments.length;
  }

  let exportedFunction = function () {
    let data;

    if (hasArguments()) {
      options = self.processArguments(options, action.arguments, arguments);

      let callback = findCallback(arguments);
      if (callback) {
        console.log('callback time!', callback);
        return request(options, callback);
      }

      if (hasArgumentExtract(arguments)) {
        action.extract = arguments[arguments.length - 1];
      } else {
        action.extract = self.processArguments(action.extract, action.arguments, arguments);
      }
    }

    return promise(options)
      .then(function (response) {
        // this methods should be one, parseResponse should take extractResponse as a callback
        data = self.postProcess.parseResponse(response);
        data = self.postProcess.extractResponse(data, action.extract);

        console.log('action.state: ', action.state);
        console.log('data: ', data);
        // exportedFunction._state = self.postProcess.extractResponse(data, action.state);
        exportedFunction._state = 'this is the state';

        return data;
      })
      .catch(function (error) {
        throw error
      });
  };
  return exportedFunction;

};

Actions.prototype.processArguments = function (actionOptions, actionArguments, requestArguments) {
  let optionsStringified = JSON.stringify(actionOptions);
  let auxiliar;

  actionArguments.forEach(function (value, index) {
    auxiliar = '{' + value + '}';
    let reAuxiliar = new RegExp(auxiliar, 'g');
    optionsStringified = optionsStringified.replace(reAuxiliar, requestArguments[index]);
  });

  return JSON.parse(optionsStringified);
};

Actions.prototype.createOptionsObject = function (action) {
  let options = {};

  let excludedOptions = ['name', 'extract', 'arguments', 'state'];
  for (let key in action) {
    if (excludedOptions.indexOf(key) === -1) {
      options[key] = action[key];
    }
  }

  return options;
};

module.exports = Actions;
