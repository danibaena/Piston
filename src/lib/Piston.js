function Piston() {
}
Piston.prototype.specParse = function(specPath){
	try{
		specFile = require(specPath);
	}
	catch (err){
		console.log("Not a valid path/Invalid file extension");
	}
	return specFile;
};
Piston.prototype.extractData = function(specFile, functionName, response){
	var array = specFile.functions.functionName.extract;
	var extractedData = {};
	array.forEach(function(value, index){
		console.log(response.value);
	});
};

// Piston.prototype.parseResponse(response); TO-DO

module.exports = Piston;