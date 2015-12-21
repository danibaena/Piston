'use strict';
const parseResponse = require('./parseResponse.js');
const extractResponse = require('./extractResponse.js');

function postProcess (response, action, stateObject) {
  const parsedResponse = parseResponse(response);
  let extractedResponse = extractResponse(parsedResponse, action.extract);
  saveState(action, stateObject, parsedResponse);
  return extractedResponse;
}

function saveState (action, stateObject, parsedResponse) {
  if (actionHasSaveState(action, stateObject)) {
    if (!Array.isArray(action.saveState)) {
      stateObject[action.saveState] = extractResponse(parsedResponse, action.saveState);
    } else {
      let extractedValues = extractResponse(parsedResponse, action.saveState);
      action.saveState.forEach(function (value, index) {
        stateObject[value] = extractedValues[index];
      });
    }
  }
}

function actionHasSaveState (action, stateObject) {
  return action.saveState && action.saveState.length > 0;
}

module.exports = postProcess;
