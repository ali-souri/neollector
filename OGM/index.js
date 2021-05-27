'use strict';

const
	Model = require('./Model'),
	Process = require('../core/process/ProcessHandler'),
	_ = require('lodash'),
	OGMlib = require('./lib');

let registeredModels = {},
	registered_metadata = {};

function register(name, obj, address) {//name for registration of the obj

	registeredModels[name] = obj;

	const PMData = OGMlib.provideMetaData(obj, address);

	obj.__staticMetaData = PMData;
	obj._systematic_position_name = 'OGM_Object';
	obj._variable = PMData.variable;

	registered_metadata[name] = PMData;

	const processHandler = new Process();
	processHandler.initiate();
	processHandler.addToOGMRegisteredObjects(name, PMData);
	processHandler.addToOGMRegisteredObjectsMapped(obj.name,name);

}

function graphSchemaRegister(graph_schema) {
	if (graph_schema.hasOwnProperty('_systematic_position_name')) {
		if (_.isEqual(graph_schema._systematic_position_name,'Graph_Schema')&& !_.isEmpty(graph_schema._schema_object)) {
			
			const name = graph_schema._root_title;
			const OGMObject = OGMlib.MakeSchemaOGM(graph_schema)[graph_schema._root_title];
			registeredModels[name] = OGMObject;

			const PMData = graph_schema.internalRootSchemaMetaData();

			OGMObject.__staticMetaData = PMData;
			OGMObject._systematic_position_name = 'OGM_Object';
			OGMObject._variable = PMData.variable;

			registered_metadata[name] = PMData;

			const processHandler = new Process();
			processHandler.initiate();
			processHandler.addToOGMRegisteredObjects(name, PMData);
			processHandler.addToOGMRegisteredObjectsMapped(name,name);

			return;
		}
	}
	throw new Error('There is something Wrong with GraphSchemaObject');
}

function getModel(model_name) {
	return registeredModels[model_name];
}

function deleteModel(model_name){
	delete registeredModels[model_name];
	delete registered_metadata[model_name];
	const processHandler = new Process();
	processHandler.DeleteByName(model_name)
}

function deleteAllModels(){
	_.forEach(registeredModels, (value, key)=>{
		delete registeredModels[key];
	})
	_.forEach(registered_metadata, (value, key)=>{
		delete registered_metadata[key];
	})
	const processHandler = new Process();
	processHandler.Clean();
}

module.exports = {
	registeredModels,
	getModel,
	register,
	registered_metadata,
	Model,
	graphSchemaRegister,
	deleteModel,
	deleteAllModels,
};