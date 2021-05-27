'use strict';

const
	Neolector = require('../../index'),
	CQL = new Neolector.Query.CQL(),
	schema = Neolector.Schema,
	chai = require('chai');
chai.should();
chai.use(require('sinon-chai'));

describe('Test Of CQL Part Of The Neolector , string and schema query parts: ', () => {

	it('should make cql string of a simple Create and return query', function () {
		const query = CQL.CREATE('( n:person {age:25,height:100,eyecolor:"brown"} ) ').RETURN('n').END().GenerateQuery();
		query.should.to.equal('CREATE  ( n:person {age:25,height:100,eyecolor:"brown"} )  RETURN  n   ;\n');
	});

	it('should make cql string of a simple Match and return query', function () {
		const query = CQL.MATCH('( n:person {age:25,height:100,eyecolor:"brown"} ) ').RETURN('n').END().GenerateQuery();
		query.should.to.equal('MATCH  ( n:person {age:25,height:100,eyecolor:"brown"} )  RETURN  n   ;\n');
	});

	it('should make cql string of a Create and return query used upon a schema object', function () {
		const userModel = new schema({
			label: 'User',
			variable: 'us',
			type: 'node'
		},{
			type: "object",
			properties:{
				age: {type: 'number'},
				height: {type: 'number'},
				eyecolor: {type: 'string'}
			}
		});
		const user1 = userModel.build({age: 26,height: 100,eyecolor: 'brown'});
		const query = CQL.CREATE(user1).RETURN(user1).END().GenerateQuery();
		query.should.to.equal('CREATE  ( us:User {age:26,height:100,eyecolor:"brown"} ) RETURN  us   ;\n');
	});

	it('should make cql string of a Match and return query used upon a schema object', function () {
		const userModel = new schema({
			label: 'User',
			variable: 'us',
			type: 'node'
		},{
			type: "object",
			properties:{
				age: {type: 'number'},
				height: {type: 'number'},
				eyecolor: {type: 'string'}
			}
		});
		const user1 = userModel.build({age: 26,height: 100,eyecolor: 'brown'});
		const query = CQL.MATCH(user1).RETURN(user1).END().GenerateQuery();
		query.should.to.equal('MATCH  ( us:User {age:26,height:100,eyecolor:"brown"} ) RETURN  us   ;\n');
	});

});

