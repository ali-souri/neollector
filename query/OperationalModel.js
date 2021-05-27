
const GeneralExpression = class {
	//dynamic method
};

const GeneralPhrase = class {
	constructor(starter,expression,terminator = false){
		this._starter = starter;
		this._expression = expression;
		this._terminator = terminator;
	}

	get starter() {
		return this._starter;
	}

	set starter(value) {
		this._starter = value;
	}

	get expression() {
		return this._expression;
	}

	set expression(value) {
		this._expression = value;
	}

	get terminator() {
		return this._terminator;
	}

	set terminator(value) {
		this._terminator = value;
	}
};

const GeneralModel = class {

	constructor(phrases = []){
		//maybe an id

		this._phrases = phrases;
	}

	get phrases() {
		return this._phrases;
	}

	set phrases(value) {
		this._phrases = value;
	}

	addExpression(phrase){
		this._phrases.push(phrase);
	}

};

module.exports = {
	GeneralExpression,
	GeneralModel,
	GeneralPhrase
};