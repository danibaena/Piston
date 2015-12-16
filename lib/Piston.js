'use strict';
function Piston (specPath) {
  const self = this;
  const specObject = require(specPath);
  const request = require('request');

  const Actions = require(__dirname + '/Actions');
  const currentActions = new Actions(request);
  this._stateObject = {};
  if (Array.isArray(specObject.actions)) {
    specObject.actions.forEach((action) => {
      const currentAction = currentActions.buildRequest(action);
      self[action.name] = wrapStateManage(currentAction, _stateObject);
    });
  } else {
    self[specObject.actions.name] = currentActions.buildRequest(specObject.actions);
  }
}

Piston.prototype.getState = function () {
  return this.state;
};

wrapStateManager = function (func, state) {
  const stateExtractor = obj.extractStates(action.name);

  return function (params) {
    return addStatesToParams(params)
      .then(func)
      .then(stateExtractor);
  };
};

module.exports = Piston;
