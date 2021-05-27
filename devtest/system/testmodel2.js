const OGM = require('../../OGM');

/**
 * @NodeEntity(label="SModel")
 */
class TestModel2 extends OGM.Model {

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
		 * @Relationship(type="Related",direction="OUTGOING",model="tm3")
		 */
		this.at3 = [];
	}

}

OGM.register('tm2',TestModel2,__filename);

