const OGM = require('../../OGM');

/**
 * @NodeEntity(label="RModel")
 */
class TestModel5 extends OGM.Model {

	constructor(name,at2){
		super();

		/**
		 * @Property(type="string")
		 */
		this.name = name;

		/**
		 * @Property(type="string")
		 */
		this.at2 = at2;

	}

}

OGM.register('tm5',TestModel5,__filename);