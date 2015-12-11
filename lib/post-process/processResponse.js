var processResponse = module.exports = function (response, extractedData) {
  var result;
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
