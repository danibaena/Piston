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

Action.prototype.createOptionsObject = function(parsedAction) {

  var options = {}

  if (parsedAction.options !== undefined)
    return parsedAction.options

  var excludedOptions = ['name', 'after', 'extract']
  for (var key in parsedAction) {
    if (excludedOptions.indexOf(key) === -1) {
      options[key] = parsedAction[key]
    }
  }

  return options
};

Action.prototype.parseDefaults = function() {
  return requestPromise.defaults(this.specObject.defaults).defaults({jar: true})
};

Action.prototype.extractData = function(parsedAction) {
  var fieldsToExtract = parsedAction.extract;

  return fieldsToExtract.map(function(value) {
    return value.split(".");
  });
};

module.exports = Action;
