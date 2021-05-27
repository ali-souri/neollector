const
    _ = require('lodash'),
	libFunctions = require('../../../lib/UsefulFunctions');

function Operate(inputs){//need to be developed, to get operation for comparison

    const model_object = inputs[0];//needs to be dynamic
    let attributes = inputs[1];

    if(attributes == '*' || attributes == 'all' || attributes == 'self'){
        attributes = model_object._data();
    }

    const model_var = libFunctions.getVariable(model_object);//needs to get developed for string value

    let query = '';

    let attributes_length = libFunctions.object_size(attributes);
    _.forEach(attributes, (value, key)=>{
        query += model_var+'.'+key+' = '+'\''+value+'\'';
        attributes_length--;
        if(attributes_length>0){
            query += ',';
        }
    });

    return query;

}

module.exports = Operate;