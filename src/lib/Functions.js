function Functions() {
}
Functions.prototype.parseFunctions = function(specObject, functionName){
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

module.exports = Functions;