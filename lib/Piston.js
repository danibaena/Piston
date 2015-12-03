function Piston(specPath) {
  this.specObject = require(specPath);
  this.promise = require("bluebird");
  this.request = require("request");

  var Action = require(__dirname + "/Action");
  var currentSpecActionsAvailable = new Action(this.specObject, this.promise, this.request);

  var actionsNameList = currentSpecActionsAvailable.list();

  for (key in actionsNameList) {
    var propertyName = actionsNameList[key];
    var parsedActionUnique = currentSpecActionsAvailable.parseAction(actionsNameList[key]);
    var promiseUnique = currentSpecActionsAvailable
      .buildRequest(parsedActionUnique);
    this[propertyName] = promiseUnique;
  }
}

module.exports = Piston;
