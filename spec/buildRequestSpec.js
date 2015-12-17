'use strict';

describe('buildRequest', function () {
  let buildRequest = require('../lib/buildRequest');

  describe('can build a request', function () {
    it('returning an options object with values from the parsedAction when there is no option field', function () {
      let parsedAction = {
        'name': 'getUser',
        'uri': '7771271',
        'baseUrl': 'https://api.airbnb.com/v2/users/',
        'qs': {
          'client_id': '3092nxybyb0otqw18e8nh5nty'
        },
        'method': 'GET',
        'headers': {
          'host': 'api.airbnb.com',
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0',
          'If-None-Match': 'W/"0ec4c2f8c1695ca2328859164f9b2485',
          'Connection': 'keep-alive'
        },
        'after': false,
        'extract': [
          'user.first_name',
          'user.picture_url'
        ]
      };

      let options = {
        'uri': '7771271',
        'baseUrl': 'https://api.airbnb.com/v2/users/',
        'qs': {
          'client_id': '3092nxybyb0otqw18e8nh5nty'
        },
        'method': 'GET',
        'headers': {
          'host': 'api.airbnb.com',
          'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:41.0) Gecko/20100101 Firefox/41.0',
          'If-None-Match': 'W/"0ec4c2f8c1695ca2328859164f9b2485',
          'Connection': 'keep-alive'
        }
      };

    // expect(currentActions.createOptionsObject(parsedAction)).toEqual(options);
    });
  });
});
