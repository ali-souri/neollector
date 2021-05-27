'use strict';

const
	{id,
	COUNT,} = require('../../query/lib/index'),
	Neolector = require('../../index'),
	schema = Neolector.Schema,
	chai = require('chai');
chai.should();
chai.use(require('sinon-chai'));

describe('Test Of CQL Part Of The Neolector', () => {

	it('should make some simple CQL query functions', function () {
		const variable = 'variable';
		id(variable).should.to.equal(' id(variable) ');
		COUNT(variable).should.to.equal(' COUNT(variable) ');
	});

	it('should make some CQL query functions from schema object', function () {

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

		const user1 = userModel.build({name: 'Ali',age: 26,height: 100,eyecolor: 'brown'});

		id(user1).should.to.equal(' id(us) ');
		COUNT(user1).should.to.equal(' COUNT(us) ');

	});

});