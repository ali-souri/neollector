'use strict';
const path = require('path');
const annotations = require('conga-annotations');
// require('../classes/model');

var objects = {};
var metadata = [];

function handle(name,obj) {
	console.log(obj);
	objects[name] = obj;

	console.log(obj.info());
	console.log(obj.name);
	// console.log(handle.caller);

// create the registry
	const registry = new annotations.Registry();

// add annotations to the registry
	registry.registerAnnotation(path.join(__dirname, 'AnnotationEntity'));
	const reader = new annotations.Reader(registry);

	reader.parse(path.join(__dirname, '../classes/model.js'));

	const definitionAnnotations = reader.definitionAnnotations;

	console.log('here');
	// console.log(definitionAnnotations);

	definitionAnnotations.forEach(function(annotation){

		if (annotation.constructor.name === 'AnnotationEntity'){

			metadata.push(annotation.target);
			console.log("puffff");
			console.log(obj.name);
			console.log(annotation.target); // -> "HelloWorld"
			console.log(annotation.value); // -> "some value"
			console.log(annotation.info); // -> "here is an attribute value"
			console.log(annotation.info2); // -> "here is an attribute value"


		}

	});

}

module.exports = {
	handle,
	objects,
	metadata
};