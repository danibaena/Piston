'use strict';
const parseResponse = require('./parseResponse.js');
const extractResponse = require('./extractResponse.js');

function postProcess (response, action, stateObject) {
  // this methods should be one, parseResponse should take extractResponse as a callback
  const parsedResponse = parseResponse(response);
  data = extractResponse(data, action.extract);
  stateObject[action.name] = extractResponse(data, action.state);
  return data;
};

module.exports = postProcess;
