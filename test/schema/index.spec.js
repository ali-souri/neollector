'use strict';

const
	Neolector = require('../../index'),
	schema = Neolector.Schema,
	chai = require('chai');
chai.should();
chai.use(require('sinon-chai'));

describe('Test Of Schema Part Of The Neolector including Schema object instance  ', () => {

	it('should make a model , an instance of it and check the basic methods ', function () {

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

		const user = userModel.build({name:'Ali',age: 26,height: 100,eyecolor: 'brown'});

		user.name.should.to.equal('Ali');
		user.age.should.to.equal(26);
		user.height.should.to.equal(100);
		user.eyecolor.should.to.equal('brown');

		user.name.should.to.equal(user.data.name);
		user.age.should.to.equal(user.data.age);
		user.height.should.to.equal(user.data.height);
		user.eyecolor.should.to.equal(user.data.eyecolor);

		user.name = 'Amin';
		user.age = 28;

		user.name.should.to.equal('Amin');
		user.age.should.to.equal(28);

		user.name.should.to.equal(user.data.name);
		user.age.should.to.equal(user.data.age);

	});


});

