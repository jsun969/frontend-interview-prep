'use strict';

const scoreDisplay = document.getElementById('score');

const gameCanvas = document.getElementById('game');
const game = gameCanvas.getContext('2d');

let gameLoopIntervalId = null;

const INIT_SNAKE = [
	[22, 25],
	[21, 25],
	[20, 25],
];

let snake = [...INIT_SNAKE];
let apple = [-1, -1];

const DIRECTIONS = {
	up: [0, -1],
	down: [0, 1],
	left: [-1, 0],
	right: [1, 0],
};
let currentDirection = 'right';

const KEY_TO_DIRECTION = {
	ArrowUp: 'up',
	ArrowDown: 'down',
	ArrowLeft: 'left',
	ArrowRight: 'right',
	w: 'up',
	s: 'down',
	a: 'left',
	d: 'right',
};
const INVALID_DIRECTION = {
	up: 'down',
	down: 'up',
	left: 'right',
	right: 'left',
};
document.addEventListener('keydown', (event) => {
	if (!Object.hasOwn(KEY_TO_DIRECTION, event.key)) return;
	const newDirection = KEY_TO_DIRECTION[event.key];
	if (currentDirection === INVALID_DIRECTION[newDirection]) {
		// Prevent reversing direction directly
		return;
	}
	currentDirection = newDirection;
});

const getNewHead = () => {
	const [headX, headY] = snake[0];
	const [directionX, directionY] = DIRECTIONS[currentDirection];
	let newHeadX = headX + directionX;
	if (newHeadX < 0) newHeadX = 49;
	if (newHeadX > 49) newHeadX = 0;
	let newHeadY = headY + directionY;
	if (newHeadY < 0) newHeadY = 49;
	if (newHeadY > 49) newHeadY = 0;
	const newHead = [newHeadX, newHeadY];
	return newHead;
};

const updateSnake = () => {
	// Update head
	const newHead = getNewHead();
	if (checkGameOver(newHead)) {
		clearInterval(gameLoopIntervalId);
		gameLoopIntervalId = null;
		return;
	}
	snake.unshift(newHead);
	snake.pop(); // Remove tail
	eatApple(newHead);
};
const checkGameOver = ([newHeadX, newHeadY]) => {
	// const hitBorder =
	// 	newHeadX < 0 || newHeadX > 49 || newHeadY < 0 || newHeadY > 49;
	const hitBody = snake.some(
		([bodyX, bodyY]) => newHeadX === bodyX && newHeadY === bodyY,
	);
	return hitBody;
};
const eatApple = ([newHeadX, newHeadY]) => {
	const [appleX, appleY] = apple;
	if (newHeadX === appleX && newHeadY === appleY) {
		const newHead = getNewHead();
		snake.unshift(newHead);
		generateApple();
	}
};

const gameLoop = () => {
	game.reset();
	updateSnake();
	scoreDisplay.textContent = String(snake.length - 3);
	snake.forEach(([x, y]) => {
		game.fillStyle = 'black';
		game.fillRect(x * 10, y * 10, 10, 10);
	});
	const [appleX, appleY] = apple;
	game.fillStyle = 'red';
	game.fillRect(appleX * 10, appleY * 10, 10, 10);
};

const getRandomInt = (max) => {
	return Math.floor(Math.random() * max);
};
const generateApple = () => {
	const newAppleX = getRandomInt(5);
	const newAppleY = getRandomInt(5);
	apple = [newAppleX, newAppleY];
	const appleOnSnake = snake.some(
		([snakeX, snakeY]) => newAppleX === snakeX && newAppleY === snakeY,
	);
	if (appleOnSnake) generateApple();
};

const speedInput = document.getElementById('speed');

const startGame = () => {
	snake = [...INIT_SNAKE];
	currentDirection = 'right';
	const speed = -speedInput.valueAsNumber;
	generateApple();
	if (gameLoopIntervalId) {
		clearInterval(gameLoopIntervalId);
		gameLoopIntervalId = null;
	}
	gameLoopIntervalId = setInterval(gameLoop, speed);
};

const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', startGame);

startGame();
