import { Config } from './config';
import { Game } from './game';

const CANVAS_MAX_WIDTH = 800;
const CANVAS_MAX_HEIGHT = 500;

// read parameters from script-tag
function getAttributeSafe(el: HTMLOrSVGScriptElement, attrName: string, defaultValue: string) {
	let value = el.getAttribute(attrName) as string;
	if (value === null) return defaultValue;
	return value;
}

let clr = document.currentScript.getAttribute('clr');
let coinColor, fontColor, turtleColor: string;
if (clr === null) {
	coinColor = getAttributeSafe(document.currentScript, 'clr-coins', 'white');
	fontColor = getAttributeSafe(document.currentScript, 'clr-font', 'white');
	turtleColor = getAttributeSafe(document.currentScript, 'clr-turtle', 'white');
} else {
	coinColor = clr;
	fontColor = clr;
	turtleColor = clr;
}

// get canvas and set dimensions
let canvas: HTMLCanvasElement;
let canvasId: string;
canvasId = 'turtlemania-canvas';
canvas = document.getElementById(canvasId) as HTMLCanvasElement;
canvas.width = window.screen.width > CANVAS_MAX_WIDTH ? CANVAS_MAX_WIDTH : window.screen.width;
canvas.height = window.screen.height > CANVAS_MAX_HEIGHT ? CANVAS_MAX_HEIGHT : window.screen.height;

if (canvas.width === window.screen.width) {
	// remove border left and right to avoid horizontal scrollbar
	canvas.style.borderLeft = 'none';
	canvas.style.borderRight = 'none';
}

let gameConfig = new Config(coinColor, fontColor, turtleColor);
let game = new Game(canvas, gameConfig)

// input event handlers
window.addEventListener('keydown', (event) => {
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
	game.touchStart(event);
	return false;
}, false);

canvas.addEventListener('touchend', () => {
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
