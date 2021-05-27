const
	libFunctions = require('./UsefulFunctions'),
	// schemaFunctions = require('./SchemaFunctions'),
	randString = require('randomstring'),
	// $_node = require('../query/Expressions/conventions/$_node'),
	$_node_by_variable = require('../query/Expressions/conventions/$_node_by_variable'),
	$_connectionblock = require('../query/Expressions/conventions/$_connectionblock'),
	Process = require('../core/process/ProcessHandler'),
	_ = require('lodash');

	/*
 {
  address: '/home/ali/project/Neolector/devtest/system/testmodel2.js',
  target: 'TestModel2',
  label: 'SModel',
  obj_name: 'TestModel2',
  type: 'NodeEntity',
  variable: 'ErDebrZjXw',
  collections: [],
  properties: {
    name: { type: 'string', optional: true },
    at2: { type: 'string', optional: true }
  },
  relationships: {
    at3: {
      type: 'Related',
      model: 'tm3',
      direction: 'OUTGOING',
      variable: 'none'
    }
  }
}

	*/

let raw_pairs = [];

let elements = [];

function getElementMetaData(element){
	let metadata = undefined;
	if (element.MetaData!=undefined){
		metadata = element.MetaData();
	} else {
		if (element.__staticMetaData!=undefined){
			metadata = element.__staticMetaData;
		} else {
			return element;
		}
	}
	return metadata;
}

function getElementVariable(element){
	if (_.isUndefined(element)) {
		return;
	}
	let metadata = undefined;
	if (element._variable!=undefined){
		metadata = element._variable;
	} else if (element.__variable!=undefined){
		metadata = element.__variable;
	} else {
		if (element.__staticMetaData!=undefined&&element.__staticMetaData.variable!=undefined){
			metadata = element.__staticMetaData.variable;
		} else {
			return element.variable;
		}
	}
	return metadata;
}

function getInvolvedNeighbours(element, returnMode=false) {

		const elementMetadata = element.MetaData();

		if (elementMetadata.type=='NodeEntity'){

			if (returnMode) {

				let return_string = element._variable;

				if (!libFunctions.isEmpty(elementMetadata.relationships)){

					for (let propertyName in elementMetadata.relationships){

						const destinationPropertyArray = element[propertyName];
						destinationPropertyArray.forEach((destination)=>{
							return_string += ','+destination._variable;
						});

					}

				}

				return return_string;

			}

			const connectionAndDestinations = [];

			if (!libFunctions.isEmpty(elementMetadata.relationships)){

				_.forEach(elementMetadata.relationships,(RelationshipMetadataObject,propertyName)=>{

					const destinationPropertyArray = element[propertyName];

					destinationPropertyArray.forEach((destination)=>{

						connectionAndDestinations.push({
							connection: {data:{},label:RelationshipMetadataObject.type,variable:(RelationshipMetadataObject.variable=='none')?randString.generate({length: 10, charset: 'alphabetic'}):RelationshipMetadataObject.variable},
							destination: destination
						});

					});

				});

			}

			return connectionAndDestinations;

		}

}

function getRecursive_raw_pairs(element, Depth, returnMode=false, Restriction=true){
	
	// if (libFunctions.liveMode(element)) {
		// console.log('element')
		// console.log(element)

		if (_.isUndefined(element)) {
			return '';
		}

		const elementMetadata = getElementMetaData(element);

		if (elementMetadata.type=='NodeEntity'){
			
				if (returnMode) {

					let return_string = getElementVariable(element);

					if (!libFunctions.isEmpty(elementMetadata.relationships)){

						for (let propertyName in elementMetadata.relationships){

							if (libFunctions.liveMode(element)) {

								const destinationPropertyArray = element[propertyName];
								destinationPropertyArray.forEach((destination)=>{
									return_string += ','+destination._variable;
								});

							} else {
								
								const destinationArray = elementMetadata.relationships;
								_.forEach(destinationArray,(destinationObject)=>{
									if (destinationObject.type == 'Related') {
										if (Depth > 0){
											Depth--;
											const process = new Process();
											if(!Restriction){
												return_string += ',' + getRecursive_raw_pairs(process.Get(destinationObject.model),Depth,true);
											}
										}
									}
								});

							}
							
							// 	//to be continued

						}

					}

					return return_string;

				}
				
				if (!libFunctions.isEmpty(elementMetadata.relationships)){

					_.forEach(elementMetadata.relationships,(RelationshipMetadataObject,propertyName)=>{

						if (libFunctions.liveMode(element)) {
							
							const destinationPropertyArray = element[propertyName];
							
							if(element[propertyName]!=undefined&&destinationPropertyArray.length){

								destinationPropertyArray.forEach((destination)=>{

									raw_pairs.push({
										source: element,
										connection: {data:{},label:RelationshipMetadataObject.type,variable:(RelationshipMetadataObject.variable=='none')?randString.generate({length: 10, charset: 'alphabetic'}):RelationshipMetadataObject.variable,direction:RelationshipMetadataObject.direction.toUpperCase()},
										destination: destination
									});
	
									if (Depth > 0){
										Depth--;
										getRecursive_raw_pairs(destination,Depth,false,Restriction);
									}
	
								});

							}else{

								const process = new Process();
								const destinationMetaDataObject = process.Get(elementMetadata.relationships[propertyName].model);								

								if (!Restriction) {
									raw_pairs.push({
										source: element,
										connection: {data:{},label:RelationshipMetadataObject.type,variable:(RelationshipMetadataObject.variable=='none')?randString.generate({length: 10, charset: 'alphabetic'}):RelationshipMetadataObject.variable,direction:RelationshipMetadataObject.direction.toUpperCase()},
										destination: destinationMetaDataObject
									});
	
									if (Depth > 0){
										Depth--;
										getRecursive_raw_pairs(destinationMetaDataObject,Depth,false,Restriction);
									}	
								}

							}


						} else {

							const process = new Process();
							const destinationMetaDataObject = process.Get(RelationshipMetadataObject.model);
							raw_pairs.push({
								source: element,
								connection: {data:{},label:RelationshipMetadataObject.type,variable:(RelationshipMetadataObject.variable=='none')?randString.generate({length: 10, charset: 'alphabetic'}):RelationshipMetadataObject.variable,direction:RelationshipMetadataObject.direction.toUpperCase()},
								destination: destinationMetaDataObject
							});

							if (Depth > 0){
								Depth--;
								getRecursive_raw_pairs(destinationMetaDataObject,Depth);
							}

						}

					});

				}

			}

	// } else {
	//
	// 	const elementMetadata = element.__staticMetaData;
	//
	// 	if (elementMetadata.type=='NodeEntity'){
	//
	// 		if (returnMode) {
	//
	// 		}
	//
	//
	//
	// 	}
	//
	// }

}

