const
	OGMFunctions = require('../../../lib/OGMFunctions'),
	$_node = require('./$_node'),
	$_node_by_attributes = require('./$_node_by_attributes'),
	$_connectionblock = require('./$_connectionblock'),
	libFunctions = require('../../../lib/UsefulFunctions'),
	_ = require('lodash');

function Operate(input, Depth, returnMode=false, pureMode=false, Restriction=true) {

	if(Depth == undefined){
		if (Array.isArray(input)&&(input.length==2)&&(typeof input[1] == 'number')) {
			Depth = input[1];
			input = input[0];
		}else if(Array.isArray(input)&&(input.length==3)&&(typeof input[1] == 'number')&&(typeof input[2] == 'boolean')){
			returnMode = input[2];
			Depth = input[1];
			input = input[0];
		}else if(Array.isArray(input)&&(input.length==4)&&(typeof input[1] == 'number')&&(typeof input[2] == 'boolean')&&(typeof input[3] == 'boolean')){
			pureMode = input[3];
			returnMode = input[2];
			Depth = input[1];
			input = input[0];
		}else if(Array.isArray(input)&&(input.length==5)&&(typeof input[1] == 'number')&&(typeof input[2] == 'boolean')&&(typeof input[3] == 'boolean')&&(typeof input[4] == 'boolean')){
			Restriction = input[4];
			pureMode = input[3];
			returnMode = input[2];
			Depth = input[1];
			input = input[0];
		}
	}

	if (libFunctions.checkIfOGM(input)) {

		const elementMetadata = input.MetaData();
		if (elementMetadata.type=='NodeEntity'){

			let return_mode_array = [];

			let return_string = '';

			const all_neighbours_pairs_array = OGMFunctions.getDepthNeighbours(input,Depth,false,Restriction);

			all_neighbours_pairs_array.forEach((pair,index)=>{

				const {source,connection,destination} = pair;

				if (returnMode) {
					if (!_.includes(return_mode_array, OGMFunctions.getElementVariable(source))) {
						return_mode_array.push(OGMFunctions.getElementVariable(source));
					}
					if (!_.includes(return_mode_array, OGMFunctions.getElementVariable(destination))) {
						return_mode_array.push(OGMFunctions.getElementVariable(destination));
					}
				} else {

					let connectionString = $_connectionblock(connection);

					if (connection.direction=='INCOMING'){

						connectionString = '<-'+connectionString+'-';

					}else if (connection.direction=='OUTGOING'){

						connectionString = '-'+connectionString+'->';

					}else{

						connectionString = '-'+connectionString+'-';

					}

					if (!_.isUndefined(destination)) {
						if(pureMode){
							return_string += $_node_by_attributes(source)+connectionString+$_node_by_attributes(destination);	
						}else{
							return_string += $_node(source)+connectionString+$_node(destination);
						}
	
						if (index+1<all_neighbours_pairs_array.length){
							return_string += ',';
						}
					}

				}

			});

			if (returnMode) {
				return_string = return_mode_array.join();
			}

			if (return_string.charAt(return_string.length-1)==',') {
				return_string = return_string.substr(0, return_string.length-1);
			}

			return return_string;

		}

	}else throw new Error('Use an OGM object in $_depth method');

}

module.exports = Operate;