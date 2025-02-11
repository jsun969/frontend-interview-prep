const DIGITS_BAR = {
	0: [0, 1, 4, 5, 6, 3],
	1: [1, 4],
	2: [0, 1, 2, 6, 5],
	3: [0, 1, 2, 4, 5],
	4: [3, 2, 1, 4],
	5: [0, 3, 2, 4, 5],
	6: [0, 3, 2, 4, 5, 6],
	7: [3, 0, 1, 4],
	8: [0, 1, 2, 3, 4, 5, 6],
	9: [0, 1, 2, 3, 4, 5],
};
const ALL_BARS = [0, 1, 2, 3, 4, 5, 6];

const UNITS = ['hour', 'minute', 'second'];
const barElements = Object.fromEntries(
	UNITS.map((unit) => [
		unit,
		Array.from({ length: 2 }, (_, i) =>
			Array.from({ length: 7 }, (_, j) => {
				const id = `digit-${unit}-${i}-bar-${j}`;
				return document.getElementById(id);
			}),
		),
	]),
);

const DIGIT_ON_CLASSNAME = 'digit__bar--on';
const DIGIT_OFF_CLASSNAME = 'digit__bar--off';

const setDigit = (unit, index, number) => {
	const onBars = DIGITS_BAR[number];
	const offBars = ALL_BARS.filter((b) => !onBars.includes(b));
	onBars.forEach((bar) => {
		barElements[unit][index][bar].classList.remove(DIGIT_OFF_CLASSNAME);
		barElements[unit][index][bar].classList.add(DIGIT_ON_CLASSNAME);
	});
	offBars.forEach((bar) => {
		barElements[unit][index][bar].classList.remove(DIGIT_ON_CLASSNAME);
		barElements[unit][index][bar].classList.add(DIGIT_OFF_CLASSNAME);
	});
};

setInterval(() => {
	const now = new Date();
	const hour = now.getHours();
	const minute = now.getMinutes();
	const second = now.getSeconds();
	const hourStr = String(hour).padStart(2, '0');
	const minuteStr = String(minute).padStart(2, '0');
	const secondStr = String(second).padStart(2, '0');
	setDigit('hour', 0, hourStr[0]);
	setDigit('hour', 1, hourStr[1]);
	setDigit('minute', 0, minuteStr[0]);
	setDigit('minute', 1, minuteStr[1]);
	setDigit('second', 0, secondStr[0]);
	setDigit('second', 1, secondStr[1]);
}, 1000);
