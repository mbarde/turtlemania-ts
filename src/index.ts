import { Game } from './game';

let canvas = document.getElementById('canvas') as HTMLCanvasElement;
let game = new Game(canvas);

window.addEventListener('keydown', function(event){
	game.keyDown(event.code);
}, false);

window.addEventListener('keyup', function(event){
	game.keyUp(event.code);
}, false);
