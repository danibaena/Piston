'use strict';

function buildRequest(action, request, stateObject) {
  const processInserts = require('./processInserts.js');
  const postProcess = require('./post-process/postProcess.js');
  const createOptions = require('./createOptions');
  let promise = promisify(request);

  return function () {
    let options = createOptions(action);
    let args = arguments;

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
