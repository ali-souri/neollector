# Neollector

- Neollector is a modeling/OGM library in Node.js for Neo4j
- It has two major style for creation of model objects
- For every style there are customized and special set of tools
- First style is called 'Simple Modeling' which has a simple and basic syntax and tools and can be useful for small and fast operations
- Second style is 'OGM' the main style which has complete relational model for Nodes and Relationships 
- there are some important tools like query builder which works upon both simple and OGM objects

## Simple Modeling
Model objects in simple modeling are really simple 

	const
	Neolector = require('[neollector-index]'), // until publish on npm
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

	const user = userModel.build({name:'Ali',age: 26,height: 170,eyecolor: 'brown'});

	user.save();
	
	
as you can see the simple modeling object receives two objects as input, the first one is metadata which determines what kind of a graph object the model is going to be and the second one is the schema of the data inside the graph entity itself which is based on 'jsonschema' rules and regulations


## OGM
An OGM object may seem a little more complicated like `User.js`,

	const OGM = require('Neollector/OGM');
	/**
 	* @NodeEntity(label="User")
 	*/
	class UserModel extends OGM.Model {

		constructor(name,age){
			super();
			
			/**
			 * @Property(type="string")
			 */
			this.name = name;

			/**
			 * @Property(type="string")
			 */
			this.age = age;

		}
	}
	OGM.register('User',UserModel,__filename);
	
in these objects all metadata entities come in the comments (as annotations)
and a very simple usage for these objects could be like this,

	const OGM = require('Neollector/OGM'),
	User = OGM .getModel('User'),
	SessionFactory = require('Neollector/OGM/SessionFactory'),
	Configuration = require('Neollector/OGM/Configuration/Configuration'),
	const config = {
		OGM_Source: OGM, 
		uri:'bolt://localhost:7687',
		username: 'neo4jusername', 
		password: 'neo4jpassword'
	};
	
	const userObject = new User('Ali', 27);
	
	const confObject = Configuration.Builder().readFromFile(conf_file).build();
	
	const sessionfactory = new SessionFactory(confObject);
	
	const session = sessionfactory.openSession(OGM)
	
	session.save(userObject);
	
Further documentations are about to be published.

