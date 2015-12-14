describe('Action', function () {
  var Actions = require('../lib/Actions');
  var currentActions;
  var Piston = require('../lib/Piston');
  var currentPiston;

  beforeEach(function () {
    var specPath = '../pistonSpecs/airbnb.json';
    var promise = require('bluebird'); // Use a mock bastard!
    var request = require('request');

    currentPiston = new Piston(specPath);
    currentActions = new Actions(currentPiston.specObject, promise, request);
  });

  describe('can parse a spec object', function () {
    it('given a function name', function () {
      var actionName = 'getUser';
      expect(currentActions.parseAction(actionName))
        .toEqual(jasmine.any(Object));
    });

    it('and extracts the relevant data from a action', function () {
      var extractedArray = [
        ['user', 'first_name'],
        ['user', 'picture_url']
      ];
      var actionName = 'getUser';
      expect(currentActions.extractData(currentActions.parseAction(actionName)))
        .toEqual(extractedArray);
    });

    it('creates a list of the action available in the spec', function () {
      var expectedAction = ['getUser', 'login'];
      expect(currentActions.list())
        .toEqual(expectedAction);
    });
  });

  describe('can build a request', function () {
    it('returning an options object with values from the parsedAction when there is no option field', function () {
      var parsedAction = {
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

      var options = {
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

      expect(currentActions.createOptionsObject(parsedAction))
        .toEqual(options);
    });

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

      expect(currentActions.objectify(response))
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

      expect(currentActions.objectify(response))
        .toEqual(objectifiedXml);
    });
  });

  // describe('can process a response,', function () {
  //   var response = {
  //     'user': {
  //       'first_name': 'José Antonio',
  //       'picture_url': 'https://a2.muscache.com/'
  //     }
  //   };
  //
  //   const extractedData = [
  //     ['user', 'first_name'],
  //     ['user', 'picture_url']
  //   ];
  //
  //   const path = 'user.first_name';
  //
  //   it('if extractedData is undefined returns the response', function () {
  //     var extractedData = undefined;
  //
  //     expect(currentActions.processResponse(response, extractedData))
  //       .toEqual(response);
  //   });
  //
  //   it('if response is an object and there are only nested objects. ' +
  //   'It returns an array.',
  //     function () {
  //       expect(currentActions.getProperties(response, path))
  //         .toEqual([
  //           'José Antonio'
  //         ]);
  //     });
  // });

});
