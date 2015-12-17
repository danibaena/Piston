'use strict';
let extractResponse = module.exports = function (response, specExtract) {
  if (typeof specExtract === 'undefined') {
    return response;
  }

  let result;
  if (isArray(response)) {
    result = extractFromArray(response, specExtract);
  } else {
    result = extractFromObject(response, specExtract);
  }

  return result;
};

function isArray (a) {
  return (!!a) && (a.constructor === Array);
}

function isObject (a) {
  return (!!a) && (a.constructor === Object);
}

function isNumeric (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function getField (response, field) {
  let fields = field.split('.');

  return getSplitFields(response, fields);
}

function getSplitFields (response, fieldsArray) {
  let result = isArray(response) && (!isNumeric(fieldsArray[0]))
    ? response.map((object) => object[fieldsArray[0]])
    : response[fieldsArray[0]];

  fieldsArray.shift();
  if (fieldsArray.length === 0) {
    return result;
  }
  return getSplitFields(result, fieldsArray);
}

function extractFromObject (response, specExtract) {
  if (!isArray(specExtract) && !isObject(specExtract)) {
    return getField(response, specExtract);
  }
  let result = isArray(specExtract) ? [] : {};
  for (let key in specExtract) {
    result[key] = extractFromObject(response, specExtract[key]);

  }
  return result;
}

function extractFromArray (response, specExtract) {
  return response.map((object) => extractFromObject(object, specExtract));
}
