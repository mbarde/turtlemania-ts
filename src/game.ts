import { Turtle } from './turtle';

export class Game {

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private turtle: Turtle;
  private interval: NodeJS.Timeout;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.turtle = new Turtle(this.context, {x: 50, y: 50});
    this.interval = setInterval(() => this.update(), 1000);
  }

  update() {
    this.turtle.update();
    this.clearCanvas();
    this.turtle.draw();
  }

  clearCanvas() {
    this.context.clearRect(
      0, 0,
      this.canvas.width, this.canvas.height
    );
  }

  stop() {
    clearInterval(this.interval);
  }

}
