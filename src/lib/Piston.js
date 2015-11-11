function Piston(specPath) { //specPath
  this.specObject = require(specPath);
}
/*Piston.prototype.parseSpec = function(specPath) {
  return require(specPath);
};*/

Piston.prototype.functionsInit = function() {
  var Functions = require("../lib/Functions");
  var functions = new Functions(this.specObject);
  var functionNamesList = functions.list();
  for (key in functionNamesList) {
    var propertyName = functionNamesList[key];
    this[propertyName] = functions.buildRequest(functions.parseFunctions(functionNamesList[key]));
  }
}

Piston.prototype.extractData = function(specFile, functionName, response) {
  var fieldsToExtract = specFile.functions[functionName].extract;

  return fieldsToExtract.map(function(value) {
    return value.split(".");
  });
};

module.exports = Piston;
