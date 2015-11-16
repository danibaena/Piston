function Piston(specPath) {
  this.specObject = require(specPath)


  var Action = require("../lib/Action")
  var currentSpecActionsAvailable = new Action(this.specObject)
  this.defaultRequest = currentSpecActionsAvailable.parseDefaults

  var actionsNameList = currentSpecActionsAvailable.list()

  for (key in actionsNameList) {
    var propertyName = actionsNameList[key];
    this[propertyName] = function () {
      this.defaultRequest(currentSpecActionsAvailable
        .createOptionsObject(parseAction(actionsNameList[key])));
    }
  }
}
Piston.prototype.extractData = function(specFile, actionName, response) {
  var fieldsToExtract = specFile.action[actionName].extract;

  return fieldsToExtract.map(function(value) {
    return value.split(".");
  });
};

module.exports = Piston;
