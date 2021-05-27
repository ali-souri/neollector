const
	_ = require('lodash'),
	libFunctions = require('../../lib/UsefulFunctions'),
	QueryMethods = require('./conventions/conventions');

// like string , normal array of objects , schema for inputs
// then special functions for working on objects or other types of data like :
// $_connection , $_gth , $_lth , (math function series like $_sqrt , $_abs and other kind of functions) , maybe( $_node , $_foreach )

function Parse(values, methodName){
	if (_.isArray(values)){
		let return_array = [];
		_.forEach(values, (value) => {
			if(_.isArray(value)){
				_.forEach(value , (deepValue) => {
					return_array.push(handleObjectValue(deepValue, methodName));
				});
			}else {
				return_array.push(handleObjectValue(value, methodName));
			}
		});
		return collectValues(return_array);
	} else if (values instanceof Object){
		return handleObjectValue(values, methodName);
	} else if (typeof values == 'string'){
		return values;
	} else if (values == undefined) {
		return '';
	}
}

function collectValues(values){
	if (libFunctions.isStringArray(values)){
		let return_string = '';
		let index = 1;
		_.forEach(values, (value) => {
			return_string += value;
			if (index < values.length){
				return_string += ' , ';
			}
			index++;
		});
		return return_string;
	} 
}

/**
 *
 * @param value
 * @param methodNamed
 * @returns {*}
 */
function handleObjectValue(value, methodNamed){
	if ((typeof value == 'string')||(typeof value == 'number')) {
		return value;
	}else if (libFunctions.checkIfInCommon(value ,QueryMethods)){
		if (methodNamed == 'RETURN'){
			if (value.hasOwnProperty('$_deep')) {
				return QueryMethods.$_deep(value.$_deep,true);
			}
			if (value.hasOwnProperty('$_depth')) {
				return QueryMethods.$_depth(value.$_depth[0],value.$_depth[1],true,false,value.$_depth[2]);
			}
			return value.variable;
		} else {
			const inCommonKeys = libFunctions.getInCommons(value ,QueryMethods);
			let index = 1;
			let queryString = '';
			for (let functionName of inCommonKeys) {
				queryString += QueryMethods[functionName](value[functionName]);
				if (index < inCommonKeys.length) {
					queryString += ' , ';
				}
				index++;
			}
			return queryString;
		}
	} else if (libFunctions.checkIfSchema(value)){
		if (methodNamed == 'RETURN'){
			return value.variable;
		} else if (methodNamed == 'DELETE') {
			return value.variable;
		} else if (value.TYPE == 'node') {
			return QueryMethods.$_node(value);
		}
	} else if(libFunctions.checkIfOGM(value)){
		if (methodNamed == 'RETURN'){

			if (value.__staticMetaData!=undefined) {
				return value.__staticMetaData.variable;
			}
			return value._variable;
		} else {
			const metadata = (value.__staticMetaData!=undefined) ? value.__staticMetaData : value.MetaData();
			if (metadata.type == 'NodeEntity') {
				return QueryMethods.$_node(value);
			} else if(metadata.type == 'RelationshipEntity'){
				//probably throw some error
			}
		}
	} else if (value instanceof Object){
		if (methodNamed == 'RETURN'){
			if (value.hasOwnProperty('$_deep')) {
				return QueryMethods.$_deep(value,true);
			}
			return value.variable;
		} else {
			return QueryMethods.$_node(value);
		}
	}
}


module.exports = {
	Parse,
};

