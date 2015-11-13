function Piston(specPath) {
  this.specObject = require(specPath);
}

Piston.prototype.actionInit = function() {
  var Action = require("../lib/Action");
  var currentSpecActionsAvailable = new Action(this.specObject);
  var actionsNameList = currentSpecActionsAvailable.list();
  for (key in actionsNameList) {
    var propertyName = actionsNameList[key];
    this[propertyName] = currentSpecActionsAvailable.buildRequest(
    	currentSpecActionsAvailable.parseAction(actionsNameList[key])
    	);
  }
}

Piston.prototype.extractData = function(specFile, actionName, response) {
  var fieldsToExtract = specFile.action[actionName].extract;

  return fieldsToExtract.map(function(value) {
    return value.split(".");
  });
};

module.exports = Piston;
