const startButtonElement = document.getElementById('start-button');
const stopButtonElement = document.getElementById('stop-button');
const resetButtonElement = document.getElementById('reset-button');

const durationInputElement = document.getElementById('duration-input');
const timerElement = document.getElementById('timer');

/**
 * Convert duration to timer string
 * @param {number} duration in seconds
 * @returns {string} timer string mm:ss
 * @example
 * secondsToTimeString(90) // 01:30
 */
const secondsToTimeString = (duration) => {
	const minutes = Math.floor(duration / 60);
	const seconds = duration % 60;
	const minutesStr = String(minutes).padStart(2, '0');
	const secondsStr = String(seconds).padStart(2, '0');
	return `${minutesStr}:${secondsStr}`;
};

const initialData = { remain: 0 };
const data = new Proxy(initialData, {
	set: (target, prop, newValue, receiver) => {
		// update timer
		if (prop === 'remain') {
			const timeStr = secondsToTimeString(newValue);
			timerElement.textContent = timeStr;
		}
		return Reflect.set(target, prop, newValue, receiver);
	},
});

let intervalId = null;

const startTimer = () => {
	if (intervalId) return;
	// check if there's new input and reset timer
	if (durationInputElement.value) {
		data.remain = Number(durationInputElement.value);
		if (data.remain <= 0) {
			alert('Duration should be larger than 0');
			return;
		}
		durationInputElement.value = '';
	}
	intervalId = setInterval(() => {
		if (data.remain === 0) {
			clearInterval(intervalId);
			intervalId = null;
			return;
		}
		data.remain--;
	}, 1000);
};
const stopTimer = () => {
	clearInterval(intervalId);
	intervalId = null;
};
const resetTimer = () => {
	clearInterval(intervalId);
	intervalId = null;
	data.remain = 0;
};

resetButtonElement.addEventListener('click', resetTimer);
startButtonElement.addEventListener('click', startTimer);
stopButtonElement.addEventListener('click', stopTimer);
