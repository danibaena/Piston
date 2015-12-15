function parseResponse (response) {
  var contentType = response.headers['content-type'];
  var data;
  var parseString = require('xml2js').parseString;

  if (contentType.indexOf('application/json') !== -1) {
    data = JSON.parse(response.body);
  } else if (contentType.indexOf('text/xml') !== -1) {
    parseString(response.body, function (err, result) {
      data = result;
    });
  }
  return data;
}

module.exports = parseResponse;
