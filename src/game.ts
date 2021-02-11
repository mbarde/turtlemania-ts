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
    let hitCoins: Array<number>;

    now = Date.now();
    ticks = now - this.lastUpdate;

    this.turtle.update(ticks);
    this.clearCanvas();
    this.turtle.draw();

    hitCoins = [];
    for (let i = 0; i < this.coins.length; i++) {
      this.coins[i].draw();
      if (this.coins[i].touchedByTurtle(this.turtle)) {
        hitCoins.push(i);
      }
    }
    // remove all coins which were hit by turtle
    hitCoins.forEach((index) => this.coins.splice(index, 1));

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
