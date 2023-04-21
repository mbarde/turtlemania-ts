import { Config } from './config';
import { Game } from './game';

// read parameters from script-tag
function getAttributeSafe(el: HTMLOrSVGScriptElement, attrName: string, defaultValue: string) {
	let value = el.getAttribute(attrName) as string;
	if (value === null) return defaultValue;
	return value;
}

let clr = document.currentScript.getAttribute('clr');
let fontColor: string;
if (clr === null) {
	fontColor = getAttributeSafe(document.currentScript, 'clr-font', 'black');
} else {
	fontColor = clr;
}

// get canvas and set dimensions
let canvas: HTMLCanvasElement;
let canvasId: string;
canvasId = 'turtlemania-canvas';
canvas = document.getElementById(canvasId) as HTMLCanvasElement;
canvas.height = canvas.clientHeight;
canvas.width = canvas.clientWidth;

let gameConfig = new Config(fontColor);
let game = new Game(canvas, gameConfig)

// input event handlers
window.addEventListener('keydown', (event) => {
	if (event.code == 'Space' || event.code.startsWith('Arrow')) {
		// avoid scrolling when playing embedded
		event.preventDefault();
	}
	if (event.code == 'KeyF') {
		enterFullscreen();
		return;
	}
	game.keyDown(event.code);	
}, false);

window.addEventListener('keyup', (event) => {
	game.keyUp(event.code);
}, false);

canvas.addEventListener('touchstart', (event) => {
	event.preventDefault();
	event.stopPropagation();
	game.touchStart(event);
	return false;
}, false);

canvas.addEventListener('touchend', (event) => {
	event.preventDefault();
	event.stopPropagation();
	game.touchEnd();
	return false;
}, false);

let btnFullscreen = document.getElementById('btn-fullscreen');
if (btnFullscreen !== null) {
	btnFullscreen.addEventListener('click', enterFullscreen);
}

function enterFullscreenForElement(element: any) {
	if(element.requestFullscreen) {
		element.requestFullscreen();
	} else if(element.msRequestFullscreen) {
		element.msRequestFullscreen();
	} else if(element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	}
}

function enterFullscreen() {
	enterFullscreenForElement(canvas);
}
