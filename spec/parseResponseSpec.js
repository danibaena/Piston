describe('parseResponse', function () {
  var parseResponse = require('../lib/post-process/parseResponse.js');

  describe('can parse a response into an object', function () {
    it('and it detects the content type of the response for JSON', function () {
      var response = {
        headers: {
          'content-type': 'application/json; charset=utf-8'
        },
        body: '{"taca": "Cobra"}'
      };
      var objectifiedJson = {
        taca: 'Cobra'
      };

      expect(parseResponse(response))
        .toEqual(objectifiedJson);
    });

    it('and it detects the content type of the response for XML', function () {
      var response = {
        headers: {
          'content-type': 'text/xml; charset=utf-8'
        },
        body: '<taca>Cobra</taca>'
      };
      var objectifiedXml = {
        taca: 'Cobra'
      };

      expect(parseResponse(response))
        .toEqual(objectifiedXml);
    });
  });
});
