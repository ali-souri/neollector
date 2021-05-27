'use strict';
const OGM = require('../../OGM');

/**
 * @NodeEntity(label="TModel")
 */
class TestModel extends OGM.Model {

	constructor(name,at1){
		super();

		/**
		 * @Property(type="string")
		 */
		this.name = name;

		/**
		 * @Property(type="string")
		 */
		this.at1 = at1;

		/**
		 * @Relationship(type="Related",direction="OUTGOING",model="tm2")
		 */
		this.at2 = [];

	}


}

OGM.register('tm',TestModel,__filename);

