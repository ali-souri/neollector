// var ref = require('reflect-metadata');
//
// class C {
// 	// @Reflect.metadata('key', 'value')
// 	method() {
// 	}
// }
//
// console.log(Reflect);
// console.log(ref);
//
// ref.defineMetadata('key', 'value', C.prototype, "method");
//
//
// // function logType(target, key) {
// // 	var t = Reflect.getMetadata("design:type", target, key);
// // 	console.log(`${key} type: ${t.name}`);
// // }
//
//
// var c = new C();
// let metadataValue = ref.getMetadata('key', c, "method");
//
// console.log(metadataValue);


// var master = require('./goodies/master');
// require('./classes/model');
// import modelo from './classes/modelo';
// require('./classes/modelo');

// var father = require('./classes/other/father');

// var model = require('./classes/model');//needs var delete
// var tor = {0:1};

// console.log(master.metadata);

// var model = master.objects.model;


// console.log('instance of?');

// console.log(typeof tor.operate === 'function' ) ;

// if (typeof tor.operate === 'function' ){
// 	console.log('woho');
// }

// console.log(typeof model.info === 'function' );

// var md = new model('123');
// var mdo = new modelo('123');
// md.t1 = '321';
// console.log("mdt1");
// console.log(md.t1);

// md.operate();
// mdo.operate();
// console.log(typeof process.env.model);
// console.log(process.env.modelo);


// console.log(module.paths);

// var

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

	// user.save();
	// user2.save();

	
	// userbuilt.save();

	console.log("at last");
	
	const calls = async ()=>{
		const waste =  await user.readAll();
		console.log(waste.length);
		const waste1 = await user1.read();
		console.log(waste1);
	}

	calls();



