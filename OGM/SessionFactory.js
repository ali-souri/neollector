const
	Session = require('./Session');

class SessionFactory {

	constructor(configuration){
	// constructor(configuration,domain){
		this.configuration = configuration;
		// this.domain = domain;
	}

	openSession(OGM){
		const configuration_data = this.configuration.export();
		// if(OGM == undefined){

		// }
		// console.log('configuration_data')
		// console.log(configuration_data)
		configuration_data['OGM_Source'] = OGM;
		return new Session(configuration_data);
	}

}

module.exports = SessionFactory;