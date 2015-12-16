'use strict';

function processInserts (action, stateObject, options, args, request) {
  insertArguments(action, options, args, request);
  insertState(options, action, stateObject);
}

function insert (receiverObject, specInserts, runtimeInserts) {
  let receiverObjectStringified = JSON.stringify(receiverObject);
  let auxiliar;

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
      console.log('callback time!', callback);
      return request(options, callback);
    }

    if (hasArgumentExtract(args, action)) {
      action.extract = args[args.length - 1];
    } else {
      action.extract = insert(action.extract, action.arguments, args);
    }
  }
}

function insertState (options, action, stateObject) {
  if (actionHasState(action) && pistonHasState(action, stateObject)) {
    options = insert(options, action.state, stateObject[action.state]);
  }
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

function actionHasState (action) {
  return action.state && action.state.length > 0;
}

function pistonHasState (action, stateObject) {
  return action.state.every((stateItem) => stateObject[stateItem] !== undefined);
}

module.exports = processInserts;
