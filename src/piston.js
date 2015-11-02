/*
client id, client secret

caching data on piston?
cookies: 1 => funcion que lo use
support json and yaml
si un metodo require login que llame al login al llamar al metodo
defaults - method get, protocol http, host - base url - defaults request
validar specs
protocol, host, method, path, headers
schema
*/

var airbnb = require('./specs/airbnb.json');
// var unirest = require('unirest');
// var http = require('http');
// var https = require('https');
var request = require('request');


function Piston (spec) {

  for (key in spec){
    if (! (key === 'baseUrl'))
      this[key] = buildRequest(spec[key])
    else
      var baseUrl = spec.baseUrl
  }

  function buildRequest (specMethodParams){

    var options = {}

    for (key in specMethodParams) {
          options[key] = specMethodParams[key]
    }

    //options.host = specMethodParams.host || host
    //typeof(options.method) === function) ? options.method.toUppercase() : 'GET'
    console.log(options)
    function specRequest (args) {

      return request(options, function (error, response, body) {
        console.log('test');
        //if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(body)
        //}
      })
    }

    return specRequest
  }
}

module.exports = Piston

var a = new Piston(airbnb);
console.log(a)
console.log(a.get_user())
//a.get_user()
//a.get_user()
//console.log(airbnb)
//console.log(typeof(airbnb))

