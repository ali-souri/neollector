'use strict';

const
	libFunctions = require('../lib/UsefulFunctions'),
	_ = require('lodash'),
	randString = require('randomstring'),
	core = require('../core');

const
	allowedTypes = ['node', 'connection'],
	preReservedAtts = ['NeoID', 'builtMetaData', 'variable', 'systematic_position_name', 'data', 'TYPE', 'ID', 'label', 'Fields', 'MetaData', 'validation'];


const schema = class {

	constructor(MetaData, Input){
		this._systematic_position_name = 'ORM_SCHEMA';
		this._fields = Input;
		this._metaData = MetaData;
		this._id = libFunctions.generateId();
		this._NeoID = undefined;
		this._fields.id = this._id;
		this._label = (this._metaData.hasOwnProperty('label')) ? this._metaData.label : undefined;
		this._type = (this._metaData.hasOwnProperty('type')) ? ((_.includes(allowedTypes, this._metaData.type)) ? this._metaData.type : undefined)  : 'node';
		this._variable = (this._metaData.hasOwnProperty('variable')) ? this._metaData.variable : randString.generate({length: 10, charset: 'alphabetic'});
		if (this._type === undefined) throw new Error ('the type is not valid');
		this._data = {};
		this._validation = false;
		this._builtMetaData = {};
	}

	get NeoID() {
		return this._NeoID;
	}

	set NeoID(value) {
		this._NeoID = value;
	}

	get builtMetaData() {
		return this._builtMetaData;
	}

	set builtMetaData(value) {
		this._builtMetaData = value;
	}

	get variable() {
		return this._variable;
	}

	set variable(value) {
		this._variable = value;
	}

	get systematic_position_name() {
		return this._systematic_position_name;
	}

	get data() {
		return this._data;
	}

	set data(value) {
		this._data = value;
	}

	get TYPE() {
		return this._type;
	}

	set TYPE(value) {
		this._type = value;
	}

	get ID() {
		return this._id;
	}

	set ID(value) {
		this._id = value;
	}

	get __id() {
		return this._id;
	}

	set __id(value) {
		this._id = value;
	}

	get label() {
		return this._label;
	}

	set label(value) {
		this._label = value;
	}

	get Fields() {
		return this._fields;
	}

	set Fields(value) {
		this._fields = value;
	}

	get MetaData() {
		return this._metaData;
	}

	set MetaData(value) {
		this._metaData = value;
	}

	get validation() {
		return this._validation;
	}

	set validation(value) {
		this._validation = value;
	}

	build(data){
		const clone = _.clone(this);
		clone._data = data;
		clone._validation = libFunctions.NeoValidate(clone._fields, clone._data);
		clone._builtMetaData = {variable: clone._variable, label:clone._label};
		const cloneProxy = new Proxy(clone , {
			get: (target, name) => {
				if (typeof target[name] == 'function'){
					return function(){
						return target[name].apply(target, arguments);
					}
				}
				if (_.includes(preReservedAtts, name)) {
					return target[name];
				}else{
					return target.data[name];
				}
			},
			set: (target, name, value) => {
				if (_.includes(preReservedAtts, name)) {
					target[name] = value;
					return true;
				}else{
					target.data[name] = value;
					return true;
				}
			}
		});
		cloneProxy['__id'] = this.ID;
		return cloneProxy;
	}

	async save(){
		if (this._label === undefined) throw new Error('The Object Label is not defined');
		if (!this._validation) throw new Error('The Object is not built');
		this._NeoID = await core.save(this);
		return this;
	}

	async readByID(){
		if (this._label === undefined) throw new Error('The Object Label is not defined');
		if (!this._validation) throw new Error('The Object is not built');
		return await core.simpleReadbyID(this);
	}

	async readAll(){
		if (this._label === undefined) throw new Error('The Object Label is not defined');
		if (!this._validation) throw new Error('The Object is not built');
		return await core.simpleAllRead(this);
	}

	async read(){
		if (this._label === undefined) throw new Error('The Object Label is not defined');
		if (!this._validation) throw new Error('The Object is not built');
		return await core.simpleRead(this);
	}

	async delete(){
		if (this._label === undefined) throw new Error('The Object Label is not defined');
		if (!this._validation) throw new Error('The Object is not built');
		return await core.simpleDelete(this);
	}

};

module.exports = schema;