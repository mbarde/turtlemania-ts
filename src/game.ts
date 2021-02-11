import { Coin } from './coin';
import { Turtle } from './turtle';
import { Vector2 } from './vector';

export class Game {

  private canvas: HTMLCanvasElement;
  private coins: Array<Coin>;
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

    let tx = Math.floor(this.canvas.width / 2);
    let ty = Math.floor(this.canvas.height / 2);
    this.turtle = new Turtle(this.context, new Vector2(tx, ty));

    let fieldSize = new Vector2(this.canvas.width, this.canvas.height);
    this.coins = [
      new Coin(this.context, fieldSize),
      new Coin(this.context, fieldSize),
      new Coin(this.context, fieldSize),
    ];

    this.resume();
  }

  update() {
    let now, ticks: number;

    now = Date.now();
    ticks = now - this.lastUpdate;

    this.turtle.update(ticks);
    this.clearCanvas();
    this.turtle.draw();

    for (let i = 0; i < this.coins.length; i++) {
      this.coins[i].update();
      this.coins[i].draw();
      if (this.coins[i].touchedByTurtle(this.turtle)) {
        setTimeout(
          () => { this.removeCoin(this.coins[i]); },
          1000
        );
      }
    }

    this.fps = 1000 / ticks;
    this.lastUpdate = now;
  }

  removeCoin(coin: Coin) {
    let idx: number;
    idx = 0;
    while (this.coins[idx] != coin) {
      idx += 1;
    }
    if (idx < this.coins.length) {
      this.coins.splice(idx, 1);
    }
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
  }

  resume() {
    this.isPaused = false;
    this.lastUpdate = Date.now();
    this.interval = setInterval(() => this.update(), 1);
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

  getFPS(): number {
    return this.fps;
  }

}
