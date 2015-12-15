'use strict'
describe('Piston', function () {
  let Piston = require('../lib/Piston');
  let currentPiston;
  let specPath;

  beforeEach(function () {
    specPath = '../pistonSpecs/airbnb.json';
    currentPiston = new Piston(specPath);
  });

  describe('can use a json file', function () {
    it('Throws an error if file path is invalid', function () {
      specPath = '';
      expect(function () {new Piston(specPath);}).toThrow();
    });

    it('Throws an error if file extension is not json', function () {
      specPath = __dirname + '/dummys/airbnb.piston';
      expect(function () {new Piston(specPath);}).toThrow();
    });

    it('Returns a valid object', function () {
      specPath = '../pistonSpecs/airbnb.json';
      expect(new Piston(specPath)).toEqual(jasmine.any(Object));
    });
  });

  describe('can create action from keys', function () {
    it('correctly creates properties from a action object', function () {
      let functionName = 'getUser';
      expect(currentPiston[functionName]).toEqual(jasmine.any(Function));
    });
  });
});
