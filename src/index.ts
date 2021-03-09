import { Config } from './config';
import { Game } from './game';

// read parameters from script-tag
function getAttributeSafe(el: HTMLOrSVGScriptElement, attrName: string, defaultValue: string) {
	let value = el.getAttribute(attrName) as string;
	if (value === null) return defaultValue;
	return value;
}

let clr = document.currentScript.getAttribute('clr');
let coinColor, fontColor, frameColor, turtleColor: string;
if (clr === null) {
	coinColor = getAttributeSafe(document.currentScript, 'clr-coins', 'white');
	fontColor = getAttributeSafe(document.currentScript, 'clr-font', 'white');
	frameColor = getAttributeSafe(document.currentScript, 'clr-frame', 'white');
	turtleColor = getAttributeSafe(document.currentScript, 'clr-turtle', 'white');
} else {
	coinColor = clr;
	fontColor = clr;
	frameColor = clr;
	turtleColor = clr;
}

// get or create canvas
let canvas: HTMLCanvasElement;
let canvasId: string;
canvasId = 'turtlemania-canvas';
canvas = document.getElementById(canvasId) as HTMLCanvasElement;

if (canvas === null) {
	// if no canvas was found, create one :)
	canvas = document.createElement('canvas');
	canvas.id = canvasId;
	canvas.width = 750;
	canvas.height = 600;
	canvas.style.borderColor = frameColor;
	canvas.style.borderStyle = 'solid';
	canvas.style.borderWidth = '1px';
	canvas.style.display = 'block';
	canvas.style.margin = 'auto';

	let body: HTMLBodyElement;
	body = document.getElementsByTagName('body')[0];
	body.appendChild(canvas);
}

// init game
let config = new Config(coinColor, fontColor, turtleColor);
let game = new Game(canvas, config);

// set event handlers for input
window.addEventListener('keydown', function(event){
	game.keyDown(event.code);
}, false);

window.addEventListener('keyup', function(event){
	game.keyUp(event.code);
}, false);
