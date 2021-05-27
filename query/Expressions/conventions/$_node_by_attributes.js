const
	_ = require('lodash');
	libFunctions = require('../../../lib/UsefulFunctions');

function Operate(inputs){
//check if an array of nodes is considered
	if (_.isUndefined(inputs)) {
		return '';
	}

	let {data, label, variable} = libFunctions.getSchemaData(inputs);

	if (label == undefined){
		label = '';
	}
	else
        label = ':' + label;
		
	if(data!=undefined){
		delete data.__id;
    	delete data._id;

		data = libFunctions.ObjectStringify(data);
	}

	const template = `( ${variable || ''}${label} ${data || ''} )`;

	return template;

}

module.exports = Operate;