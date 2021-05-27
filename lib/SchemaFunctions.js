const
	Driver = require('../driver').DefaultDriver,
	Parser = require('../core/parser').DefaultDriverParser,
	CQLLib = require('../query/lib'),
	Neo4jDB = require('../core/database/GenericExecuter'),
	Query = require('../query');

async function checkExists(schema){
	const Neo4j = new Driver();
	if (schema.TYPE == 'node'){
		const QueryBuilder = new Query.CQL();
		const query = QueryBuilder.MATCH(schema).RETURN(CQLLib.COUNT(schema.variable)).AS('number').END().GenerateQuery();
		const result = await Neo4j.exec(query);
		const parser = new Parser(result);
		return (parser.getCountQueryNumber() > 0);
	}
}

async function OGMCheckEntityExists(entity, session){
	const CQL = new Query.CQL();
	const query = CQL.MATCH(entity).RETURN(entity).END();
	const parser = await Neo4jDB.OGMParserExecuter(query,session);
	return (parser.getCountQueryNumber() > 0);
}

async function OGMCheckExists(entity){
	const CQL = new Query.CQL();
	const Neo4j = new Driver();
	const query = CQL.MATCH(entity).RETURN(entity).END();
	const result = await Neo4j.exec(query);
	const parser = new Parser(result);
	return (parser.getCountQueryNumber() > 0);
}

module.exports = {
	checkExists,
	OGMCheckEntityExists,
	OGMCheckExists,
};