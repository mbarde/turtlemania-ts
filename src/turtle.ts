import { Vector2, addVector2 } from './utils';

export class Turtle {

  private context: CanvasRenderingContext2D;
  private pos: Vector2;
  private dir: Vector2;

  constructor(context: CanvasRenderingContext2D, pos: Vector2) {
    this.context = context;
    this.pos = pos;
    this.dir = { x: 1, y: 0 }
  }

  update() {
    this.pos = addVector2(this.pos, this.dir);
  }

  draw() {
    let ctx = this.context;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(this.pos.x + 20, this.pos.y + 20);
    ctx.stroke();
  }

}
