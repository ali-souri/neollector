
const protocol = process.env.NEO4J_PROTOCOL || 'bolt';
const server_address = process.env.NEO4J_SERVER_ADDRESS || 'localhost';
const port = process.env.NEO4J_PORT || '7687';
const username = process.env.NEO4J_USERNAME || 'neo4j';
const password = process.env.NEO4J_PASSWORD || 'abas1371';
const ConnectionPoolSize = process.env.CONNECTION_POOL_SIZE || 150;
const uri = process.env.URI || `${protocol}://${server_address}:${port}`;

module.exports = {
	username,
	password,
	uri,
	ConnectionPoolSize
};