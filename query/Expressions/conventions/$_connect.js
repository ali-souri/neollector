const
	libFunctions = require('../../../lib/UsefulFunctions');

function Operate(inputs){

	const node_array = inputs[0];
	const connection = inputs[1];

	const source_node = node_array[0];
	const destination_node = node_array[1];


	let source_variable = source_node;
	let source_label = '';
	let source_data = '';

	if (typeof source_node != 'string'){
		const source_info = libFunctions.getSchemaData(source_node);
		source_data = source_info.data;
		source_data = libFunctions.ObjectStringify(source_data);
		source_label = source_info.label;
		if (source_label === undefined){
			source_label = '';
		}
		else
			source_label = ':' + source_label;
		source_variable = source_info.variable;
	}


	let destination_variable = destination_node;
	let destination_label = '';
	let destination_data = '';

	if (typeof destination_node != 'string') {
		const destination_info = libFunctions.getSchemaData(destination_node);
		destination_data = destination_info.data;
		destination_data = libFunctions.ObjectStringify(destination_data);
		destination_label = destination_info.label;
		if (destination_label === undefined) {
			destination_label = '';
		}
		else
			destination_label = ':' + destination_label;
		  destination_variable = destination_info.variable;
	}


	let connection_variable = connection;
	let connection_label = '';
	let connection_data = '';

	if (typeof connection != 'string') {
		const connection_info = libFunctions.getSchemaData(connection);
		connection_data = connection_info.data;
		connection_data = libFunctions.ObjectStringify(connection_data);
		connection_label = connection_info.label;
		if (connection_label === undefined) {
			connection_label = '';
		}
		else
			connection_label = ':' + connection_label;
		connection_variable = connection_info.variable;
	}

	const template = `(${source_variable || ''}${source_label} ${source_data || ''})-[${connection_variable || ''}${connection_label} ${connection_data || ''}]->(${destination_variable || ''}${destination_label} ${destination_data || ''})`;

	return template;

}

module.exports = Operate;