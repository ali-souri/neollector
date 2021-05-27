'use strict';

//has tools for CQL queries

const
	libFunctions = require('../lib/UsefulFunctions'),
	randString = require('randomstring'),
	_ = require('lodash'),
	Process = require('../core/process/ProcessHandler'),
	OGMlib = require('./lib');


class Model {

	constructor() {
		this._systematic_position_name = 'OGM_Object';
		this.__id = libFunctions.generateId();
		this.__variable = randString.generate({
			length: 10,
			charset: 'alphabetic'
		});
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
		return OGMlib.ProvideDynamicMetaData(this);
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
		const forbiddenMetaData = ['_systematic_position_name', '__variable', '_MetaData'];
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

}

module.exports = Model;