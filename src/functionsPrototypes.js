"use strict";
var request = require("request");

/**
 * [specParser Method to parse spec file into an object readable by the other methods]
 * @param  {[string]} specPath [Path of the spec file to load, given by user]
 * @return {[object]} specFile [Object parsed with all the data in the spec]
 */
function specParser(specPath) {
	specFile = require(specPath);
	return specFile;
}
/**
 * [extract description]
 * @param  {[type]} specFile     [description]
 * @param  {[type]} functionName [description]
 * @param  {[type]} response     [description]
 * @return {[type]}              [description]
 */
function extract(specFile, functionName, response){
	var extra = specFile.functions.functionName.extract;
	// var result = {};
	for (key in extra) {
		console.log(response.key.extra[key]); // response.user.picture_url
	}
}

/**
 * [get description]
 * @param  {[type]} specFile [description]
 * @return {[type]}          [description]
 */
function get(specFile) {

	url_request = specFile.info.url_base+specFile.get_user.url
		+"4?client_id=3092nxybyb0otqw18e8nh5nty";

	console.log(request.get(url_request));
	request.get(url_request, function(error, response, body) {

		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);

			return info;
            //console.log(info); //
        } else {
        	console.log(response.statusCode);
        	//return response.statusCode;
        }
    });
}

function execFunction(param, specParams) {

	specParams = {};

	for (key in specFile) {
		specParams[key] = specFile[key];
	}
	var request_url = specParams[path] + "?" + specParams[query_String];

	return specParams;
}

var airbnb = specParser("./specs/airbnb.json");
/*var getA = get(airbnb);
console.log(getA);*/
