const
	ConfigurationSource = require('./ConfigurationSource'),
	PropertiesReader = require('properties-reader');

class FileConfigurationSource extends ConfigurationSource{

	constructor(filePath){
		const properties = PropertiesReader(filePath);
		const uri = properties.get('URI') || "";
		const username = properties.get('USERNAME') || "";
		const password = properties.get('PASSWORD') || "";
		const ConnectionPoolSize = properties.get('connection.pool.size') || "";
		super(uri,ConnectionPoolSize,username,password);
	}

}

module.exports = FileConfigurationSource;