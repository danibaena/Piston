function Piston (specPath) {
  var specObject = require(specPath);
  var promise = require('bluebird');
  var request = require('request');

  var Actions = require(__dirname + '/Actions');
  var currentActions = new Actions(specObject, promise, request);

  var actionsNameList = currentActions.list();

  for (key in actionsNameList) {
    var propertyName = actionsNameList[key];
    var parsedAction = currentActions.parseAction(actionsNameList[key]);
    var promise = currentActions.buildRequest(parsedAction);
    this[propertyName] = promise;
  }
}

Piston.prototype.getState = function () {
  return this.state;
};

module.exports = Piston;