function getDepthNeighbours(element, Depth, returnMode=false, Restriction=true){

	raw_pairs = [];

	getRecursive_raw_pairs(element,Depth,returnMode,Restriction);

	return raw_pairs;

}

function getRecursive_pairs_and_list(element, Depth, returnMode=false){

		const elementMetadata = getElementMetaData(element);
	
		libFunctions.addToArrayUnique(elements,element);

		if(Depth==0){
			return;
		}

		if (elementMetadata.type=='NodeEntity'){

				if (returnMode) {

					let return_string = getElementVariable(element);

					if (!libFunctions.isEmpty(elementMetadata.relationships)){

						for (let propertyName in elementMetadata.relationships){

							if (libFunctions.liveMode(element)) {

								const destinationPropertyArray = element[propertyName];
								destinationPropertyArray.forEach((destination)=>{
									return_string += ','+destination._variable;
								});

							} else {
								
								const destinationArray = elementMetadata.relationships;
								_.forEach(destinationArray,(destinationObject)=>{
									if (destinationObject.type == 'Related') {
										if (Depth > 0){
											Depth--;
											const process = new Process();
											return_string += ',' + getRecursive_pairs_and_list(process.Get(destinationObject.model),Depth,true);
										}
									}
								});

							}
							
							// 	//to be continued

						}

					}

					return return_string;

				}

				if (!libFunctions.isEmpty(elementMetadata.relationships)){

					_.forEach(elementMetadata.relationships,(RelationshipMetadataObject,propertyName)=>{

						if (libFunctions.liveMode(element)) {
							
							const destinationPropertyArray = element[propertyName];

							if(element[propertyName]!=undefined&&destinationPropertyArray.length){

								destinationPropertyArray.forEach((destination)=>{

									raw_pairs.push({
										source: element,
										connection: {data:{},label:RelationshipMetadataObject.type,variable:(RelationshipMetadataObject.variable=='none')?randString.generate({length: 10, charset: 'alphabetic'}):RelationshipMetadataObject.variable,direction:RelationshipMetadataObject.direction.toUpperCase()},
										destination: destination
									});

									libFunctions.addToArrayUnique(elements,destination);
									if (Depth > 0){
										Depth--;
										getRecursive_pairs_and_list(destination,Depth);
									}

								});
							}

						} else {

							const process = new Process();
							const destinationMetaDataObject = process.Get(RelationshipMetadataObject.model);
							raw_pairs.push({
								source: element,
								connection: {data:{},label:RelationshipMetadataObject.type,variable:(RelationshipMetadataObject.variable=='none')?randString.generate({length: 10, charset: 'alphabetic'}):RelationshipMetadataObject.variable,direction:RelationshipMetadataObject.direction.toUpperCase()},
								destination: destinationMetaDataObject
							});

							libFunctions.addToArrayUnique(elements,destinationMetaDataObject);
							if (Depth > 0){
								Depth--;
								getRecursive_pairs_and_list(destinationMetaDataObject,Depth);
							}

						}

					});

				}

			}

}

function getDepthPairsAndList(element, Depth, returnMode=false){

	elements = [];
	raw_pairs = [];

	getRecursive_pairs_and_list(element,Depth,returnMode);

	return {elements:elements,save_pairs:raw_pairs};

}

function make_pair_query_sequence_part(pairs,returnMode=false){

	let return_mode_array = [];

			let return_string = '';

			pairs.forEach((pair,index)=>{

				const {source,connection,destination} = pair;

				if (returnMode) {
					if (!_.includes(return_mode_array, getElementVariable(source))) {
						return_mode_array.push(getElementVariable(source));
					}
					if (!_.includes(return_mode_array, getElementVariable(destination))) {
						return_mode_array.push(getElementVariable(destination));
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

					return_string += $_node_by_variable(source)+connectionString+$_node_by_variable(destination);

					if (index+1<pairs.length){
						return_string += ',';
					}

				}

			});

			if (returnMode) {
				return_string = return_mode_array.join();
			}

			return return_string;

}

module.exports = {
	getInvolvedNeighbours,
	getDepthNeighbours,
	raw_pairs,
	getElementVariable,
	getDepthPairsAndList,
	make_pair_query_sequence_part,
};