const
	_ = require('lodash'),
	EntityIterator = require('./EntityHierarchyIterator');

const DriverParser = class {

	constructor(result) {
		this._result = result;
		this._records = result.records;
		this._summary = result.summary;
	}


	get result() {
		return this._result;
	}

	set result(value) {
		this._result = value;
	}

	get records() {
		return this._records;
	}

	set records(value) {
		this._records = value;
	}

	get summary() {
		return this._summary;
	}

	set summary(value) {
		this._summary = value;
	}

	getAllRecordsData() {
		const AllRecordsData = [];
		_.forEach(this._records, (record) => {
			AllRecordsData.push(record.properties);
		});
		return AllRecordsData;
	}

	getAllRecordsFields() {
		const AllRecordsData = [];
		_.forEach(this._records, (record) => {
			AllRecordsData.push(record._fields[0].properties);
		});
		return AllRecordsData;
	}

	getSingleRecordData() {
		return this._records[0].get(0).properties;
	}

	getCountQueryNumber() {
		return this._records[0]._fields[0].low;
	}

	getID(singleRecord) {
		if (singleRecord) {
			return this._records[0].get(0).low;
		}
		return this._records[0].get(0).properties.id;
	}

	getIntegerKeyValueObject() {
		const lookUp = this.getFirstFieldLookup();
		const fields = this.getFirstFields();

		const returnObject = {};

		_.forEach(lookUp, (value, key) => {
			returnObject[key] = fields[value].low;
		});

		return returnObject;
	}

	getFirstFieldLookup() {
		return this._records[0]._fieldLookup;
	}

	getFirstFields() {
		return this._records[0]._fields;
	}

	modifyOGMEntity(entity) {
		entity.refillData(this.getSingleRecordData());
		return entity;
	}

	deepModifyOGMEntity(entity,OGMSource) {
		let root_entity = entity;
		const entity_array = [];
		_.forEach(this._records, (record) => {
			if (_.isUndefined(root_entity)) {
				return;
			}
			let iterator = new EntityIterator(_.clone(root_entity),OGMSource);
			root_entity = iterator.RecursiveCustomIterate((inputEntity) => {
				if (_.includes(record.keys, inputEntity._variable)) {
					const NodeEntity = record._fields[record._fieldLookup[inputEntity._variable]];
					inputEntity.identity = NodeEntity.identity.low;
					inputEntity.refillData(NodeEntity.properties);
					return inputEntity;
				}
			});
			entity_array.push(root_entity);
		});
		return entity_array;
	}

};

module.exports = DriverParser;