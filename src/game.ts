import { Turtle } from './turtle';
import { Vector2 } from './vector'

export class Game {

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private fps: number;
  private interval: NodeJS.Timeout;
  private isPaused: boolean;
  private lastUpdate: number;
  private turtle: Turtle;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.isPaused = false;
    this.lastUpdate = Date.now();
    this.turtle = new Turtle(this.context, new Vector2(250, 250));

    this.resume();
  }

  update() {
    let now, ticks: number;
    now = Date.now();
    ticks = now - this.lastUpdate;

    this.turtle.update(ticks);
    this.clearCanvas();
    this.turtle.draw();

    this.fps = 1000 / ticks;
    this.lastUpdate = now;
  }

  clearCanvas() {
    this.context.clearRect(
      0, 0,
      this.canvas.width, this.canvas.height
    );
  }

  pause() {
    this.isPaused = true;
    clearInterval(this.interval);
    console.log(this.interval);
  }

  resume() {
    this.isPaused = false;
    this.lastUpdate = Date.now();
    this.interval = setInterval(() => this.update(), 50);
  }

  keyDown(keyCode: string) {
    if (keyCode === 'Space') {
      if (this.isPaused === true) this.resume()
      else this.pause()
    }
    if (keyCode === 'ArrowLeft') {
      this.turtle.turnLeft();
    }
    if (keyCode === 'ArrowRight') {
      this.turtle.turnRight();
    }
  }

  keyUp(keyCode: string) {

  }

  getFPS() {
    return this.fps;
  }

}
