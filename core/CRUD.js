const
	Driver = require('../driver').DefaultDriver,
	// OGMDriver = require('../driver').OGMDriver,
	CQLLib = require('../query/lib'),
	Parser = require('./parser').DefaultDriverParser,
	Neo4jDB = require('./database/GenericExecuter'),
	OGMFunctions = require('../lib/OGMFunctions'),
	_ = require('lodash'),
	Query = require('../query');

const Create = async (schema) => {
	if (schema.TYPE == 'node') {
		const Neo4j = new Driver();
		const QueryBuilder = new Query.CQL();
		const query = QueryBuilder.CREATE(schema).RETURN(CQLLib.id(schema)).AS('id').END();
		const result = await Neo4j.exec(query);
		const parser = new Parser(result);
		return parser.getID(true);
	} else if (schema.TYPE == 'connection') {
		throw new Error('you have to use connection methods to create a connection between two nodes');
	}
};

const AllRead = async (schema)=>{
	if (schema.TYPE == 'node') {
		const Neo4j = new Driver();
		const QueryBuilder = new Query.CQL();
		const query = QueryBuilder.MATCH({$_node_by_label:schema}).RETURN(schema).END().GenerateQuery();
		const result = await Neo4j.exec(query);
		const parser = new Parser(result);
		const output = parser.getAllRecordsFields();
		return output;
	} else if (schema.TYPE == 'connection') {
		throw new Error('you have to use connection methods to read a connection between two nodes');
	}
}

const Read = async (schema) => {
	if (schema.TYPE == 'node') {
		const Neo4j = new Driver();
		const QueryBuilder = new Query.CQL();
		const query = QueryBuilder.MATCH({$_node_by_attributes:schema}).RETURN(schema).END().GenerateQuery();
		const result = await Neo4j.exec(query);
		const parser = new Parser(result);
		const output = parser.getAllRecordsFields();
		return output;
	} else if (schema.TYPE == 'connection') {
		throw new Error('you have to use connection methods to read a connection between two nodes');
	}
}

const ReadById = async (schema) => {
	if (schema.TYPE == 'node') {
		const Neo4j = new Driver();
		const QueryBuilder = new Query.CQL();
		const query = QueryBuilder.MATCH({$_node_by_id:schema}).RETURN(schema).END().GenerateQuery();
		const result = await Neo4j.exec(query);
		const parser = new Parser(result);
		const output = parser.getAllRecordsFields();
		return output;
	} else if (schema.TYPE == 'connection') {
		throw new Error('you have to use connection methods to read a connection between two nodes');
	}
}

const OGMCreate = async (entity, Depth, session) => {
	const CQL = new Query.CQL();
	const query = CQL.CREATE({
		$_depth: [entity, Depth]
	}).RETURN({
		$_depth: [entity, Depth]
	}).END();
	const parser = await Neo4jDB.OGMParserExecuter(query, session);
	return parser;
};

//need test and debug
const Delete = async (schema) => {
	if (schema.TYPE == 'node') {
		const Neo4j = new Driver();
		const QueryBuilder = new Query.CQL();
		const query = QueryBuilder.MATCH({$_node_by_attributes:schema}).DETACH().DELETE(schema).END();
		await Neo4j.exec(query);
	} else if (schema.TYPE == 'connection') {
		throw new Error('you have to use connection methods to create a connection between two nodes');
	}
};

const OGMDelete = async () => {
	// if (schema.TYPE == 'node') {
	// 	const Neo4j = new Driver();
	// 	const QueryBuilder = new Query.CQL();
	// 	const query = QueryBuilder.DELETE(schema).RETURN(CQLLib.id(schema)).AS('id').END();
	// 	const result = await Neo4j.exec(query);
	// 	const parser = new Parser(result);
	// 	return parser.getID(true);
	// } else if (schema.TYPE == 'connection') {
	// 	throw new Error('you have to use connection methods to create a connection between two nodes');
	// }
};

const OGMReadById = async (entity, id, Depth, session) => {

	const CQL = new Query.CQL();
	if (entity.getType() == "node") {
		const query = CQL.MATCH({
			$_depth: [entity, Depth]
		}).WHERE({
			$_eql: [CQLLib.id(entity), id]
		}).RETURN({
			$_depth: [entity, Depth]
		}).END();
		const parser = await Neo4jDB.OGMParserExecuter(query, session);
		return parser; //what do you want?
	}

};

const OGMRead = async (entity, id, session, type = 'all') => {

	const CQL = new Query.CQL();
	if (entity.getType() == "node") {
		let query;
		if (type == 'all') {
			query = CQL.MATCH({
				$_node_by_label: entity
			}).RETURN(OGMFunctions.getElementVariable(entity)).END();
		} else if (type == 'all_by_attrs') {
			query = CQL.MATCH({
				$_node_by_attributes: entity
			}).RETURN(OGMFunctions.getElementVariable(entity)).END();
		} else if (type == 'one_by_attrs') {
			query = CQL.MATCH({
				$_node_by_attributes: entity
			}).RETURN(OGMFunctions.getElementVariable(entity)).LIMIT(1).END();
		} else if (type == 'one_by_all') {
			query = CQL.MATCH({
				$_node: entity
			}).RETURN(OGMFunctions.getElementVariable(entity)).LIMIT(1).END();
		} else if (type == 'one_by_id') {
			query = CQL.MATCH({
				$_node_by_id: entity
			}).RETURN(OGMFunctions.getElementVariable(entity)).LIMIT(1).END();
		}
		const parser = await Neo4jDB.OGMParserExecuter(query, session);
		return parser;
	}

};

const OGMDeepSave = async (entity, Depth, session) => {

	let CQL = new Query.CQL();
	if (entity.getType() == "node") {

		const pairandlist = OGMFunctions.getDepthPairsAndList(entity, Depth, false);

		_.forEach(pairandlist.elements, (element) => {
			CQL = CQL.MERGE({
					$_node_by_id: element
				})
				.ON().CREATE().SET({
					$_set: [element, 'self']
				})
				.ON().MATCH().SET({
					$_set: [element, 'self']
				}); //.END();
		});

		if (pairandlist.save_pairs.length) {
			const create_query = OGMFunctions.make_pair_query_sequence_part(pairandlist.save_pairs, false);
			const return_query = OGMFunctions.make_pair_query_sequence_part(pairandlist.save_pairs, true);
			CQL = CQL.CREATE(create_query).RETURN(return_query);
		}

		const query = CQL.GenerateQuery();
		const parser = await Neo4jDB.OGMParserExecuter(query, session);
		return parser;
	}

};

const OGMDeepRead = async (entity, Depth, session, Restriction=true) => {
	if (entity.getType() == "node") {
		let CQL = new Query.CQL();
		CQL = CQL.MATCH({$_depth:[entity,Depth,false,true,Restriction]}).return({$_depth:[entity,Depth,Restriction]}).END();
		const query = CQL.GenerateQuery();
		console.log('the damn query');
		console.log(query);
		const parser = await Neo4jDB.OGMParserExecuter(query, session);
		return parser;
	}
};

module.exports = {
	Create,
	Read,
	AllRead,
	ReadById,
	OGMCreate,
	Delete,
	OGMDelete,
	OGMReadById,
	OGMDeepRead,
	OGMRead,
	OGMDeepSave,
};