'use strict';
const processInserts = {
  insertArguments: insertArguments,
  insertExtractArguments: insertExtractArguments,
  insertState: insertState
};

function insert (receiverObject, specInserts, runtimeInserts) {
  let receiverObjectStringified = JSON.stringify(receiverObject);
  let auxiliar;
  if (!Array.isArray(specInserts)) {
    specInserts = [specInserts];
  }

  specInserts.forEach(function (value, index) {
    auxiliar = '{' + value + '}';
    let regexAuxiliar = new RegExp(auxiliar, 'g');
    receiverObjectStringified = receiverObjectStringified.replace(regexAuxiliar, runtimeInserts[index]);
  });

  return JSON.parse(receiverObjectStringified);
}

function insertArguments (action, options, args, request) {
  if (hasArguments(action)) {
    options = insert(options, action.arguments, args);

    let callback = findCallback(args);
    if (callback) {
      return request(options, callback);
    }
  }
  return options;
}

function insertExtractArguments (args, action) {
  if (hasArgumentExtract(args, action)) {
    action.extract = args[args.length - 1];
  } else {
    if (actionHasExtract(action)) {
      action.extract = insert(action.extract, action.arguments, args);
    }
  }
  return action;
}

function insertState (options, action, stateObject) {
  if (actionHasLoadState(action) && pistonHasState(action, stateObject)) {
    options = insert(options, action.loadState, stateObject[action.loadState]);
  }
  return options;
}

function hasArguments (action) {
  return action.arguments && action.arguments.length > 0;
}

function findCallback (args) {
  return Array.from(args)
    .find((item) => typeof item === 'function');
}

function hasArgumentExtract (args, action) {
  return args.length > action.arguments.length;
}

function actionHasLoadState (action) {
  return action.loadState && action.loadState.length > 0;
}

function actionHasExtract (action) {
  return action.extract && action.extract.length > 0;
}

function pistonHasState (action, stateObject) {
  return Array.isArray(action.loadState)
    ? action.loadState.every((stateItem) => stateObject[stateItem] !== undefined)
    : stateObject[action.loadState] !== undefined;
}

module.exports = processInserts;
