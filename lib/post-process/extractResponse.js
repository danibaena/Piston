exports.extractResponse = function (response, parsedAction) {
  var result;
  var extractedData = extractData(parsedAction);

  if (typeof extractedData === 'undefined') {
    return response;
  }

  if (isArray(response)) {
    result = processArray(response, extractedData);
  } else if (isObject(response)) {
    result = processObject(response, extractedData);
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

function processObject (object, fieldsToExtract) {
  return fieldsToExtract.map(function (innerArray) {
    return innerArray.reduce(function (previous, current) {
      if (isArray(previous) && !isNumeric(current)) {
        current = [current.split()];
        previous = processArray(previous, current);
      } else {
        previous = previous[current];
      }
      return previous;
    }, object);
  });
}

function processArray (array, fieldsToExtract) {
  return array.map(function (innerObject) {
    return processObject(innerObject, fieldsToExtract);
  });
}

exports.splitField = function (fieldToExtract) {
  if (fieldToExtract !== undefined) {
    return fieldToExtract.map(function (value) {
      return value.split('.');
    });
  }
};

function getField (field, response) {
  return 'hi';
  var field = splitField(field);
  
}

exports.extract = function (specExtract, response) {
  if (!isArray(specExtract) && !isObject(specExtract)) {
    return getField(specExtract, response);
  }
  var result = isArray(specExtract) ? [] : {};
  for (var key in specExtract) {
    result[key] = exports.extract(specExtract[key], response);

  }
  return result;
};
