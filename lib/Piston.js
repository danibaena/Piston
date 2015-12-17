'use strict';
function Piston (specPath) {
  const self = this;
  const specObject = require(specPath);
  const request = require('request');
  const buildRequest = require(__dirname + '/buildRequest.js');

  let stateObject = {};

  if (Array.isArray(specObject.actions)) {
    specObject.actions.forEach((action) => {
      self[action.name] = buildRequest(action, request, stateObject);
    });
  } else {
    self[specObject.actions.name] = buildRequest(specObject.actions, request, stateObject);
  }
}

module.exports = Piston;
