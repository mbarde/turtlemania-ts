import { AnimatedProperty } from './animation';
import { Turtle } from './turtle';
import { Vector2 } from './vector';

export class Coin {

  private alive: boolean;
  private context: CanvasRenderingContext2D;
  private hidden: boolean;
  private lineWidth: AnimatedProperty;
  private pos: Vector2;
  private radius: AnimatedProperty;


  constructor(context: CanvasRenderingContext2D, fieldSize: Vector2) {
    this.alive = true;
    this.context = context;
    this.hidden = false;
    this.lineWidth = new AnimatedProperty(1, 3, 0.01);
    this.radius = new AnimatedProperty(4, 6, 0.02);

    // random spawn within field size
    // leaving free this margin
    let fieldMargin = 30;
    this.pos = new Vector2(
      Math.floor(
        Math.random() * (fieldSize.x - (2*fieldMargin))
      ) + fieldMargin,
      Math.floor(
        Math.random() * (fieldSize.y - (2*fieldMargin))
      ) + fieldMargin
    );
  }

  update() {
    this.lineWidth.update();
    this.radius.update();
  }

  draw() {
      let ctx: CanvasRenderingContext2D;
      ctx = this.context;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = 'white';
      ctx.lineWidth = this.lineWidth.getValue();
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y,
              this.radius.getValue(), 0, 2 * Math.PI);
      ctx.stroke();
  }

  explode() {
    this.alive = false;
    this.lineWidth.setOscillation(false);
    this.lineWidth.setMin(0.0001);
    this.lineWidth.setDelta(-0.02);
    this.radius.setMax(99999);
    this.radius.setDelta(1);
  }

  touchedByTurtle(turtle: Turtle) {
    if (this.alive === false) return false;
    let distance, h: number;
    distance = this.pos.distanceTo(turtle.getPos());
    h = Math.floor(this.radius.getValue()/2) + Math.floor(turtle.getWidth());
    if (distance <= h) {
      this.explode();
      setTimeout(() => { this.hidden = true; }, 1000);
      return true;
    }
    return false;
  }

  isHidden(): boolean {
    return this.hidden;
  }

}
