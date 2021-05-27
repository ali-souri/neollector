const
	neo4j = require('neo4j-driver').v1,
	Core = require('../core');

class Session {

	constructor(configuration){
		this.configuration = configuration;
		this._OGM_Source = configuration.OGM_Source;
		this._driver = neo4j.driver(configuration.uri, neo4j.auth.basic(configuration.username,configuration.password));
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

	loadAll(ModelClass, Depth=0){
		return Core.loadAll(ModelClass, Depth, this._session, this._OGM_Source);
	}

	load(ModelClass, id, Depth=0){
		return Core.loadById(ModelClass, id, Depth, this._session);
	}

	reload(entity, Depth=0){
		return Core.load(entity, Depth, this._session);
	}

	async deepRead(entity, Depth=0, Restriction=true){
		const result = await Core.deepRead(entity, Depth, this._session, this._OGM_Source, Restriction)
		return result;
	}

	delete(entity){
		return Core.delete(entity, this._session);
	}

	deepDelete(entity, Depth=0){
		return Core.deepDelete(entity, Depth, this._session);
	}

	//deleteAll

	async save(entity, Depth=0){
		return await Core.deepSave(entity, Depth, this._session);
	}

}

module.exports = Session;