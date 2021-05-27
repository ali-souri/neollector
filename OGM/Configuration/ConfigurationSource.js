const _ = require('lodash');

class ConfigurationSource {

	constructor(uri, ConnectionPoolSize, username, password){
		this._uri = uri;
		this._ConnectionPoolSize = ConnectionPoolSize;
		this._username = username;
		this._password = password;
		let return_uri = this._uri;
		if (_.includes(return_uri,'@')){
			const userpass = return_uri.substring(return_uri.indexOf('://')+3,return_uri.substring(return_uri.indexOf('@')));
			this._username = userpass.substring(0,userpass.indexOf(':'));
			this._password = userpass.substring(userpass.indexOf(':'));
			this._uri = return_uri.replace(return_uri.substring(return_uri.indexOf('://')+3,return_uri.indexOf('://')+1),"");
		}
	}

	get uri() {
		return this._uri;
	}

	set uri(value) {
		this._uri = value;
	}

	get ConnectionPoolSize() {
		return this._ConnectionPoolSize;
	}

	set ConnectionPoolSize(value) {
		this._ConnectionPoolSize = value;
	}


	get username() {
		return this._username;
	}

	set username(value) {
		this._username = value;
	}

	get password() {
		return this._password;
	}

	set password(value) {
		this._password = value;
	}
}

module.exports = ConfigurationSource;