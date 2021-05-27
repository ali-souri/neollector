const OGM = require('../../OGM');

/**
 * @NodeEntity(label="PModel")
 */
class TestModel4 extends OGM.Model {

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

		/**
		 * @Relationship(type="Related",direction="OUTGOING",model="tm5")
		 */
		this.at3 = [];
	}

}

OGM.register('tm4',TestModel4,__filename);

