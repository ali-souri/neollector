const
	uuidv1 = require('uuid/v1'),
	Validator = require('jsonschema').Validator,
	v = new Validator(),
	_ = require('lodash');

function generateId() { //need rewrite
	const id = uuidv1();
	return id;
}

function NeoValidate(schema, data) {
	schema.properties["__id"] = {type: 'string'};
	if (v.validate(data, schema).valid) return true;
	else throw new Error('the object does not match the schema');
}

function isStringArray(input_array) {
	let return_value = true;
	_.forEach(input_array, (value) => {
		return_value &= (typeof value == 'string');
	});
	return return_value;
}

function addToArrayUnique(array, value) {
	if (array.indexOf(value) === -1) {
		array.push(value);
	}
}

function checkIfInCommon(obj1, obj2) {
	for (let key1 in obj1) {
		if (key1 in obj2) return true;
	}
	return false;
}

function checkIfSchema(obj) {
	if (obj.hasOwnProperty('_systematic_position_name')) {
		if (obj.systematic_position_name == 'ORM_SCHEMA') {
			if (!obj.validation) throw new Error('The Object is not built');
			return true;
		}
	} else {
		return false;
	}
}

function checkIfOGM(obj) {
	if (typeof obj._INFO == 'function') {
		if (obj._INFO().systematic_position_name == 'OGM_Object') {
			return true;
		}
	} else if (obj.__staticMetaData != undefined && obj._systematic_position_name == 'OGM_Object') {
		return true;
	}
	return false;
}

function getInCommons(obj1, obj2) {
	let inCommons = [];
	for (let key1 in obj1) {
		if (key1 in obj2) inCommons.push(key1);
	}
	return inCommons;
}

function getSchemaData(obj) {
	if (obj.hasOwnProperty('_systematic_position_name')) {
		if (obj.systematic_position_name == 'ORM_SCHEMA') {
			if (!obj.validation) throw new Error('The Object is not built');
			return {
				data: obj.data,
				label: obj.builtMetaData.label,
				variable: obj.variable,
				type: obj.TYPE
			};
		} else if (obj._systematic_position_name == 'OGM_Object') {
			if (obj.__staticMetaData != undefined) {
				return {
					data: undefined,
					label: obj.__staticMetaData.label,
					variable: obj.__staticMetaData.variable,
					type: obj.__staticMetaData.type
				};
			}
			return {
				data: obj._data(),
				label: obj.MetaData().label,
				variable: obj._variable,
				type: obj.getType()
			};
		}
	} else if (this.isAnnotationObject(obj)) {
		return {
			data: undefined,
			label: obj.label,
			variable: obj.variable,
			type: obj.type
		};
	} else  {
		return {
			data: obj.data || obj,
			label: obj.label,
			variable: obj.variable,
			type: obj.TYPE
		};
	}
}

function getVariable(obj) {
	if (obj.hasOwnProperty('_systematic_position_name')) {
		if (obj.systematic_position_name == 'ORM_SCHEMA') {
			if (!obj.validation) throw new Error('The Object is not built');
			return  obj.variable;
		} else if (obj._systematic_position_name == 'OGM_Object') {
			if (obj.__staticMetaData != undefined) {
				return obj.__staticMetaData.variable;
			}
			return obj._variable;
		}
	} else if (this.isAnnotationObject(obj)) {
		return obj.variable;
	} else  {
		return obj.variable;
	}
}

function ObjectStringify(obj) {
	if (obj == undefined || JSON.stringify(obj) == undefined) return "";
	return JSON.stringify(obj).replace(/\"([^(\")"]+)\":/g, "$1:");
}

function isEmpty(obj) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key))
			return false;
	}
	return true;
}

function addBeforeAndCollectString(before, collection) {
	let return_string = '';
	collection.forEach((str, index) => {
		return_string += before + str;
		if (index + 1 < collection.length) {
			return_string += ',';
		}
	});
	return return_string;
}

function breakeDownIterateByElement(input_array, element) {
	const output_array = [];
	let iteration_array = [];
	input_array.forEach((arrayElement) => {
		if (arrayElement === element) {
			if (output_array.length != 0) {
				output_array.push(iteration_array);
			}
			iteration_array = [element];
		} else {
			iteration_array.push(arrayElement);
		}
	});
	return output_array;
}

function liveMode(OGMObject) {
	return (OGMObject.__staticMetaData == undefined);
}

function deadMode(OGMObject) {
	return (OGMObject.__staticMetaData != undefined);
}

function annotationMode(OGMObject) {
	return (OGMObject instanceof Object)&&(OGMObject.hasOwnProperty('type'))&&(OGMObject.hasOwnProperty('model'))&&(OGMObject.hasOwnProperty('variable'));
}

function isAnnotationObject(OGMObject) {
	return (OGMObject instanceof Object)&&(OGMObject.hasOwnProperty('address'))&&(OGMObject.hasOwnProperty('target'))&&(OGMObject.hasOwnProperty('variable'))&&(OGMObject.hasOwnProperty('label'))&&(OGMObject.hasOwnProperty('relationships'));
}

function object_size(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function schemaDataCorrection(schema_data){
	_.forEach(schema_data,(value, key)=>{
		if(typeof value == 'object' && value.hasOwnProperty('low') && typeof value.low == 'number' && value.hasOwnProperty('high') && typeof value.high == 'number'){
			schema_data[key] = value.low;
		}
	});
	return schema_data;
}


module.exports = {
	generateId,
	NeoValidate,
	isStringArray,
	checkIfInCommon,
	checkIfOGM,
	getInCommons,
	getSchemaData,
	checkIfSchema,
	ObjectStringify,
	isEmpty,
	addBeforeAndCollectString,
	liveMode,
	deadMode,
	annotationMode,
	breakeDownIterateByElement,
	isAnnotationObject,
	addToArrayUnique,
	getVariable,
	object_size,
	schemaDataCorrection,
};