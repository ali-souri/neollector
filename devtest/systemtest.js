const
	CQL = require('../query').CQL,
	// Process = require ('../core/process/ProcessHandler'),
	Configuration = require('../OGM/Configuration/Configuration'),
	schemaHandler = require('./json-schema-provider/services/generalServices'),
	graphSchema = require('../schema/graphSchema/GraphSchema'),
	SessionFactory = require('../OGM/SessionFactory'),
	OGM = require('../OGM');

// /*
require('./system/testmodel');
require('./system/testmodel2');
require('./system/testmodel3');
require('./system/testmodel4');
require('./system/testmodel5');
// */
// /*
(async ()=>{

	const schema0 = await schemaHandler.getUserPersonSchema();
	const gs0 = new graphSchema(schema0);

	const schema1 = await schemaHandler.getSystemModelSchema('SkillsRoot');
	const gs1 = new graphSchema(schema1);

	const schema2 = await schemaHandler.getSystemModelSchema('Industry');
	const gs2 = new graphSchema(schema2);

	// console.log(schema)
	// console.log(gs.schemaToMetaData())

	OGM.graphSchemaRegister(gs0);
	OGM.graphSchemaRegister(gs1);
	OGM.graphSchemaRegister(gs2);

	const UserPersonRoot = OGM.getModel('UserPersonRoot');
	const UPRObject = new UserPersonRoot({name: 'ali'});
	
	const SkillsRoot = OGM.getModel('SkillsRoot');
	const SRObject = new SkillsRoot({id: '0912', graphType:"Request" ,treeType:"Skills"});

	const Industry = OGM.getModel('Industry');
	const INObject = new Industry({id: '0913', graphType:"Request" ,treeType:"Skills", name:"TestingIT"});

	SRObject.Industry.push(INObject);
	UPRObject.SkillsRoot.push(SRObject);


	console.log(OGM);
	console.log('--------------------==========================>>>>>>>>>>>>>>>>>>>>>>>');
	// OGM.deleteModel('Industry');
	// OGM.deleteAllModels();
	// console.log(OGM);

	// const cql = new CQL();
	// console.log(cql.MATCH(UPRObject).return(UPRObject).END().GenerateQuery());
	// console.log(cql.MATCH({$_deep:UPRObject}).return({$_deep:UPRObject}).END().GenerateQuery());
	// console.log(cql.MATCH({$_depth:[UPRObject,2]}).return({$_depth:[UPRObject,2]}).END().GenerateQuery());
	// console.log(cql.CREATE({$_depth: [UPRObject,2]}).RETURN({$_depth: [UPRObject,2]}).END().GenerateQuery())


	// const conf_file = "/home/ali/project/Neolector/devtest/config.properties" ;
	// const conf = Configuration.Builder().readFromFile(conf_file).build();

	// const sessionfactory = new SessionFactory(conf);
	// const session = sessionfactory.openSession(OGM);

	// session.save(UPRObject,2);

	// console.log (await session.deepRead(UPRObject,2,false));

})();


// */

/*

console.log('start ...');
// console.log(OGM.registered_metadata);
const tm = OGM.getModel('tm');

// const tm2 = OGM.getModel('tm2');
// const tm3 = OGM.getModel('tm3');
// const tm4 = OGM.getModel('tm4');
// const tm5 = OGM.getModel('tm5');


const tmobj = new tm('Aliamirhossein', 'Ello');

console.log(tmobj)

// const tmobj2 = new tm2('Ali2', 'Ello1');
// const tmobj21 = new tm2('Ali21', 'Ello21');
// const tmobj22 = new tm2('Ali22', 'Ello22');
// const tmobj23 = new tm2('Ali23', 'Ello23');

// const tmobj3 = new tm3('Ali3', 'Ello3');
// const tmobj4 = new tm4('Ali4', 'Ello4');
// const tmobj5 = new tm5('Ali5', 'Ello5');
// const tmobj51 = new tm5('Ali51', 'Ello51');
// const tmobj52 = new tm5('Ali52', 'Ello52');

// tmobj4.at3.push(tmobj5)
// tmobj3.at5.push(tmobj5);
// tmobj3.at5.push(tmobj51);
// tmobj3.at5.push(tmobj52);
// tmobj3.at4.push(tmobj4);
// tmobj2.at3.push(tmobj3);
// tmobj.at2.push(tmobj2);
// tmobj.at2.push(tmobj21);
// tmobj.at2.push(tmobj22);
// tmobj.at2.push(tmobj23);



console.log('static');

console.log('metadata');
// console.log(tmobj3.MetaData());

// const config = {OGM_Source:OGM,uri:'bolt://localhost:7687',username:'neo4j',password:'abas1371'};
// const session = new Session(config);

const conf_file = "/home/ali/project/Neolector/devtest/config.properties" ;
const conf = Configuration.Builder().readFromFile(conf_file).build();
// console.log('conf')
// console.log(conf)

const sessionfactory = new SessionFactory(conf);
const session = sessionfactory.openSession(OGM)


console.log(tmobj.MetaData());
// session.deepLoad(tmobj,3,false);
// session.deepRead(tmobj,3,false);

(async()=>{
	console.log(await session.deepRead(tmobj,3,false));
})();

// session.save(tmobj,4);

// tmobj.at1 = 'baby';
// session.save(tmobj);

// console.log(tmobj._data());
// tmobj.at1 = 'ttmm';
// console.log(tmobj._data());

// console.log(tm.__staticMetaData.relationships);
// console.log(OGM.registered_metadata.tm);
// console.log(tmobj.__staticMetaData!=undefined);

// const cql = new CQL();

// console.log(cql.MATCH(tmobj).return(tmobj).END().GenerateQuery());
// console.log(cql.MATCH(tm).return(tm).END().GenerateQuery());

// console.log(cql.MATCH({$_deep:tmobj}).return(tmobj).END().GenerateQuery());


// console.log(cql.MATCH({$_deep:tmobj}).return({$_deep:tmobj}).END().GenerateQuery());

// console.log(cql.MATCH({
// 	$_depth: [tmobj, 0]
// }).return({
// 	$_depth: [tmobj, 0]
// }).END().GenerateQuery());


// console.log(cql.MATCH({$_depth:[tmobj,3]}).return({$_depth:[tmobj,3]}).END().GenerateQuery());


// console.log(cql.MATCH({$_depth:[tmobj,2]}).return({$_depth:[tmobj,2]}).END().GenerateQuery());
// console.log(cql.MATCH({$_depth:[tmobj,3]}).return({$_depth:[tmobj,3]}).END().GenerateQuery());
// console.log(cql.MATCH({$_depth:[tmobj,4]}).return({$_depth:[tmobj,4]}).END().GenerateQuery());

// { address: '/home/ali/project/Neolector/devtest/system/testmodel.js',
//   target: 'TestModel',
//   label: 'TModel',
//   obj_name: 'TestModel',
//   type: 'NodeEntity',
//   variable: 'mhOlwhzoje',
//   collections: [],
//   properties:
//    { name: { type: 'string', optional: true },
//      at1: { type: 'string', optional: true } },
//   relationships:
//    { at2:
//       { type: 'Related',
//         model: 'tm2',
//         direction: 'OUTGOING',
//         variable: 'none' } } }

*/