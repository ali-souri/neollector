
const neodb = class {

	constructor(session){
		this._session = session;
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