'use strict';

const
 path = require('path'),
 randString = require('randomstring'),
 annotations = require('conga-annotations'),
 OGMModel = require('./Model'),
 _ = require('lodash'),
 libFunctions = require('../lib/UsefulFunctions'),
 Process = 	require('../core/process/ProcessHandler');


function provideMetaData(obj, address){

	let temp_registered_metadata = {};

	const registry = new annotations.Registry();

	registry.registerAnnotation(path.join(__dirname, '../core/annotation/Entity'));
	registry.registerAnnotation(path.join(__dirname, '../core/annotation/NodeEntity'));
	registry.registerAnnotation(path.join(__dirname, '../core/annotation/RelationshipEntity'));
	registry.registerAnnotation(path.join(__dirname, '../core/annotation/StartNode'));
	registry.registerAnnotation(path.join(__dirname, '../core/annotation/EndNode'));
	registry.registerAnnotation(path.join(__dirname, '../core/annotation/Relationship'));
	registry.registerAnnotation(path.join(__dirname, '../core/annotation/Property'));
	registry.registerAnnotation(path.join(__dirname, '../core/annotation/Id'));

	const reader = new annotations.Reader(registry);

	const children_array = obj.MetaInfo().children;
	children_array.forEach((child)=>{
		reader.parse(address || child.id);
		const definitionAnnotations = reader.definitionAnnotations;
		const propertyAnnotations = reader.propertyAnnotations;
		definitionAnnotations.forEach((annotation)=>{
			if (annotation.constructor.name === 'NodeEntity'){
				if (annotation.target == obj.name) {
					const meta_data_object = {};
					meta_data_object['address'] = address || child.id;
					meta_data_object['target'] = annotation.target;
					meta_data_object['label'] = annotation.label;
					meta_data_object['obj_name'] = obj.name;
					meta_data_object['type'] = 'NodeEntity';
					meta_data_object['variable'] = randString.generate({length: 10, charset: 'alphabetic'});
					meta_data_object['collections'] = annotation.collections;
					const meta_property_object = {};
					const meta_relationship_object = {};
					propertyAnnotations.forEach((annotation_1) => {
						if (annotation_1.constructor.name === 'Property'){
							meta_property_object[annotation_1.target] = {type:annotation_1.type,optional:annotation_1.optional};
						} else if (annotation_1.constructor.name === 'Relationship') {
							meta_relationship_object[annotation_1.target] = {type:annotation_1.type,model:annotation_1.model,direction:annotation_1.direction,variable:annotation_1.variable};
						}
					});
					meta_data_object['properties'] = meta_property_object;
					meta_data_object['relationships'] = meta_relationship_object;
					temp_registered_metadata = meta_data_object;
					obj._MetaData = meta_data_object;
				}
			} else if (annotation.constructor.name === 'RelationshipEntity'){
				if (annotation.target == obj.name) {
					const meta_data_object = {};
					meta_data_object['address'] = address || child.id;
					meta_data_object['target'] = annotation.target;
					meta_data_object['label'] = annotation.label;
					meta_data_object['obj_name'] = obj.name;
					meta_data_object['type'] = 'RelationshipEntity';
					meta_data_object['variable'] = randString.generate({length: 10, charset: 'alphabetic'});
					meta_data_object['collections'] = annotation.collections;
					const meta_property_object = {};
					const meta_startnode_object = {};
					const meta_endnode_object = {};
					propertyAnnotations.forEach((annotation_1) => {
						if (annotation_1.constructor.name === 'Property'){
							meta_property_object[annotation_1.target] = {type:annotation_1.type,optional:annotation_1.optional};
						} else if (annotation_1.constructor.name === 'StartNode') {
							meta_startnode_object[annotation_1.target] = {model:annotation_1.model};
						} else if (annotation_1.constructor.name === 'EndNode') {
							meta_endnode_object[annotation_1.target] = {model:annotation_1.model};
						}
					});
					meta_data_object['properties'] = meta_property_object;
					meta_data_object['startnode'] = meta_startnode_object;
					meta_data_object['endnode'] = meta_startnode_object;
					temp_registered_metadata = meta_data_object;
					obj._MetaData = meta_data_object;
				}
			}
		});
	});
	return temp_registered_metadata;
}

