const
	libFunctions = require('../../lib/UsefulFunctions');

function id(input){
	let variable;
	if (typeof input == 'string'){
		variable = input;
	} else if (libFunctions.checkIfSchema(input)){
		variable = input.variable;
	} else {
		throw new Error('There Is No Available Variable');
	}
	return ` id(${variable}) `;
}

module.exports = id;