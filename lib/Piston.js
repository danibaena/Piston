'use strict';

function Piston(specPath) {
  let self = this;
  let specObject = createSpecObjet(specPath);
  // console.log(specObject);
  let request = require('request');
  // console.log(typeof specObject);
  let Actions = require(__dirname + '/Actions');
  let currentActions = new Actions(request);

  if (Array.isArray(specObject.actions)) {
    specObject.actions.forEach(function (action) {
      self[action.name] = currentActions.buildRequest(action);
    });
  } else {
    self[specObject.actions.name] = currentActions.buildRequest(specObject.actions);
  }
}

Piston.prototype.getState = function () {
  return this.state;
};

function createSpecObjet(specPath) {
  if (specPath.indexOf('json') !== -1) {
    return require(specPath);
  } else if ((specPath.indexOf('yml') !== -1) || (specPath.indexOf('yaml') !== -1)) {
    let YAML = require('yamljs');
    return YAML.load(specPath);
  }
};

module.exports = Piston;
