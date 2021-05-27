'use strict';

const
	Query = require('../query'), ////.Query.CQL,
	{
		DefaultDriver
	} = require('../driver'),
	{
		DefaultDriverParser
	} = require('../core/parser');


const randString = require('randomstring');


async function makeAllAndConnect(nodesArray, connector) {

	const node1 = nodesArray[0];
	const node2 = nodesArray[1];

	const CQL = new Query.CQL();

	if (node1.variable == node2.variable) {
		node2.variable = randString.generate({
			length: 10,
			charset: 'alphabetic'
		});
	}

	const query = CQL.CREATE({
		$_connect: [
			[node1, node2], connector
		]
	}).RETURN(`id(${node1.variable}) AS node1ID , id(${node2.variable}) AS node2ID , id(${connector.variable}) AS connectorID `).END();

	const Neo4j = new DefaultDriver();

	const result = await Neo4j.exec(query);

	const parser = new DefaultDriverParser(result);

	const returnObject = parser.getIntegerKeyValueObject();

	node1.NeoID = returnObject.node1ID;
	node2.NeoID = returnObject.node2ID;
	connector.NeoID = returnObject.connectorID;

	return [
		[node1, node2], connector
	];

}

async function makeDestinationAndConnect(nodesArray, connector) {

	const node1 = nodesArray[0];
	const node2 = nodesArray[1];

	const CQL = new Query.CQL();

	if (node1.variable == node2.variable) {
		node2.variable = randString.generate({
			length: 10,
			charset: 'alphabetic'
		});
	}

	const query = CQL.MATCH(node1).CREATE({
		$_connect: [
			[node1.variable, node2], connector
		]
	}).RETURN(`id(${node1.variable}) AS node1ID , id(${node2.variable}) AS node2ID , id(${connector.variable}) AS connectorID `).END().GenerateQuery();

	const Neo4j = new DefaultDriver();

	const result = await Neo4j.exec(query);

	const parser = new DefaultDriverParser(result);

	const returnObject = parser.getIntegerKeyValueObject();

	node1.NeoID = returnObject.node1ID;
	node2.NeoID = returnObject.node2ID;
	connector.NeoID = returnObject.connectorID;

	return [
		[node1, node2], connector
	];

}

async function makeConnection(nodesArray, connector) {

	const node1 = nodesArray[0];
	const node2 = nodesArray[1];

	const CQL = new Query.CQL();

	if (node1.variable == node2.variable) {
		node2.variable = randString.generate({
			length: 10,
			charset: 'alphabetic'
		});
	}

	const query = CQL.MATCH(node1).MATCH(node2).CREATE({
		$_connect: [
			[node1.variable, node2.variable], connector
		]
	}).RETURN(`id(${node1.variable}) AS node1ID , id(${node2.variable}) AS node2ID , id(${connector.variable}) AS connectorID `).END();

	const Neo4j = new DefaultDriver();

	const result = await Neo4j.exec(query);

	const parser = new DefaultDriverParser(result);

	const returnObject = parser.getIntegerKeyValueObject();

	node1.NeoID = returnObject.node1ID;
	node2.NeoID = returnObject.node2ID;
	connector.NeoID = returnObject.connectorID;

	return [
		[node1, node2], connector
	];

}


module.exports = {
	makeAllAndConnect,
	makeDestinationAndConnect,
	makeConnection
};