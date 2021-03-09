import { Coin } from './coin';
import { Config } from './config';
import { Turtle } from './turtle';
import { Vector2 } from './vector';

export class Game {

  private canvas: HTMLCanvasElement;
  private coins: Array<Coin>;
  private coinsAlive: number;
  private config: Config;
  private context: CanvasRenderingContext2D;
  private finalTime: string;
  private fps: number;
  private interval: NodeJS.Timeout;
  private lastTick: number;
  private posTextCenter: Vector2;
  private posTextTimer: Vector2;
  private started: boolean;
  private startTime: number;
  private turtle: Turtle;

  constructor(canvas: HTMLCanvasElement, config: Config) {
    this.canvas = canvas;
    this.config = config;
    this.context = canvas.getContext('2d');
    this.started = false;
    this.lastTick = Date.now();
    this.finalTime = '';

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
    let fieldSize = new Vector2(this.canvas.width, this.canvas.height);
    this.turtle = new Turtle(
      this.context, this.posTextCenter.clone(),
      fieldSize, this.config.turtleColor
    );
    this.coins = [
      new Coin(this.context, fieldSize, this.config.coinColor),
      new Coin(this.context, fieldSize, this.config.coinColor),
      new Coin(this.context, fieldSize, this.config.coinColor)
    ];
    this.coinsAlive = this.coins.length;
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
    this.coins.forEach((coin) => {
      if (coin.isHidden() === false) {
        coin.update();
        if (coin.touchedByTurtle(this.turtle) === true) {
          this.coinsAlive -= 1;
          this.turtle.boost();
          if (this.coinsAlive === 0) {
            this.finalTime = this.getPlayTime();
            this.turtle.explode();
            setTimeout(() => { this.stop(); }, 1000);
          }
        }
      }
    });
  }

  draw() {
    this.clearCanvas();
    this.turtle.draw();
    this.coins.forEach((coin) => {
      if (coin.isHidden() === false) coin.draw();
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
      ctx.strokeStyle = this.config.fontColor;
      ctx.font = `30px ${this.config.fontColor} Arial`;
      ctx.textAlign = 'center';
      ctx.strokeText('Press [SPACE]',
        this.posTextCenter.x, this.posTextCenter.y);
    } else {
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = this.config.fontColor;
      ctx.font = `15px ${this.config.fontColor} Arial`;
      ctx.textAlign = 'center';
      ctx.strokeText(this.getPlayTime(),
        this.posTextTimer.x, this.posTextTimer.y);
    }

    if (this.finalTime.length > 0) {
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = this.config.fontColor;
      ctx.font = `30px ${this.config.fontColor} Arial`;
      ctx.textAlign = 'center';
      ctx.strokeText(`Time: ${this.finalTime}`,
        this.posTextCenter.x, this.posTextCenter.y - 60);
    }
  }

  clearCanvas() {
    this.context.clearRect(
      0, 0,
      this.canvas.width, this.canvas.height
    );
  }

  getPlayTime(): string {
    if (this.finalTime.length > 0) {
      return this.finalTime;
    }
    return ((Date.now() - this.startTime) / 1000).toFixed(2);
  }

  stop() {
    this.started = false;
    clearInterval(this.interval);
    this.clearCanvas();
    this.drawText();
  }

  start() {
    this.initEnitities();
    this.started = true;
    this.lastTick = Date.now();
    this.startTime = this.lastTick;
    this.finalTime = '';
    this.interval = setInterval(() => this.tick(), 1);
  }

  keyDown(keyCode: string) {
    if (keyCode === 'ArrowLeft') {
      this.turtle.turnStartLeft();
    }
    if (keyCode === 'ArrowRight') {
      this.turtle.turnStartRight();
    }
    if (keyCode === 'KeyR') {
      this.stop();
    }
  }

  keyUp(keyCode: string) {
    if (keyCode === 'Space') {
      if (this.started === false) this.start();
    }
    if (keyCode === 'ArrowLeft') {
      this.turtle.turnStop();
    }
    if (keyCode === 'ArrowRight') {
      this.turtle.turnStop();
    }
  }

  getFPS(): number {
    return this.fps;
  }

}
