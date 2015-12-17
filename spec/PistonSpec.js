'use strict';
describe('Piston', function () {
  let Piston = require('../lib/Piston');
  let currentPiston;
  let specPath;

  describe('can create a valid specObject', function () {
    
    it('from a json file', function(){
      specPath = '../pistonSpecs/airbnb.json';
      expect(new Piston(specPath)).toEqual(jasmine.any(Object));
    });

    it('from a yaml file', function(){
      specPath = './pistonSpecs/spotify.yml';
      expect(new Piston(specPath)).toEqual(jasmine.any(Object));
    });

    it('or it throws an error if file path is invalid', function () {
      specPath = '';
      expect(function () {new Piston(specPath);}).toThrow();
    });

    it('or throws an error if file extension is not valid', function () {
      specPath = __dirname + '/dummys/airbnb.piston';
      expect(function () {new Piston(specPath);}).toThrow();
    });
  });

  describe('can create action from keys', function () {
    it('correctly creates properties from a action object', function () {
      let functionName = 'getUser';
      specPath = '../pistonSpecs/airbnb.json';
      currentPiston = new Piston(specPath);
      expect(currentPiston[functionName]).toEqual(jasmine.any(Function));
    });
  });
});
