var extractData = module.exports = function (parsedAction) {
  var fieldsToExtract = parsedAction.extract;

  if (fieldsToExtract !== undefined) {
    return fieldsToExtract.map(function (value) {
      return value.split('.');
    });
  }
};
  
