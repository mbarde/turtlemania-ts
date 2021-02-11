import { Turtle } from './turtle';
import { Vector2 } from './vector';

export class Coin {

  private context: CanvasRenderingContext2D;
  private pos: Vector2;
  private size: number;

  constructor(context: CanvasRenderingContext2D, fieldSize: Vector2) {
    this.context = context;
    this.size = 5;

    // random spawn within field size
    // respecting leaving free this margin
    let fieldMargin = 30;
    this.pos = new Vector2(
      Math.floor(
        Math.random() * fieldSize.x - (2*fieldMargin)
      ) + fieldMargin,
      Math.floor(
        Math.random() * fieldSize.y - (2*fieldMargin)
      ) + fieldMargin
    );
  }

  draw() {
      let ctx: CanvasRenderingContext2D;
      ctx = this.context;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = this.size;
      ctx.beginPath();
      ctx.moveTo(this.pos.x, this.pos.y);
      ctx.lineTo(this.pos.x, this.pos.y);
      ctx.stroke();
  }

  touchedByTurtle(turtle: Turtle) {
    let distance, h: number;
    distance = this.pos.distanceTo(turtle.getPos());
    h = Math.floor(this.size/2) + Math.floor(turtle.getWidth());
    if (distance <= h) return true;
  }

}
