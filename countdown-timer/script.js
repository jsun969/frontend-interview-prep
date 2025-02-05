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

let remain = 0;
const updateTimer = () => {
	const timeStr = secondsToTimeString(remain);
	timerElement.innerText = timeStr;
};

let intervalId = null;

resetButtonElement.addEventListener('click', () => {
	clearInterval(intervalId);
	remain = 0;
	updateTimer();
});

startButtonElement.addEventListener('click', () => {
	remain = Number(durationInputElement.value);
	if (remain <= 0) {
		alert('Duration should be larger than 0');
		return;
	}
	updateTimer();
	durationInputElement.value = '';
	intervalId = setInterval(() => {
		if (remain === 0) {
			clearInterval(intervalId);
			return;
		}
		remain--;
		updateTimer();
	}, 1000);
});

stopButtonElement.addEventListener('click', () => {
	clearInterval(intervalId);
});

resetButtonElement.addEventListener('click', () => {
	remain = 0;
	updateTimer();
});
