const
	builder = require('./Builder'),
	_ = require('lodash'),
	constants = require('../../constants');


class Configuration {

	constructor(conf = {}){
		this._uri = conf.uri || constants.uri;
		this._username = conf.username || constants.username ;
		this._password = conf.password || constants.password ;
		this._ConnectionPoolSize = conf.ConnectionPoolSize || constants.ConnectionPoolSize;
	}

	setProperties(conf = {}){
		this._uri = conf.uri || constants.uri;
		this._username = conf.username || constants.username ;
		this._password = conf.password || constants.password ;
		this._ConnectionPoolSize = conf.ConnectionPoolSize || constants.ConnectionPoolSize;
		return this;
	}

	static Builder(props = {}){
		const conf_object = new Configuration();
		props['conf_object'] = conf_object;
		return new builder(props);
	}

	export(){
		let return_uri = this._uri;
		if (_.includes(return_uri,'@')){
			const userpass = return_uri.substring(return_uri.indexOf('://')+3,return_uri.indexOf(return_uri.indexOf('@')));
			this._username = userpass.substring(0,userpass.indexOf(':'));
			this._password = userpass.substring(userpass.indexOf(':'));
			return_uri = return_uri.replace(return_uri.substring(return_uri.indexOf('://')+3,return_uri.indexOf('://')+1),"");
		}
		return {username:this._username,
				password:this._password,
				uri:return_uri,
				ConnectionPoolSize:this._ConnectionPoolSize};
	}

}

module.exports = Configuration;