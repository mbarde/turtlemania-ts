import { Vector2 } from './vector';

export class Turtle {

  private angle: number;
  private baseDirection: Vector2;
  private context: CanvasRenderingContext2D;
  private length: number;
  private pos: Vector2;
  private speed: number;
  private width: number;

  constructor(context: CanvasRenderingContext2D, pos: Vector2) {
    this.angle = 45;
    this.baseDirection = new Vector2(0, 1);
    this.context = context;
    this.length = 10;
    this.pos = pos;
    this.speed = 0.1;
    this.width = 5;
  }

  update(ticks: number) {
    let dir: Vector2;
    dir = this.baseDirection.clone();
    dir.rotate(this.angle);
    dir.normalize();
    dir.scale(this.speed * ticks * 0.1);
    this.pos.add(dir);

    this.angle += 1;
    if (this.angle > 360) this.angle -= 360;
    if (this.angle < 0) this.angle = 360 - this.angle;
  }

  draw() {
    let ctx: CanvasRenderingContext2D;
    let halfLengthVector: Vector2;
    let pos0, pos1: Vector2;

    ctx = this.context;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = this.width;

    halfLengthVector = this.baseDirection.clone();
    halfLengthVector.rotate(this.angle);
    halfLengthVector.normalize();
    halfLengthVector.scale(this.length/2);

    pos0 = this.pos.clone();
    pos0.sub(halfLengthVector);
    pos1 = this.pos.clone()
    pos1.add(halfLengthVector);

    ctx.beginPath();
    ctx.moveTo(pos0.x, pos0.y);
    ctx.lineTo(pos1.x, pos1.y);
    ctx.stroke();
  }

}
