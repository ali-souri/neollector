'use strict'
const
	Annotation = require('conga-annotations').Annotation;

module.exports = class Relationship extends Annotation {

	/**
	 * The possible targets
	 *
	 * (Annotation.DEFINITION, Annotation.CONSTRUCTOR, Annotation.PROPERTY, Annotation.METHOD)
	 *
	 * @type {Array}
	 */
	static get targets() { return [Annotation.PROPERTY] }

	/**
	 * Constructor to add attributes
	 * @type {Array}
	 */
	constructor(data, filePath){
		super(data, filePath)
	}

	/**
	 * Optional initialization method that
	 * can be used to transform data
	 *
	 * @param  {Object} data
	 * @return {void}
	 */
	init(data){

		// set defaults
		this.value = data.value || 'default_value'
		this.type = data.type || 'default_value'
		this.direction = data.direction || 'none' // OUTGOING or INCOMING
		this.model = data.model || 'none'
		this.variable = data.variable || 'none'


		// do something with data (error check, etc.)
	}

};