'use strict';

function Piston (specPath) {
  const self = this;
  const specObject = createSpecObjet(specPath);
  const request = require('request');
  const buildRequest = require(__dirname + '/buildRequest.js');

  this.stateObject = {};

  if (Array.isArray(specObject.actions)) {
    specObject.actions.forEach((action) => {
      self[action.name] = buildRequest(action, request, this.stateObject);
    });
  } else {
    self[specObject.actions.name] = buildRequest(specObject.actions, request, this.stateObject);
  }
}

function createSpecObjet (specPath) {
  if (specPath.indexOf('json') !== -1) {
    return require(specPath);
  } else if ((specPath.indexOf('yml') !== -1) || (specPath.indexOf('yaml') !== -1)) {
    let YAML = require('yamljs');
    return YAML.load(specPath);
  }
}

module.exports = Piston;
