const
	libFunctions = require('../../../lib/UsefulFunctions');

function Operate(inputs){
	
	let {variable} = libFunctions.getSchemaData(inputs);

	const template = `(${variable || ''})`;

	return template;

}

module.exports = Operate;