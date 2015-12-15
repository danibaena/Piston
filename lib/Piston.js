'use strict';
function Piston (specPath) {
  let specObject = require(specPath);
  let promise = require('bluebird');
  let request = require('request');

  let Actions = require(__dirname + '/Actions');
  let currentActions = new Actions(specObject, promise, request);

  let actionsNameList = currentActions.list();

  for (let key in actionsNameList) {
    let propertyName = actionsNameList[key];
    let parsedAction = currentActions.parseAction(actionsNameList[key]);
    let promise = currentActions.buildRequest(parsedAction);
    this[propertyName] = promise;
  }
}

Piston.prototype.getState = function () {
  return this.state;
};

module.exports = Piston;
