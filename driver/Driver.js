const
	constants = require('../constants'),
	neo4j = require('neo4j-driver').v1;

const neodb = class {

	constructor(uri = constants.uri, username = constants.username, password = constants.password){
		this._driver = neo4j.driver(uri, neo4j.auth.basic(username,password));
		this._session = this._driver.session();
	}

	get driver() {
		return this._driver;
	}

	set driver(value) {
		this._driver = value;
	}

	get session() {
		return this._session;
	}

	set session(value) {
		this._session = value;
	}

	sessionClose(){
		this._session.close();
	}

	driverClose(){
		this._driver.close();
	}

	close(){
		this.sessionClose();
		this.driverClose();
	}

	async exec(query){
		if (query !== undefined || query.length > 0){
			if (typeof query == "string") {
				return await this.session.run(query);
			} else if(query instanceof Object && query.hasOwnProperty('_systematic_position_name')){
				if (query.systematic_position_name == 'ORM_CQL_G'){
					return await this.session.run(query.GenerateQuery());
				}
			}

		} else {
			throw new Error('there is not an appropriate query');
		}
	}

}

module.exports = neodb;