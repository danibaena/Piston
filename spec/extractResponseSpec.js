'use strict';

describe('can process a response', () => {
  let test = require('../lib/post-process/extractResponse.js');

  it('and splits the fields to extract', function () {
    let result = [
      ['user', 'first_name'],
      ['user', 'picture_url']
    ];

    let fields = ['user.first_name', 'user.picture_url'];
    expect(test.splitField(fields)).toEqual(result);
  });

  it('extracts a single field from a response (object) with an extract field (array)', function () {
    let response = {a: 'hello'};
    let specExtract = ['a'];
    let result = ['hi'];
    expect(test.extract(specExtract, response)).toEqual(result);

  });
  it('extracts a single field from a response (object) with an extract field (object)', function () {
    let response = {a: 'hello'};
    let specExtract = {a: 'a'};
    let result = {a: 'hi'};
    expect(test.extract(specExtract, response)).toEqual(result);

  });
  it('extracts two fields from a response (object) with an extract field (array)', function () {
    let response = {a: 'hello', b: 'world'};
    let specExtract = ['a', 'b'];
    let result = ['hi', 'hi'];
    expect(test.extract(specExtract, response)).toEqual(result);

  });
  it('extracts two fields from a response (object) with an extract field (object)', function () {
    let response = {a: 'hello', b: 'world'};
    let specExtract = {a: 'a', b: ' b'};
    let result = {a: 'hi', b: 'hi'};
    expect(test.extract(specExtract, response)).toEqual(result);

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
