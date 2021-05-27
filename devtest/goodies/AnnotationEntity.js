'use strict'
const Annotation = require('conga-annotations').Annotation;

module.exports = class AnnotationEntity extends Annotation {

	/**
	 * The possible targets
	 *
	 * (Annotation.DEFINITION, Annotation.CONSTRUCTOR, Annotation.PROPERTY, Annotation.METHOD)
	 *
	 * @type {Array}
	 */
	static get targets() { return [Annotation.DEFINITION] }

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
		this.value = data.value || 'default value'
		this.info = data.info || 'default value for sample'
		this.info2 = data.info2 || 'default value for sample'

		// do something with data (error check, etc.)
	}

};