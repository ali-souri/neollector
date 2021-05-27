const
    // {DefaultDriver,
    {OGMDriver} = require('../../driver'),
    Parser = require('../parser').DefaultDriverParser;


async function OGMParserExecuter(query,session){
    const Neo4j = new OGMDriver(session);
    const result = await Neo4j.exec(query);
    return new Parser(result);
}

module.exports = {
    OGMParserExecuter
};