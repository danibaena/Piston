'use strict';

describe('Pistonify', function () {
  let Pistonify = require('../lib/Pistonify');
  let currentPistonify;
  let specPath;

  describe('can create a valid specObject', function () {
    it('from a json file', function(){
      specPath = '../pistonifySpecs/airbnb.json';
      expect(new Pistonify(specPath)).toEqual(jasmine.any(Object));
    });

    it('from a yaml file', function(){
      specPath = './pistonifySpecs/spotify.yml';
      expect(new Pistonify(specPath)).toEqual(jasmine.any(Object));
    });

    it('or it throws an error if file path is invalid', function () {
      specPath = '';
      expect(function () {new Pistonify(specPath);}).toThrow();
    });

    it('or throws an error if file extension is not valid', function () {
      specPath = __dirname + '/dummys/airbnb.piston';
      expect(function () {new Pistonify(specPath);}).toThrow();
    });
  });

  describe('can create action from keys', function () {
    it('correctly creates properties from a action object', function () {
      let functionName = 'getUser';
      specPath = '../pistonifySpecs/airbnb.json';
      currentPistonify = new Pistonify(specPath);
      expect(currentPistonify[functionName]).toEqual(jasmine.any(Function));
    });
  });
});
