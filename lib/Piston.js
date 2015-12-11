function Piston (specPath) {
  this.specObject = require(specPath);
  this.promise = require('bluebird');
  this.request = require('request');

  var Actions = require(__dirname + '/Actions');
  this.currentActions = new Actions(this.specObject, this.promise, this.request);

  var actionsNameList = this.currentActions.list();

  for (key in actionsNameList) {
    var propertyName = actionsNameList[key];
    var parsedActionUnique = this.currentActions.parseAction(actionsNameList[key]);
    var promiseUnique = this.currentActions.buildRequest(parsedActionUnique);
    this[propertyName] = promiseUnique;
  }
}

Piston.prototype.getResponse = function () {
  return this.currentActions.response;
};

Piston.prototype.getToken = function () {
  return this.currentActions.token;
};

module.exports = Piston;
