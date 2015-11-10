request = require('request');

function Functions() {
}
Functions.prototype.parseFunction = function(specObject, functionName){
	var data = specObject.functions;

	for (var key in data) {
		if (data[key].name === functionName) {
			return data[key];
		}
	}
};
Functions.prototype.extractData = function(parsedFunction){
	var fieldsToExtract = parsedFunction.extract;

	return fieldsToExtract.map(function(value) {
		return value.split(".");
	});
};

Functions.prototype.buildRequest = function(parsedFunction){

	var options = createOptionsObject(parsedFunction)
	var request
	// the place where we will store the request returned by parseDefaults
	if (Piston.baseRequest)
		var request = Piston.baseRequest

	return request.defaults(options, function(){})
};

Functions.prototype.createOptionsObject = function(parsedFunction) {
	var options = {}
	// concretar el if
	if (parsedFunction.options.length)
		return parsedFunction.options

	var excludedOptions = ['name', 'after', 'extract']
	for (var key in parsedFunction){
	 	if (excludedOptions.indexOf(key) === -1) {
	 		options[key] = parsedFunction[key]
	 	}
	}

	return options
};

Functions.prototype.parseDefaults = function(specObject) {
	return request.defaults({specObject.default})
};

module.exports = Functions;
