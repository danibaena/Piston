'use strict';

describe('buildRequest', function () {
  let buildRequest = require('../lib/buildRequest');

  describe('can build a request', function () {
    it('returning a function to be used in the future', function () {
      let parsedAction = {
        'name': 'getUser',
        'uri': '123',
        'baseUrl': 'https://api.tiki.com/v2/users/',
        'qs': {
          'client_id': 'fake'
        },
        'method': 'GET',
        'headers': {
          'host': 'api.tiki.com',
          'User-Agent': 'customUserAgent',
          'Connection': 'keep-alive'
        },
        'after': false,
        'extract': [
          'user.first_name',
          'user.picture_url'
        ]
      };

      expect(typeof buildRequest(parsedAction)).toBe('function');
    });

    it('several times when called with different options and arguments', function () {
      // TODO Write the test
    });
  });
});
