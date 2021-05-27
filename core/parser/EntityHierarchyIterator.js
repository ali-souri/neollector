const
    _ = require('lodash'),
    Process = require('../process/ProcessHandler');


class EntityHierarchyIterator {

    constructor(entity,OGMSource){
        this._entity = entity;
        this._OGMSource = OGMSource;
    }

    get entity(){
        return this._entity;
    }

    set entity(value){
        this._entity = value;
    }

    RecursiveCustomIterate(OperationCallback, iteratee = this._entity){
        iteratee = OperationCallback(iteratee);
        _.forEach(iteratee.GetRelationships(),(relation_objects,relation_key)=>{
            if(relation_objects.length){
                // console.log('relation_objects');
                // console.log(relation_objects);
                // _.forEach(relation_objects,(relation_object)=>{
                //     iteratee = this.RecursiveCustomIterate(OperationCallback,_.clone(relation_object));
                // });
            }else{
                const OGMModel = this._OGMSource.getModel(iteratee.MetaData().relationships[relation_key].model);
                if (!_.isUndefined(OGMModel)) {
                    const OGMObjectVariable = OGMModel.__staticMetaData.variable
                    let OGMObject = new OGMModel();
                    OGMObject._variable = OGMObjectVariable;
                    OGMObject = this.RecursiveCustomIterate(OperationCallback,OGMObject);
                    // console.log('OGMObject');
                    // console.log(OGMObject);
                    iteratee[relation_key].push(OGMObject);   
                }
            }
        });
        return iteratee;
    }

}

module.exports = EntityHierarchyIterator;