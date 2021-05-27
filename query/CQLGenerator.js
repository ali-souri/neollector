const
	_ = require('lodash'),
	// generalModel = require('./OperationalModel').GeneralModel,
	generalPhrase = require('./OperationalModel').GeneralPhrase,
	Expressions = require('./Expressions');


let predefined_methods = ['end', 'match', 'return', 'create', 'order_by', 'acs', 'limit', 'with', 'as', 'list', 'where', 'merge', 'on', 'set', 'delete', 'detach'];

// let special_methods = ['end', 'order_by', 'list'];

const CQLGenerator = class {

	constructor(Model = {}) {
		this._dynamicElements = [];
		this._Model = Model;
		this._systematic_position_name = 'ORM_CQL_G';

		predefined_methods.forEach((method_name) => {
			const upper_case_method_name = method_name.toUpperCase();
			if (!_.includes(predefined_methods ,upper_case_method_name)) predefined_methods.push(method_name.toUpperCase());
		});

		predefined_methods.forEach((method_name) => {
			this[method_name] = (...inputs) => {
				const upper_case_methodName = method_name.toUpperCase();
				// if (inputs.length == 1) inputs = inputs[0];
				this.addDynamicElement({
					name: upper_case_methodName,
					values: inputs
				});
				return this;
			};
		});

	}

	get systematic_position_name() {
		return this._systematic_position_name;
	}

	set systematic_position_name(value) {
		this._systematic_position_name = value;
	}

	get dynamic_elements() {
		return this._dynamicElements;
	}

	set dynamic_elements(value) {
		this._dynamicElements = value;
	}

	addDynamicElement(element){
		this._dynamicElements.push(element);
	}

	get Model() {
		return this._Model;
	}

	set Model(value) {
		this._Model = value;
	}

	addModel(Model){
		this._Model.push(Model);
	}

	GenerateQuery(){

		//handle dynamic methods half completed go to expressions
		let dynamic_phrases = [];
		if (this._dynamicElements.length !== 0){
			this._dynamicElements.forEach((dynamic_element) => {
				if ((dynamic_element.name == 'CREATE')||(dynamic_element.name == 'RETURN')||(dynamic_element.name == 'MATCH')||(dynamic_element.name == 'AS')||(dynamic_element.name == 'WHERE')||(dynamic_element.name == 'ON')||(dynamic_element.name == 'MERGE')||(dynamic_element.name == 'SET')||(dynamic_element.name == 'LIMIT')||(dynamic_element.name == 'DELETE')||(dynamic_element.name == 'DETACH')) {
					dynamic_phrases.push(new generalPhrase(dynamic_element.name + ' ' , Expressions.Parse(dynamic_element.values, dynamic_element.name) ,false));
				} else if(dynamic_element.name == 'END'){
					dynamic_phrases.push(new generalPhrase('' , '' ,true));
				}// other queries
			});
		}

		if (Object.keys(this._Model).length === 0 && this._dynamicElements.length === 0 ) throw new Error('There is no Model or Query available in the Generator'); //maybe check the id

		return this.ParsePhrases(dynamic_phrases);

	}

	ParsePhrases(phrases){
		let query = '';
		phrases.forEach((phrase) => {
			query += `${phrase.starter} ${phrase.expression} `;
			if (phrase.terminator) {
				query += ';\n';
			}
		});
		this._dynamicElements = [];
		return query;
	}

};



module.exports = CQLGenerator;