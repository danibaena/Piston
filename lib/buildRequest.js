'use strict';

function buildRequest (action, request, stateObject) {
  const processInserts = require('./processInserts.js');
  const postProcess = require('./post-process/postProcess.js');
  const promise = promisify(request);
  let options = createOptionsObject(action);

  return function () {
    const args = arguments;
    processInserts(action, stateObject, options, args, request);

    return promise(options)
      .then(postProcess(response, action, stateObject))
      .catch(function (error) {
        throw error
      });
  };
}

function createOptionsObject (action) {
  let options = {};

  const excludedOptions = ['name', 'extract', 'arguments', 'state'];
  for (let key in action) {
    if (excludedOptions.indexOf(key) === -1) {
      options[key] = action[key];
    }
  }

  return options;
}

const promisify = function (fn, param) {
  return function (param) {
    return new Promise((resolve, reject) => {
      fn(param, function (error, response) {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  };
};

module.exports = buildRequest;
