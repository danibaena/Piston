'use strict';
function Piston (specPath) {
  let self = this;
  let specObject = require(specPath);
  let promise = require('bluebird');
  let request = require('request');

  let Actions = require(__dirname + '/Actions');
  let currentActions = new Actions(promise, request);

  specObject.actions.forEach(function (action) {
    self[action.name] = currentActions.buildRequest(action);
  });
}

Piston.prototype.getState = function () {
  return this.state;
};

module.exports = Piston;
