function Piston() {
}
Piston.prototype.parseSpec = function(specPath){
	return require(specPath);
};
Piston.prototype.parseFunction = function(specObject){
	;
};
Piston.prototype.extractData = function(specFile, functionName, response){
	var fieldsToExtract = specFile.functions[functionName].extract;

	return fieldsToExtract.map(function(value) {
		return value.split(".");
	});
};

module.exports = Piston;