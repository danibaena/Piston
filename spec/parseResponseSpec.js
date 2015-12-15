'use strict';
describe('parseResponse', function () {
  let parseResponse = require('../lib/post-process/parseResponse.js');

  describe('can parse a response into an object', function () {
    it('and it detects the content type of the response for JSON', function () {
      let response = {
        headers: {
          'content-type': 'application/json; charset=utf-8'
        },
        body: '{"taca": "Cobra"}'
      };
      let objectifiedJson = {
        taca: 'Cobra'
      };

      expect(parseResponse(response))
        .toEqual(objectifiedJson);
    });

    it('and it detects the content type of the response for XML', function () {
      let response = {
        headers: {
          'content-type': 'text/xml; charset=utf-8'
        },
        body: '<taca>Cobra</taca>'
      };
      let objectifiedXml = {
        taca: 'Cobra'
      };

      expect(parseResponse(response))
        .toEqual(objectifiedXml);
    });
  });
});
