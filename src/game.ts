import { Coin } from './coin';
import { Turtle } from './turtle';
import { Vector2 } from './vector';

export class Game {

  private canvas: HTMLCanvasElement;
  private posTextCenter: Vector2;
  private posTextTimer: Vector2;
  private coins: Array<Coin>;
  private context: CanvasRenderingContext2D;
  private fps: number;
  private interval: NodeJS.Timeout;
  private started: boolean;
  private lastTick: number;
  private turtle: Turtle;
  private startTime: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.started = false;
    this.lastTick = Date.now();

    let tx = Math.floor(this.canvas.width / 2);
    let ty = Math.floor(this.canvas.height / 2);
    this.posTextCenter = new Vector2(tx, ty);
    this.posTextTimer = new Vector2(
      this.canvas.width - 30, this.canvas.height - 30);

    this.initEnitities();

    this.clearCanvas();
    this.drawText();
  }

  initEnitities() {
    this.turtle = new Turtle(this.context, this.posTextCenter.clone());
    let fieldSize = new Vector2(this.canvas.width, this.canvas.height);
    this.coins = [
      new Coin(this.context, fieldSize),
      new Coin(this.context, fieldSize),
      new Coin(this.context, fieldSize),
    ];
  }

  tick() {
    let now, ticks: number;
    now = Date.now();
    ticks = now - this.lastTick;
    this.update(ticks);
    this.draw();
    this.fps = 1000 / ticks;
    this.lastTick = now;
  }

  update(ticks: number) {
    this.turtle.update(ticks);
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
  }

  draw() {
    this.clearCanvas();
    this.turtle.draw();
    this.coins.forEach((coin) => {
      coin.draw();
    });
    this.drawText();
  }

  drawText() {
    let ctx: CanvasRenderingContext2D;
    ctx = this.context;

    if (this.started === false) {
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = 'white';
      ctx.font = '30px white Arial';
      ctx.textAlign = 'center';
      ctx.strokeText('Press [SPACE]',
        this.posTextCenter.x, this.posTextCenter.y);
    } else {
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = 'white';
      ctx.font = '15px white Arial';
      ctx.textAlign = 'center';
      ctx.strokeText(this.getPlayTime(),
        this.posTextTimer.x, this.posTextTimer.y);
    }
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

  getPlayTime(): string {
    return ((Date.now() - this.startTime) / 1000).toFixed(2);
  }

  stop() {
    this.started = false;
    clearInterval(this.interval);

    this.initEnitities();
    this.clearCanvas();
    this.drawText();
  }

  start() {
    this.started = true;
    this.lastTick = Date.now();
    this.startTime = this.lastTick;
    this.interval = setInterval(() => this.tick(), 1);
  }

  keyDown(keyCode: string) {
    if (keyCode === 'ArrowLeft') {
      this.turtle.turnLeft();
    }
    if (keyCode === 'ArrowRight') {
      this.turtle.turnRight();
    }
    if (keyCode === 'KeyR') {
      this.stop();
    }
  }

  keyUp(keyCode: string) {
    if (keyCode === 'Space') {
      if (this.started === false) this.start();
    }
  }

  getFPS(): number {
    return this.fps;
  }

}