function ProvideDynamicMetaData(obj, address){

	const processHandler = new Process();
	const processMappedData = processHandler.ReadMapped();
	if(processMappedData.hasOwnProperty(obj.constructor.name)){
		return processHandler.Get(processHandler.GetMapped(obj.constructor.name));
	}

	let temp_registered_metadata = {};

	const registry = new annotations.Registry();

	registry.registerAnnotation(path.join(__dirname, '../core/annotation/Entity'));
	registry.registerAnnotation(path.join(__dirname, '../core/annotation/NodeEntity'));
	registry.registerAnnotation(path.join(__dirname, '../core/annotation/RelationshipEntity'));
	registry.registerAnnotation(path.join(__dirname, '../core/annotation/StartNode'));
	registry.registerAnnotation(path.join(__dirname, '../core/annotation/EndNode'));
	registry.registerAnnotation(path.join(__dirname, '../core/annotation/Relationship'));
	registry.registerAnnotation(path.join(__dirname, '../core/annotation/Property'));
	registry.registerAnnotation(path.join(__dirname, '../core/annotation/Id'));

	const reader = new annotations.Reader(registry);

	const children_array = obj.DynamicMetaInfo().children;
	children_array.forEach((child)=>{
		reader.parse(address || child.id);
		const definitionAnnotations = reader.definitionAnnotations;
		const propertyAnnotations = reader.propertyAnnotations;
		definitionAnnotations.forEach((annotation)=>{
			if (annotation.constructor.name === 'NodeEntity'){
				if (annotation.target == obj.constructor.name) {
					const meta_data_object = {};
					meta_data_object['address'] = address || child.id;
					meta_data_object['target'] = annotation.target;
					meta_data_object['label'] = annotation.label;
					meta_data_object['obj_name'] = obj.constructor.name;
					meta_data_object['type'] = 'NodeEntity';
					meta_data_object['variable'] = obj._variable;
					meta_data_object['collections'] = annotation.collections;
					const meta_property_object = {};
					const meta_relationship_object = {};
					propertyAnnotations.forEach((annotation_1) => {
						if (annotation_1.constructor.name === 'Property'){
							meta_property_object[annotation_1.target] = {type:annotation_1.type,optional:annotation_1.optional};
						} else if (annotation_1.constructor.name === 'Relationship') {
							meta_relationship_object[annotation_1.target] = {type:annotation_1.type,model:annotation_1.model,direction:annotation_1.direction,variable:annotation_1.variable};
						}
					});
					meta_data_object['properties'] = meta_property_object;
					meta_data_object['relationships'] = meta_relationship_object;
					temp_registered_metadata = meta_data_object;
					obj._MetaData = meta_data_object;
				}
			} else if (annotation.constructor.name === 'RelationshipEntity'){
				if (annotation.target == obj.constructor.name) {
					const meta_data_object = {};
					meta_data_object['address'] = address || child.id;
					meta_data_object['target'] = annotation.target;
					meta_data_object['label'] = annotation.label;
					meta_data_object['obj_name'] = obj.constructor.name;
					meta_data_object['type'] = 'RelationshipEntity';
					meta_data_object['variable'] = obj._variable;
					meta_data_object['collections'] = annotation.collections;
					const meta_property_object = {};
					const meta_startnode_object = {};
					const meta_endnode_object = {};
					propertyAnnotations.forEach((annotation_1) => {
						if (annotation_1.constructor.name === 'Property'){
							meta_property_object[annotation_1.target] = {type:annotation_1.type,optional:annotation_1.optional};
						} else if (annotation_1.constructor.name === 'StartNode') {
							meta_startnode_object[annotation_1.target] = {model:annotation_1.model};
						} else if (annotation_1.constructor.name === 'EndNode') {
							meta_endnode_object[annotation_1.target] = {model:annotation_1.model};
						}
					});
					meta_data_object['properties'] = meta_property_object;
					meta_data_object['startnode'] = meta_startnode_object;
					meta_data_object['endnode'] = meta_startnode_object;
					temp_registered_metadata = meta_data_object;
					obj._MetaData = meta_data_object;
				}
			}
		});
	});
	return temp_registered_metadata;
}

