import { Turtle } from './turtle';

let canvas = document.getElementById('canvas') as
             HTMLCanvasElement;
let context = canvas.getContext('2d');
let turtle = new Turtle(context, {x: 50, y: 50});
turtle.draw();
