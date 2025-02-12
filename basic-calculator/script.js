const DIGIT_VALUES = {
	one: '1',
	two: '2',
	three: '3',
	four: '4',
	five: '5',
	six: '6',
	seven: '7',
	eight: '8',
	nine: '9',
	zero: '0',
};

const SYMBOLS = {
	plus: '+',
	minus: '-',
	multiply: '*',
	divide: '/',
};

const resultElement = document.getElementById('result');
const clearButtonElement = document.getElementById('clear');
const equalButtonElement = document.getElementById('equal');

let expression = '';

const appendDigit = (digit) => {
	resultElement.textContent += digit;
};
const clearCalculator = () => {
	resultElement.textContent = '';
	expression = '';
};
const appendSymbol = (symbol) => {
	expression += resultElement.textContent;
	expression += symbol;
	resultElement.textContent = '';
};
const getResult = () => {
	expression += resultElement.textContent;
	resultElement.textContent = eval(expression);
	expression = '';
};

clearButtonElement.addEventListener('click', clearCalculator);
Object.entries(DIGIT_VALUES).forEach(([id, value]) => {
	const element = document.getElementById(id);
	element.addEventListener('click', () => {
		appendDigit(value);
	});
});
Object.entries(SYMBOLS).forEach(([id, action]) => {
	const element = document.getElementById(id);
	element.addEventListener('click', () => {
		appendSymbol(action);
	});
});
equalButtonElement.addEventListener('click', getResult);

const DIGIT_SET = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
const SYMBOL_SET = new Set(['+', '-', '*', '/']);
document.addEventListener('keydown', ({ key }) => {
	if (DIGIT_SET.has(key)) {
		appendDigit(key);
	} else if (SYMBOL_SET.has(key)) {
		appendSymbol(key);
	} else if (key === 'c' || key === 'C') {
		clearCalculator();
	} else if (key === '=' || key === 'Enter') {
		getResult();
	}
});