function MakeSchemaOGM(graph_schema){

	// let OGMDynamicClass = class extends OGMModel {
	const output_object = {};
	// output_object[graph_schema._root_title] = class extends OGMModel {
	output_object[graph_schema._root_title] = class {

		constructor(fields){
			// super();
			this._systematic_position_name = 'OGM_Object';
			this.__id = libFunctions.generateId();
			this.__variable = randString.generate({
				length: 10,
				charset: 'alphabetic'
			});
			if (!_.isEmpty(fields)) {
				_.forEach(graph_schema.getRootRelationshipsNames(), (value) => {
					this[value] = [];
				});
				_.forEach(graph_schema.getRootPropertyNames(), (value) => {
					this[value] = '';
				});
				_.forEach(fields, (value, key) => {
					this[key] = value;
				});
			}
			this.__graphschema = graph_schema;
		}

		get _id() {
			return this.__id;
		}
	
		set _id(value) {
			this.__id = value;
		}
	
		get _variable() {
			return this.__variable;
		}
	
		set _variable(value) {
			this.__variable = value;
		}
	
		get systematic_position_name() {
			return this._systematic_position_name;
		}
	
		MetaData() {
			return this.__graphschema.internalRootSchemaMetaData();
		}
	
		GetRelationshipsMetadata() {
			return this.MetaData().relationships;
		}
	
		GetRelationships() {
			const return_object = {};
			_.forEach(this.GetRelationshipsMetadata(), (relation_values, property_name) => {
				if (return_object.hasOwnProperty(property_name)) {
					return_object[property_name].concat(this[property_name]);
				} else {
					return_object[property_name] = this[property_name];
				}
			});
			return return_object;
		}
	
		static MetaInfo() {
			return require.main;
		}
	
		DynamicMetaInfo() {
			return require.main;
		}
	
		static INFO() {
			return {
				systematic_position_name: 'OGM_Object'
			};
		}
	
		_INFO() {
			return {
				systematic_position_name: 'OGM_Object'
			};
		}
	
		_data() { //make it dynamic for name of properties
			const keys = Object.getOwnPropertyNames(this);
			const data_object = {};
			const forbiddenMetaData = ['_systematic_position_name', '__variable', '_MetaData', '__graphschema'];
			_.forEach(keys, (key) => {
				if (!_.includes(forbiddenMetaData, key)) {
					if (!this._checkIncludeOtherObject(key)) {
						data_object[key] = this[key];
					}
				} else {
					if (key == '__id') {
						data_object['_id'] = this.__id;
					}
				}
			});
			return data_object;
		}
	
		_checkIncludeOtherObject(key) {
			const metadata = this.MetaData();
			if (metadata.type == 'NodeEntity') {
				return _.includes(_.keys(metadata.relationships), key)
			}
		}
	
		getType() {
			return (this.MetaData().type == 'NodeEntity') ? 'node' : 'relationship';
		}
	
		static getType() {
			return (this.__staticMetaData.type == 'NodeEntity') ? 'node' : 'relationship';
		}
	
		refillData(data) {
			_.forEach(data, (value, key) => {
				this[key] = value;
			});
		}

	};
	
	return output_object

}

module.exports = {
	provideMetaData,
	ProvideDynamicMetaData,
	MakeSchemaOGM,
};