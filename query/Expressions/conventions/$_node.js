const
	libFunctions = require('../../../lib/UsefulFunctions');

function Operate(inputs){
//check if an array of nodes is considered
	let {data, label, variable} = libFunctions.getSchemaData(inputs);

	if (label == undefined){
		label = '';
	}
	else
		label = ':' + label;

	data = libFunctions.ObjectStringify(data);

	const template = `( ${variable || ''}${label} ${data || ''} )`;

	return template;

}

module.exports = Operate;