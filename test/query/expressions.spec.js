'use strict';

const
	Neolector = require('../../index'),
	CQL = new Neolector.Query.CQL(),
	schema = Neolector.Schema,
	chai = require('chai');
chai.should();
chai.use(require('sinon-chai'));

describe('Test Of CQL Part Of The Neolector ==> convention query parts: ', () => {

	it('should make cql string of a Match and return query with $_node convention:', function () {
		const query = CQL.MATCH({
			$_node : {
				data: {
					age: 25,
					height: 100,
					eyecolor: 'brown'
				},
				label: 'person',
				variable: 'n'
			}
		}).RETURN('n').END().GenerateQuery();
		query.should.to.equal('MATCH  ( n:person {age:25,height:100,eyecolor:"brown"} ) RETURN  n   ;\n');
	});


	it('should make cql string of a Match and return query with $_connect convention:', function () {
		const query = CQL.MATCH({
			$_connect :[
				[{
					data: {
						age: 26,
						height: 100,
						eyecolor: 'brown'
					},
					label: 'person',
					variable: 'n'
				},{
					data: {
						age: 25,
						height: 1000,
						eyecolor: 'red'
					},
					label: 'person',
					variable: 'm'
				}],
				{
					data: {
						age: 30,
						height: 1000,
						eyecolor: 'blue'
					},
					label: 'relationship',
					variable: 'p'
				}
			]}).RETURN('n , m , p').END().GenerateQuery();
		query.should.to.equal('MATCH  (n:person {age:26,height:100,eyecolor:"brown"})-[p:relationship {age:30,height:1000,eyecolor:"blue"}]->(m:person {age:25,height:1000,eyecolor:"red"}) RETURN  n , m , p   ;\n');
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
		const query = CQL.CREATE({$_node: user1}).RETURN(user1).END().GenerateQuery();
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
		const query = CQL.MATCH({$_node: user1}).RETURN(user1).END().GenerateQuery();
		query.should.to.equal('MATCH  ( us:User {age:26,height:100,eyecolor:"brown"} ) RETURN  us   ;\n');
	});

	it('should make cql string of a Match and return query with $_connect convention and schema objects:', function () {

		const userModel = new schema({
			label: 'User',
			variable: 'us',
			type: 'node'
		},{
			type: "object",
			properties:{
				name: {type: 'string'},
				age: {type: 'number'},
				height: {type: 'number'},
				eyecolor: {type: 'string'}
			}
		});

		const connectionModel = new schema({
			label: 'Loves',
			variable: 'r',
			type: 'connection'
		},{
			type: "object",
			properties:{
				amount: {type: 'number'},
				like: {type: 'string'}
			}
		});

		const user1 = userModel.build({name: 'Ali',age: 26,height: 100,eyecolor: 'brown'});

		const user2 = userModel.build({name: 'Amin',age: 27,height: 110,eyecolor: 'blue'});

		user2.variable = 'us2';

		const connection1 = connectionModel.build({amount:100,like:'a dog!'});

		const query = CQL.MATCH({
			$_connect :[
				[user1,user2],
				connection1
			]}).RETURN([user1,user2,connection1]).END().GenerateQuery();
		query.should.to.equal('MATCH  (us:User {name:"Ali",age:26,height:100,eyecolor:"brown"})-[r:Loves {amount:100,like:"a dog!"}]->(us2:User {name:"Amin",age:27,height:110,eyecolor:"blue"}) RETURN  us , us2 , r   ;\n');
	});

});

