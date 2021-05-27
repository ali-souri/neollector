const
	libFunctions = require('../../lib/UsefulFunctions');

function COUNT(input){
	let variable;
	if (typeof input == 'string'){
		variable = input;
	} else if (libFunctions.checkIfSchema(input)){
		variable = input.variable;
	} else {
		throw new Error('There Is No Available Variable');
	}
	return ` COUNT(${variable}) `;
}

module.exports = COUNT;