'use strict';

function createOptionsObject(action) {
  if (action.options) {
    return action.options;
  }

  let options = {};

  const excludedOptions = ['name', 'extract', 'arguments', 'saveState', 'loadState'];
  for (let key in action) {
    if (excludedOptions.indexOf(key) === -1) {
      options[key] = action[key];
    }
  }

  return options;
}

module.exports = createOptionsObject;