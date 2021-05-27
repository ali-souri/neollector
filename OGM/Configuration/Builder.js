const
	configuration = require('./Configuration'),
	// ConfigurationSource = require('./ConfigurationSource'),
	_ = require('lodash'),
	FileConfigurationSource = require('./FileConfigurationSource');

class Builder {

	constructor(configurationsource){
		if(configurationsource.hasOwnProperty('conf_object')){
			if (_.isEqual(configurationsource.conf_object.constructor.name, 'Configuration')) {
				this._configuration = configurationsource.conf_object
			}
		}
		this.setConfigurations(configurationsource)
	}

	setConfigurations(configurationsource = {}) {
		if(_.isEqual(configurationsource.constructor.name, 'FileConfigurationSource')){
			this._configurationsource = configurationsource;
			this._uri = _.isUndefined(configurationsource._uri) ? "" : configurationsource._uri ;
			this._ConnectionPoolSize = _.isUndefined(configurationsource._ConnectionPoolSize) ? "" : configurationsource._ConnectionPoolSize;
			this._username = _.isUndefined(configurationsource._username) ? "" : configurationsource._username;
			this._password = _.isUndefined(configurationsource._password) ? "" : configurationsource._password;
			this._credentials = {username:this._username,password:this._password};
			let return_uri = this._uri;
			if (_.includes(return_uri,'@')){
				const userpass = return_uri.substring(return_uri.indexOf('://')+3,return_uri.substring(return_uri.indexOf('@')));
				this._username = userpass.substring(0,userpass.indexOf(':'));
				this._password = userpass.substring(userpass.indexOf(':'));
				this._uri = return_uri.replace(return_uri.substring(return_uri.indexOf('://')+3,return_uri.indexOf('://')+1),"");
			}
		} else {
			this._configurationsource = configurationsource;
			this._uri = _.isUndefined(configurationsource.uri) ? "" : configurationsource.uri ;
			this._ConnectionPoolSize = _.isUndefined(configurationsource.ConnectionPoolSize) ? "" : configurationsource.ConnectionPoolSize;
			this._username = _.isUndefined(configurationsource.username) ? "" : configurationsource.username;
			this._password = _.isUndefined(configurationsource.password) ? "" : configurationsource.password;
			this._credentials = {username:this._username,password:this._password};
			let return_uri = this._uri;
			if (_.includes(return_uri,'@')){
				const userpass = return_uri.substring(return_uri.indexOf('://')+3,return_uri.substring(return_uri.indexOf('@')));
				this._username = userpass.substring(0,userpass.indexOf(':'));
				this._password = userpass.substring(userpass.indexOf(':'));
				this._uri = return_uri.replace(return_uri.substring(return_uri.indexOf('://')+3,return_uri.indexOf('://')+1),"");
			}
		}
	}

	uri(uri){
		this._uri = uri;
		return this;
	}

	credentials(username,password){
		this._username = username;
		this._password = password;
		this._credentials = {username:username,password:password};
		return this;
	}

	build(){
		return this._configuration.setProperties({uri:this._uri,ConnectionPoolSize:this._ConnectionPoolSize,username:this._username,password:this._password});
	}

	// static readFromFile(file_path){
	// 	const file_ConfigurationSource = new FileConfigurationSource(file_path)
	// 	const builder = new Builder();
	// 	builder.setConfigurations(file_ConfigurationSource)
	// 	return builder;
	// }

	readFromFile(file_path){
		const file_ConfigurationSource = new FileConfigurationSource(file_path)
		// const builder = new Builder();
		this.setConfigurations(file_ConfigurationSource)
		return this;
	}

}

module.exports = Builder;