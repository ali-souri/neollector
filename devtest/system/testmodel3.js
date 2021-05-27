const OGM = require('../../OGM');

/**
 * @NodeEntity(label="QModel")
 */
class TestModel3 extends OGM.Model {

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
		 * @Relationship(type="Related",direction="OUTGOING",model="tm4")
		 */
        this.at4 = [];
        
        /**
		 * @Relationship(type="Related",direction="OUTGOING",model="tm5")
		 */
		this.at5 = [];
	}

}

OGM.register('tm3',TestModel3,__filename);

