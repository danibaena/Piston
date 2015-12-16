'use strict';

function Actions(request) {
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
  let data;

  return function () {
    if (hasArguments(action)) {
      options = self.processArguments(options, action.arguments, arguments);
      let callback = findCallback(arguments);

      if (!!callback) {
        // console.log('callback time!', callback);
        return request(options, callback);
      }

      if (hasArgumentExtract(arguments, action)) {
        action.extract = arguments[arguments.length - 1];
      } else {
        action.extract = self.processArguments(action.extract, action.arguments, arguments);
      }
    }

    return promise(options)
      .then(function (response) {
        data = self.postProcess.parseResponse(response);
        data = self.postProcess.extractResponse(data, action.extract);
        return data;
      })
      .catch(function (error) {
        throw error
      });
  };
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

  let excludedOptions = ['name', 'after', 'extract', 'arguments'];
  for (let key in action) {
    if (excludedOptions.indexOf(key) === -1) {
      options[key] = action[key];
    }
  }

  return options;
};

function hasArguments(action) {
  return !!action.arguments && action.arguments.length > 0;
};

function findCallback(args) {
  return Array.from(args).find((item) => typeof item === 'function');
};

function hasArgumentExtract(args, action) {
  return args.length > action.arguments.length;
};

module.exports = Actions;
