'use strict';
function buildRequest (action, request, stateObject) {
  const processInserts = require('./processInserts.js');
  const postProcess = require('./post-process/postProcess.js');
  let promise = promisify(request);
  let options = createOptionsObject(action);

  return function () {
    const args = arguments;

    options = processInserts.insertArguments(action, options, args, request);
    action = processInserts.insertExtractArguments(args, action);
    options = processInserts.insertState(options, action, stateObject);

    return promise(options)
      .then(function (response) {
        // checkStatus(response);
        return postProcess(response, action, stateObject);
      })
      .catch(function (error) {
        throw error;
      });
  };
}

function createOptionsObject (action) {
  if (action.options) {
    return action.options;
  }

  let options = {};

  const excludedOptions = ['name', 'extract', 'arguments', 'saveState', 'loadState'];
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
