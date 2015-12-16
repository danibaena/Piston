'use strict';
function Piston (specPath) {
  const self = this;
  const specObject = require(specPath);
  const request = require('request');
  const buildRequest = require(__dirname + '/buildRequest.js');

  let stateObject = {};

  if (Array.isArray(specObject.actions)) {
    specObject.actions.forEach((action) => {
      self[action.name] = buildRequest(action);
    });
  } else {
    self[specObject.actions.name] = buildRequest(specObject.actions);
  }
}

function getState () {
  return stateObject;
}

// wrapStateManager = function (func, state) {
//   const stateExtractor = obj.extractStates(action.name);
//
//   return function (params) {
//     return addStatesToParams(params)
//       .then(func)
//       .then(stateExtractor);
//   };
// };

module.exports = Piston;
