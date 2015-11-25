function Piston(specPath) {
  this.specObject = require(specPath);

  var Action = require("../lib/Action");
  var currentSpecActionsAvailable = new Action(this.specObject);

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
