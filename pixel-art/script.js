'use strict';
const SIZE = 30;

const boardElement = document.getElementById('board');
const penColorInputElement = document.getElementById('pen-color');

let drawing = false;
const enableDrawing = () => {
	drawing = true;
};
const disableDrawing = () => {
	drawing = false;
};

boardElement.addEventListener('mousedown', enableDrawing);
boardElement.addEventListener('mouseup', disableDrawing);
boardElement.addEventListener('mouseleave', disableDrawing);

const createPixel = () => {
	const pixel = document.createElement('div');
	pixel.className = 'pixel';
	pixel.addEventListener('mouseover', () => {
		if (!drawing) return;
		pixel.style.backgroundColor = penColorInputElement.value;
	});
	return pixel;
};

const boardChildrenFragment = document.createDocumentFragment();
boardChildrenFragment.append(...Array.from({ length: SIZE ** 2 }, createPixel));

boardElement.replaceChildren(boardChildrenFragment);
