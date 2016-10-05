'use strict';

describe('createOptions', function () {
  let createOptions = require('../lib/createOptions');
  let parsedAction;
  let options;

  beforeEach(function () {
    parsedAction = {
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
    options = {
      'uri': '123',
      'baseUrl': 'https://api.tiki.com/v2/users/',
      'qs': {'client_id': 'fake'},
      'method': 'GET',
      'headers': {
        'host': 'api.tiki.com',
        'User-Agent': 'customUserAgent',
        'Connection': 'keep-alive'
      },
      'after': false
    };

    expect(createOptions(parsedAction)).toEqual(options);
  });

  describe('can return an options object', function () {
    it('with values from the parsedAction', function () {
      expect(createOptions(parsedAction)).toEqual(options);
    });

    it('can return a different options object for the same action when called with different options', function () {
      expect(createOptions(parsedAction)).toEqual(options);

      parsedAction = {
        'name': 'getUser',
        'uri': '123',
        'baseUrl': 'https://api.tiki.com/v2/users/',
        'qs': {
          'client_id': 'mock'
        },
        'method': 'GET',
        'headers': {
          'host': 'api.tiki.com',
          'User-Agent': 'customUserAgent',
          'Connection': 'keep-alive'
        },
        'after': false,
        'arguments': 'random',
        'extract': [
          'user.first_name',
          'user.picture_url'
        ]
      };

      options = {
        'uri': '123',
        'baseUrl': 'https://api.tiki.com/v2/users/',
        'qs': {'client_id': 'mock'},
        'method': 'GET',
        'headers': {
          'host': 'api.tiki.com',
          'User-Agent': 'customUserAgent',
          'Connection': 'keep-alive'
        },
        'after': false
      };

      expect(createOptions(parsedAction)).toEqual(options);
    });
  });
});
