const
	_ = require('lodash'),
	{checkExists,
	// OGMCheckEntityExists,
	} = require('../lib/SchemaFunctions'),
	NeoCreate = require('./CRUD').Create,
	{
	 OGMDeepSave,
	 OGMDeepRead,
		Read,
		AllRead,
		ReadById,
	//  OGMCreate,
	 OGMRead,
	 Delete,
	} = require('./CRUD'),
	 libFunctions = require('../lib/UsefulFunctions');

//check if it's OGM or schema for all

async function save(schema) {
	//to do:
	//check if it should have been updated
	// check if it's a node or connection

	if (!await checkExists(schema)){
		return await NeoCreate(schema);
	}
}

async function simpleAllRead(schema){
	const schema_data = await AllRead(schema);
	const return_array = [];
	_.forEach(schema_data, (schema_info)=>{
		return_array.push(schema.build(libFunctions.schemaDataCorrection(schema_info)));
	});
	return return_array;
}

async function simpleRead(schema){
	const schema_data = await Read(schema);
	const return_array = [];
	_.forEach(schema_data, (schema_info)=>{
		return_array.push(schema.build(libFunctions.schemaDataCorrection(schema_info)));
	});
	return return_array;
}

async function simpleDelete(schema){
	await Delete(schema);
}

async function simpleReadbyID(schema){
	const schema_data = await ReadById(schema);
	return schema.build(libFunctions.schemaDataCorrection(schema_data[0]));
}

async function deepSave(entity, Depth, session){
	await OGMDeepSave(entity,Depth,session);
}

async function loadAll(ModelClass, session){
	const result_parser =  await OGMRead(ModelClass,session,'all');
	return result_parser.modifyOGMEntity(ModelClass);
}

async function customLoad(entity, session){
	const result_parser =  await OGMRead(entity,session,'all_by_attrs');
	return result_parser.modifyOGMEntity(entity);
}

async function loadOne(ModelClass, session){
	const result_parser =  await OGMRead(ModelClass,session,'one_by_attrs');
	return result_parser.modifyOGMEntity(ModelClass);
}

async function load(entity, session){
	const result_parser =  await OGMRead(entity,session,'one_by_all');
	return result_parser.modifyOGMEntity(entity);
}

async function loadById(ModelClass, id, session){
	const result_parser =  await OGMRead(ModelClass,session,'one_by_id');
	return result_parser.modifyOGMEntity(ModelClass);
}

async function deepRead(entity, Depth, session, OGMSource, Restriction){
	const result_parser =  await OGMDeepRead(entity,Depth,session,Restriction);
	const res = result_parser.deepModifyOGMEntity(entity,OGMSource);

	return res;
}

// async function deepLoad(entity, Depth, session, OGMSource, Restriction){
// 	const result_parser =  await OGMDeepLoad(entity,Depth,session,Restriction);
// 	const res = result_parser.deepModifyOGMEntity(entity,OGMSource);
// 	// console.log('res========================-----------------------------===============================');
// 	// console.log(res);
// 	// console.log('res*************************************');

// 	return res;
// }

// async function deepRead(entity, Depth, session, OGMSource){ // read just one and current object deeply
// 	const result_parser =  await OGMDeepRead(entity,Depth,session);
// 	// return result_parser.modifyOGMEntity(entity);
// }

async function Cdelete(entity, session){

}

async function deepDelete(entity, Depth, session){

}

module.exports = {
	simpleRead,
	simpleReadbyID,
	simpleAllRead,
	save,
	loadAll,
	load,
	delete: Cdelete,
	loadById,
	deepSave,
	deepDelete,
	// deepLoad,
	loadOne,
	customLoad,
	simpleDelete,
	deepRead,
};