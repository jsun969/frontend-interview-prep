'use strict';

const clock = document.getElementById('clock');

const CENTER_X = 12;
const CENTER_Y = 12;
const RADIUS = 10;
const NUMBER_SIZE = 2;

// Create numbers
for (let i = 1; i <= 12; i++) {
	const angle = ((i * 30 - 90) * Math.PI) / 180;
	const x = CENTER_X + RADIUS * Math.cos(angle);
	const y = CENTER_Y + RADIUS * Math.sin(angle);
	const number = document.createElement('div');
	number.classList.add('number');
	number.style.left = `${x - NUMBER_SIZE / 2}rem`;
	number.style.top = `${y - NUMBER_SIZE / 2}rem`;
	number.textContent = i;
	clock.appendChild(number);
}

const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');

const updateClock = () => {
	const now = new Date();
	const hours = now.getHours();
	const minutes = now.getMinutes();
	const seconds = now.getSeconds();
	const secondDegree = seconds * 6;
	const minuteDegree = minutes * 6 + seconds * 0.1;
	const hourDegree = (hours % 12) * 30 + minutes * 0.5;
	secondHand.style.transform = `rotate(${secondDegree}deg)`;
	minuteHand.style.transform = `rotate(${minuteDegree}deg)`;
	hourHand.style.transform = `rotate(${hourDegree}deg)`;
};

setInterval(updateClock, 200);
