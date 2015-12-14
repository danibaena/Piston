function Piston (specPath) {
  this.specObject = require(specPath);
  this.promise = require('bluebird');
  this.request = require('request');

  var Actions = require(__dirname + '/Actions');
  this.currentActions = new Actions(this.specObject, this.promise, this.request);

  var actionsNameList = this.currentActions.list();

  for (key in actionsNameList) {
    var propertyName = actionsNameList[key];
    var parsedAction = this.currentActions.parseAction(actionsNameList[key]);
    var promise = this.currentActions.buildRequest(parsedAction);
    this[propertyName] = promise;
  }
}

Piston.prototype.getResponse = function () {
  return this.currentActions.response;
};

Piston.prototype.getState = function () {
  return this.currentActions.state;
};

module.exports = Piston;
