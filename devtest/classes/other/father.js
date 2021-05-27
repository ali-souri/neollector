
class father {
	constructor(cl) {
		this.cl = cl;
		// console.log(__dirname);
		// console.log(require.main);
		// console.log(process.cwd());
		// console.log(process.execPath);
		// console.log(require.main);
	}
		operate() {
			// console.log(this.t1);
			// console.log(__dirname);
			// console.log(process.cwd());
			// console.log(process.execPath);
			// console.log(require.main);
		}

		static info(){
		return require.main;
			// console.log(__dirname);
			// console.log(process.cwd());
			// console.log(process.execPath);
			// console.log(require.main);
		}
}

module.exports = father;