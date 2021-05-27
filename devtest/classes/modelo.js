const father = require('./other/father');
var master = require('../goodies/master');

class modelo extends father{

	constructor(){
		super();
	}


}


master.handle('modelo',modelo);