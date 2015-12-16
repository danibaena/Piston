'use strict';
function Piston (specPath) {
  let self = this;
  let specObject = require(specPath);
  let request = require('request');

  let Actions = require(__dirname + '/Actions');
  let currentActions = new Actions(request);

  if (Array.isArray(specObject.actions)) {
    specObject.actions.forEach(function (action) {
      self[action.name] = currentActions.buildRequest(action);
    });
  } else {
    self[specObject.actions.name] = currentActions.buildRequest(specObject.actions);
  }
}

Piston.prototype.getState = function () {
  return this.state;
};

module.exports = Piston;
