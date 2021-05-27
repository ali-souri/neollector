const 
    _ = require('lodash'),
    randString = require('randomstring');

class GraphSchema {

    constructor(schema_object={}){
        this._systematic_position_name = 'Graph_Schema';
        this._schema_object = schema_object;
        this._root_title = schema_object.title;
    }

    setSchema(schemaName, schema){
        this._schema_object[schemaName] = schema;
    }

    internalRootSchemaMetaData(){
        return this.schemaToMetaData(this._schema_object)
    }

    getRootRelationshipsNames(){
        const names = []
        _.forEach(this._schema_object.properties, (property_object, property_name)=>{
            if (_.isEqual(property_object.propertyType,'relation')) {
                names.push(property_name);
            }
        })
        return names;
    }

    getRootPropertyNames(){
        const names = []
        _.forEach(this._schema_object.properties, (property_object, property_name)=>{
            if (_.isEqual(property_object.propertyType,'property')) {
                names.push(property_name);
            }
        })
        return names;
    }

    schemaToMetaData(schema){
        const Metadata = {}
        // let schema = this._schema_object[schemaName]
        // let schema = this._schema_object

        // console.log(schema)
        if (schema instanceof String) {
            schema = JSON.parse(schema)
        }

        Metadata['address'] = 'none';
        Metadata['target'] = schema.title;
        Metadata['label'] = schema.title;
        Metadata['obj_name'] = schema.title;
        Metadata['type'] = schema.modelType;
        Metadata['variable'] = randString.generate({
			length: 10,
			charset: 'alphabetic'
        });
        Metadata['properties'] = {};
        Metadata['relationships'] = {};

        _.forEach(schema.properties, (property_object, property_name)=>{
            if (_.isEqual(property_object.propertyType,'relation')) {
                Metadata['relationships'][property_name] = {
                    type: property_object.relationInfo.labels[0],
                    model: property_name,
                    direction: property_object.direction || 'OUTGOING',
                    variable: 'none'
                }
            } else {
                Metadata['properties'][property_name] = {
                    type: property_object.type,
                    optional: _.includes(schema.required, property_name)
                }
            }
        })

        return Metadata;

    }

    OGMToSchema(){

    }


}

module.exports = GraphSchema;