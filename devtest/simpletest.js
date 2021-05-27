const
	Neolector = require('../index'),
	schema = Neolector.Schema;

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

	const user1 = userModel.build({name:'Karo'});

	user.save();
	// user.delete();
	// user2.save();

	
	// userbuilt.save();

	console.log("at last");
	
	const calls = async ()=>{
		const waste1 = await user1.read();
		console.log(waste1);
	}

	calls();



