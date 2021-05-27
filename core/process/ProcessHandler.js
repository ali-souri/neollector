
class ProcessHandler {

	constructor() {
		// this.mainObject = (process.env.NEOLLECTOR_OGM_REGISTERED_OBJECTS) ? (process.env.NEOLLECTOR_OGM_REGISTERED_OBJECTS) : {} ;
	}


	initiate(){
		process.env.NEOLLECTOR_OGM_REGISTERED_OBJECTS = (process.env.NEOLLECTOR_OGM_REGISTERED_OBJECTS) ? process.env.NEOLLECTOR_OGM_REGISTERED_OBJECTS : '{}';
		process.env.NEOLLECTOR_OGM_REGISTERED_MAPS = (process.env.NEOLLECTOR_OGM_REGISTERED_MAPS) ? process.env.NEOLLECTOR_OGM_REGISTERED_MAPS : '{}';
	}

	Clean(){
		process.env.NEOLLECTOR_OGM_REGISTERED_OBJECTS = '{}';
		process.env.NEOLLECTOR_OGM_REGISTERED_MAPS = '{}';
	}

	addToOGMRegisteredObjects(name,obj){
		const processObject = this.Read();
		processObject[name] = obj;
		this.Write(processObject);
	}

	Get(name){
		const processObject = this.Read();
		return processObject[name];
	}

	deleteAll(){
		process.env.NEOLLECTOR_OGM_REGISTERED_OBJECTS = undefined;
		process.env.NEOLLECTOR_OGM_REGISTERED_MAPS = undefined;
	}

	Read(){
		return JSON.parse(process.env.NEOLLECTOR_OGM_REGISTERED_OBJECTS);
	}

	Write(obj){
		return process.env.NEOLLECTOR_OGM_REGISTERED_OBJECTS = JSON.stringify(obj);
	}

	addToOGMRegisteredObjectsMapped(name,mappedname){
		const processObject = this.ReadMapped();
		processObject[name] = mappedname;
		this.WriteMapped(processObject);
	}

	GetMapped(name){
		const processObject = this.ReadMapped();
		return processObject[name];
	}

	ReadMapped(){
		return JSON.parse(process.env.NEOLLECTOR_OGM_REGISTERED_MAPS);
	}

	WriteMapped(obj){
		return process.env.NEOLLECTOR_OGM_REGISTERED_MAPS = JSON.stringify(obj);
	}

	DeleteByName(name){
		const processObject = this.Read();
		delete processObject[name];
		this.Write(processObject);
		const processMappedObject = this.ReadMapped();
		delete processMappedObject[name];
		this.WriteMapped(processMappedObject);
	}

}

module.exports = ProcessHandler;