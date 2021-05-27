const father = require('./other/father');

var master = require('../goodies/master');


/**
 * @AnnotationEntity(info2="Test Text",info="WOW Text")
 */
class model extends father{

	constructor(t12){
		super();
		this.t1 = t12;
		this.name = 'testing';
	}

}

// console.log('-------------<>-------------');
// console.log(typeof model);

master.handle('model',model);

// module.exports = model;