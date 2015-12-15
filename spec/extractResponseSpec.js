'use strict';
describe('extractResponse', function () {
  let extractResponse = require('../lib/post-process/extractResponse.js');

  describe('can process a response', () => {

    it('extracts a field from a response (object) with an extract field (array)', function () {
      let response = {a: 'hello'};
      let specExtract = ['a'];
      let result = ['hello'];
      expect(extractResponse(response, specExtract)).toEqual(result);

    });
    it('extracts a field from a response (object) with an extract field (object)', function () {
      let response = {a: 'hello'};
      let specExtract = {a: 'a'};
      let result = {a: 'hello'};
      expect(extractResponse(response, specExtract)).toEqual(result);

    });
    it('extracts two fields from a response (object) with an extract field (array)', function () {
      let response = {a: 'hello', b: 'world'};
      let specExtract = ['a', 'b'];
      let result = ['hello', 'world'];
      expect(extractResponse(response, specExtract)).toEqual(result);

    });

    it('extracts two fields from a response (object) with an extract field (object)', function () {
      let response = {a: 'hello', b: 'world'};
      let specExtract = {a: 'a', b: 'b'};
      let result = {a: 'hello', b: 'world'};
      expect(extractResponse(response, specExtract)).toEqual(result);

    });

    it('extracts two fields from a response (array) with an extract field (object)', function () {
      let response = [{a: 'hello', b: 'world'}, {a: 'foo', b: 'bar'}];
      let specExtract = {a: 'a', b: 'b'};
      let result = [{a: 'hello', b: 'world'}, {a: 'foo', b: 'bar'}];
      expect(extractResponse(response, specExtract)).toEqual(result);

    });

    it('extracts two fields from a response (array) with an extract field (array)', function () {
      let response = [{a: 'hello', b: 'world'}, {a: 'foo', b: 'bar'}];
      let specExtract = ['a', 'b'];
      let result = [['hello', 'world'], ['foo', 'bar']];
      expect(extractResponse(response, specExtract)).toEqual(result);
    });

    it('extracts a nested field from a response (object) with an extract field (object)', function () {
      let response = {a: {b: 'hello'}};
      let specExtract = {a: 'a.b'};
      let result = {a: 'hello'};
      expect(extractResponse(response, specExtract)).toEqual(result);
    });

    it('extracts a nested field from a response (object) with an extract field (array)', function () {
      let response = {a: {b: 'hello'}};
      let specExtract = ['a.b'];
      let result = ['hello'];
      expect(extractResponse(response, specExtract)).toEqual(result);
    });

    it('extracts a nested field from a response (array) with an extract field (object)', function () {
      let response = [{a: {b: 'hello'}}, {a: {b: 'world'}}];
      let specExtract = {a: 'a.b'};
      let result = [{a: 'hello'}, {a: 'world'}];
      expect(extractResponse(response, specExtract)).toEqual(result);
    });

    it('extracts a nested field from a response (array) with an extract field (array)', function () {
      let response = [{a: {b: 'hello'}}, {a: {b: 'world'}}];
      let specExtract = ['a.b'];
      let result = [['hello'], ['world']];
      expect(extractResponse(response, specExtract)).toEqual(result);
    });

    it('extracts a nested field from a response (array) with an extract field (array)', function () {
      let response = [{a: {b: 'hello'}}, {a: {b: 'world'}}];
      let specExtract = ['a.b'];
      let result = [['hello'], ['world']];
      expect(extractResponse(response, specExtract)).toEqual(result);
    });

    it('extracts a field (array) from a response (object) with an extract field (array)', function () {
      let response = {a: {b: ['hello', 'world']}};
      let specExtract = ['a.b'];
      let result = [['hello', 'world']];
      expect(extractResponse(response, specExtract)).toEqual(result);
    });

    it('extracts a field (array) from a response (object) with an extract field (object)', function () {
      let response = {a: {b: ['hello', 'world']}};
      let specExtract = {a: 'a.b'};
      let result = {a: ['hello', 'world']};
      expect(extractResponse(response, specExtract)).toEqual(result);
    });

    it('extracts a field (object) nested inside a field (array) from a response (object) with an extract field (object)', function () {
      let response = {a: {b: [{c: 'hello'}, {c: 'world'}]}};
      let specExtract = {a: 'a.b.c'};
      let result = {a: ['hello', 'world']};
      expect(extractResponse(response, specExtract)).toEqual(result);
    });

    it('extracts the first field (object) nested inside a field (array) from a response (object) with an extract field (object)', function () {
      let response = {a: {b: [{c: 'hello'}, {c: 'world'}]}};
      let specExtract = {a: 'a.b.0.c'};
      let result = {a: 'hello'};
      expect(extractResponse(response, specExtract)).toEqual(result);
    });

    it('extracts a field (object) nested inside a field (array) from a response (object) with an extract field (array)', function () {
      let response = {a: {b: [{c: 'hello'}, {c: 'world'}]},
      d: 'foo'};
      let specExtract = ['a.b.c', 'd'];
      let result = [['hello', 'world'], 'foo'];
      expect(extractResponse(response, specExtract)).toEqual(result);
    });

    it('extracts the first field (object) nested inside a field (array) from a response (object) with an extract field (object)', function () {
      let response = {a: {b: [{c: 'hello'}, {c: 'world'}]},
      d: 'foo'};
      let specExtract = ['a.b.0.c', 'd'];
      let result = ['hello', 'foo'];
      expect(extractResponse(response, specExtract)).toEqual(result);
    });

    it('extracts a field (array) nested inside a field (array) from a response (object) with an extract field (object)', function () {
      let response = {a: {b: [{c: ['hello', 'world']}, {c: ['foo', 'bar']}]},
      d: 'foo'};
      let specExtract = {a: 'a.b.c', b: 'd'};
      let result = {a: [['hello', 'world'], ['foo', 'bar']], b: 'foo'};
      expect(extractResponse(response, specExtract)).toEqual(result);
    });

    it('extracts a field (array) nested inside a field (array) from a response (object) with an extract field (array)', function () {
      let response = {a: {b: [{c: ['hello', 'world']}, {c: ['foo', 'bar']}]},
      d: 'foo'};
      let specExtract = ['a.b.c', 'd'];
      let result = [[['hello', 'world'], ['foo', 'bar']], 'foo'];
      expect(extractResponse(response, specExtract)).toEqual(result);
    });

    it('extracts a field (array) nested inside a field (object) nested inside a field (array) from a response (object) with an extract field (object)', function () {
      let response = {a: {b: [{c: {d: ['hello', 'world']}}, {c: {d: ['foo', 'bar']}}]},
      d: 'foo'};
      let specExtract = {a: 'a.b.c.d', b: 'd'};
      let result = {a: [['hello', 'world'], ['foo', 'bar']], b: 'foo'};
      expect(extractResponse(response, specExtract)).toEqual(result);
    });

    it('extracts a field (array) nested inside a field (object) nested inside a field (array) from a response (object) with an extract field (array)', function () {
      let response = {a: {b: [{c: {d: ['hello', 'world']}}, {c: {d: ['foo', 'bar']}}]},
      d: 'foo'};
      let specExtract = ['a.b.c.d', 'd'];
      let result = [[['hello', 'world'], ['foo', 'bar']], 'foo'];
      expect(extractResponse(response, specExtract)).toEqual(result);
    });

    // back to basics
    it('extracts a field from a response (object) with an extract field (string)', function () {
      let response = {a: 'hello'};
      let specExtract = 'a';
      let result = 'hello';
      expect(extractResponse(response, specExtract)).toEqual(result);
    });

    it('extracts a field from a response (array) with an extract field (string)', function () {
      let response = [{a: 'hello'}, {a: 'world'}];
      let specExtract = 'a';
      let result = ['hello', 'world'];
      expect(extractResponse(response, specExtract)).toEqual(result);
    });
  });
});
