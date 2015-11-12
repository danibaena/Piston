function Piston(specPath) {
  this.specObject = require(specPath);
}

Piston.prototype.actionInit = function() {
  var Action = require("../lib/Action");
  var action = new Action(this.specObject);
  var actionNameList = action.list();
  for (key in actionNameList) {
    var propertyName = actionNameList[key];
    this[propertyName] = action.buildRequest(action.parseAction(actionNameList[key]));
  }
}

Piston.prototype.extractData = function(specFile, actionName, response) {
  var fieldsToExtract = specFile.action[actionName].extract;

  return fieldsToExtract.map(function(value) {
    return value.split(".");
  });
};

module.exports = Piston;
