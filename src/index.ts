import { Game } from './game';

let canvas = document.getElementById('canvas') as HTMLCanvasElement;
let game = new Game(canvas);

window.addEventListener('keydown', function(event){
  console.log(event.code);
	game.keyDown(event.code);
}, false);

window.addEventListener('keyup', function(event){
	game.keyUp(event.code);
}, false);
