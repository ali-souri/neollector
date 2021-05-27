const
	$_node = require('./$_node'),
	$_connectionblock = require('./$_connectionblock'),
	_ = require('lodash'),
	randString = require('randomstring'),
	libFunctions = require('../../../lib/UsefulFunctions');

function Operate(input, returnMode=false){
//check if an array of nodes is considered

	if (libFunctions.checkIfOGM(input)) {
//check if return
		const elementMetadata = input.MetaData();

		if (elementMetadata.type=='NodeEntity'){

			if (returnMode) {

				let return_string = input._variable;

				if (!libFunctions.isEmpty(elementMetadata.relationships)){

					for (let propertyName in elementMetadata.relationships){

						const destinationPropertyArray = input[propertyName];
						destinationPropertyArray.forEach((destination)=>{
							return_string += ','+destination._variable;
						});

					}

				}

				return return_string;

			}

			const baseNode = $_node(input);
			const connectionAndDestinations = [];

			if (!libFunctions.isEmpty(elementMetadata.relationships)){

				_.forEach(elementMetadata.relationships,(RelationshipMetadataObject,propertyName)=>{
					//check if the relationship object is

					const destinationPropertyArray = input[propertyName];

					destinationPropertyArray.forEach((destination)=>{

						let connectionString = $_connectionblock({data:{},label:RelationshipMetadataObject.type,variable:(RelationshipMetadataObject.variable=='none')?randString.generate({length: 10, charset: 'alphabetic'}):RelationshipMetadataObject.variable});

						if (RelationshipMetadataObject.direction.toUpperCase()=='INCOMING'){

							connectionString = '<-'+connectionString+'-';

						}else if (RelationshipMetadataObject.direction.toUpperCase()=='OUTGOING'){

							connectionString = '-'+connectionString+'->';

						}else{

							connectionString = '-'+connectionString+'-';

						}
							//check if the destination is not a node
						connectionAndDestinations.push(connectionString+$_node(destination));
					});

				});

				return libFunctions.addBeforeAndCollectString(baseNode,connectionAndDestinations);

			}else{
				return baseNode;
			}
		}else if (elementMetadata.type=='RelationshipEntity'){

		}
	}else throw new Error('Use an OGM object in $_deep method');
}

module.exports = Operate;