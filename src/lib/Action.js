var requestPromise = require('request-promise');

function Action(specObject) {
  this.specObject = specObject;
}

Action.prototype.list = function() {
  var data = this.specObject.action;
  var names = [];
  for (var key in data) {
    names[key] = data[key].name;
  }
  return names;
};

Action.prototype.parseAction = function(actionName) {
  var data = this.specObject.action;

  for (var key in data) {
    if (data[key].name === actionName) {
      return data[key];
    }
  }
};

Action.prototype.buildRequest = function(parsedAction) {

  var options = this.createOptionsObject(parsedAction)


  return
};

Action.prototype.createOptionsObject = function(parsedAction, arguments) {

  var options = {}

  if (parsedAction.options !== undefined){
    return parsedAction.options
  }

  var excludedOptions = ['name', 'after', 'extract']
  for (var key in parsedAction) {
    if (excludedOptions.indexOf(key) === -1) {
      options[key] = this.isArgument(parsedAction[key]) ? arguments[parsedAction[key][1]] : parsedAction[key]
    }
  }

  return options
};

Action.prototype.isArgument = function(string) {
  return string[0] === '<' && string[string.length - 1] === '>';
}

Action.prototype.parseDefaults = function() {
 var defaults = {};
 if (this.specObject.defaults !== undefined){
   defaults = this.specObject.defaults;
 }
 defaults[jar] = true;

 return request.defaults(defaults);
};

Action.prototype.extractData = function(parsedAction) {
  var fieldsToExtract = parsedAction.extract;

  return fieldsToExtract.map(function(value) {
    return value.split(".");
  });
};

module.exports = Action;
