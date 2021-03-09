import { AnimatedProperty } from './animation';
import { Vector2 } from './vector';

export class Turtle {

  private angle: number;
  private angleDelta: AnimatedProperty;
  private baseDirection: Vector2;
  private color: string;
  private context: CanvasRenderingContext2D;
  private fieldSize: Vector2;
  private length: AnimatedProperty;
  private pos: Vector2;
  private speed: AnimatedProperty;
  private steerSpeed: number;
  private steerSpeedDelta: number;
  private steerSpeedMax: number;
  private width: AnimatedProperty;

  constructor(context: CanvasRenderingContext2D, pos: Vector2,
              fieldSize: Vector2, color: string) {
    this.angle = 45;
    this.angleDelta = new AnimatedProperty(0, 0, 0);
    this.angleDelta.setOscillation(false);
    this.baseDirection = new Vector2(0, 1);
    this.color = color;
    this.context = context;
    this.fieldSize = fieldSize;
    this.length = new AnimatedProperty(16, 999, 0.0);
    this.length.setOscillation(false);
    this.length.setValue(16);
    this.pos = pos;
    this.speed = new AnimatedProperty(1.2, 2.0, 0.0);
    this.speed.setOscillation(false);
    this.speed.setValue(1.2);
    this.steerSpeed = 0.9;        // how fast does the turtle turn?
    this.steerSpeedDelta = 0.001; // how fast does the turn speed increase when holding a steer button?
    this.steerSpeedMax = 3;       // max allowed turn speed
    this.width = new AnimatedProperty(0.0001, 10, 0.0);
    this.width.setOscillation(false);
    this.width.setValue(10);
  }

  update(ticks: number) {
    let dir: Vector2;

    if (this.angleDelta.getValue() != 0) {
      this.angle += this.angleDelta.getValue();
      if (this.angle > 360) this.angle -= 360;
      if (this.angle < 0) this.angle = 360 + this.angle;
    }

    dir = this.baseDirection.clone();
    dir.rotate(this.angle);
    dir.normalize();
    dir.scale(this.speed.getValue() * ticks * 0.1);
    this.pos.add(dir);

    // if turtle leaves screen,
    // it should enter at the opposite site
    if (this.pos.x < 0) this.pos.x = this.fieldSize.x;
    if (this.pos.x > this.fieldSize.x) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = this.fieldSize.y;
    if (this.pos.y > this.fieldSize.y) this.pos.y = 0;

    this.angleDelta.update();
    this.length.update();
    this.speed.update();
    this.width.update();
  }

  draw() {
    let ctx: CanvasRenderingContext2D;
    let halfLength: number;
    let halfLengthVector: Vector2;
    let pos0, pos1: Vector2;

    ctx = this.context;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width.getValue();

    halfLength = this.length.getValue() / 2;
    halfLengthVector = this.baseDirection.clone();
    halfLengthVector.rotate(this.angle);
    halfLengthVector.normalize();
    halfLengthVector.scale(halfLength);

    function drawBodyAt(x: number, y: number) {
      pos0 = new Vector2(x, y);
      pos0.sub(halfLengthVector);
      pos1 = new Vector2(x, y);
      pos1.add(halfLengthVector);

      ctx.beginPath();
      ctx.moveTo(pos0.x, pos0.y);
      ctx.lineTo(pos1.x, pos1.y);
      ctx.stroke();
    }

    drawBodyAt(this.pos.x, this.pos.y);

    // to get smooth transitions when turtle re-enters
    // screen at the opposite site, we need to draw
    // *shadow turtles* when turtle is close to border
    if (this.pos.x < halfLength) {
      drawBodyAt(this.fieldSize.x - 1 + this.pos.x, this.pos.y);
    }
    if (this.pos.x >= this.fieldSize.x - halfLength) {
      drawBodyAt(-(this.fieldSize.x - 1 - this.pos.x), this.pos.y);
    }
    if (this.pos.y < halfLength) {
      drawBodyAt(this.pos.x, this.fieldSize.y + this.pos.y);
    }
    if (this.pos.y >= this.fieldSize.y - halfLength) {
      drawBodyAt(this.pos.x, -(this.fieldSize.y - 1 - this.pos.y));
    }
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

  turnStartLeft() {
    if (this.angleDelta.getValue() != 0) return;
    this.angleDelta.setDelta(this.steerSpeedDelta);
    this.angleDelta.setValue(this.steerSpeed);
    this.angleDelta.setMax(this.steerSpeedMax);
  }

  turnStartRight() {
    if (this.angleDelta.getValue() != 0) return;
    this.angleDelta.setDelta(-this.steerSpeedDelta);
    this.angleDelta.setValue(-this.steerSpeed);
    this.angleDelta.setMin(-this.steerSpeedMax);
  }

  turnStop() {
    this.angleDelta.setDelta(0);
    this.angleDelta.setValue(0);
    this.angleDelta.setMin(0);
    this.angleDelta.setMax(0);
  }

  getPos(): Vector2 {
    return this.pos;
  }

  getWidth(): number {
    return this.width.getValue();
  }

}
