import { AnimatedProperty } from './animation';
import { Vector2 } from './vector';

export class Turtle {

  private angle: number;
  private baseDirection: Vector2;
  private context: CanvasRenderingContext2D;
  private length: AnimatedProperty;
  private pos: Vector2;
  private speed: AnimatedProperty;
  private steerSpeed: number;
  private width: AnimatedProperty;

  constructor(context: CanvasRenderingContext2D, pos: Vector2) {
    this.angle = 45;
    this.baseDirection = new Vector2(0, 1);
    this.context = context;
    this.length = new AnimatedProperty(16, 999, 0.0);
    this.length.setOscillation(false);
    this.length.setValue(16);
    this.pos = pos;
    this.speed = new AnimatedProperty(1.2, 2.0, 0.0);
    this.speed.setOscillation(false);
    this.speed.setValue(1.2);
    this.steerSpeed = 9;
    this.width = new AnimatedProperty(0.0001, 10, 0.0);
    this.width.setOscillation(false);
    this.width.setValue(10);
  }

  update(ticks: number) {
    let dir: Vector2;
    dir = this.baseDirection.clone();
    dir.rotate(this.angle);
    dir.normalize();
    dir.scale(this.speed.getValue() * ticks * 0.1);
    this.pos.add(dir);

    this.length.update();
    this.speed.update();
    this.width.update();
  }

  draw() {
    let ctx: CanvasRenderingContext2D;
    let halfLengthVector: Vector2;
    let pos0, pos1: Vector2;

    ctx = this.context;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = this.width.getValue();

    halfLengthVector = this.baseDirection.clone();
    halfLengthVector.rotate(this.angle);
    halfLengthVector.normalize();
    halfLengthVector.scale(this.length.getValue()/2);

    pos0 = this.pos.clone();
    pos0.sub(halfLengthVector);
    pos1 = this.pos.clone()
    pos1.add(halfLengthVector);

    ctx.beginPath();
    ctx.moveTo(pos0.x, pos0.y);
    ctx.lineTo(pos1.x, pos1.y);
    ctx.stroke();
  }

  boost() {
    this.width.setValue(5);
    this.width.setDelta(0.1);
    this.speed.setToMax();
    this.speed.setDelta(-0.002);
  }

  explode() {
    this.length.setMax(999);
    this.length.setDelta(0.5);
    this.width.setDelta(-0.1);
  }

  turnLeft() {
    this.angle += this.steerSpeed;
    if (this.angle > 360) this.angle -= 360;
  }

  turnRight() {
    this.angle -= this.steerSpeed;
    if (this.angle < 0) this.angle = 360 + this.angle;
  }

  getPos(): Vector2 {
    return this.pos;
  }

  getWidth(): number {
    return this.width.getValue();
  }

}
