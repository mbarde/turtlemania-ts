import { Point } from './utils';

export class Turtle {

  private context: CanvasRenderingContext2D;
  private pos: Point;
  private size: number;

  constructor(context: CanvasRenderingContext2D, pos: Point) {
    this.context = context;
    this.pos = pos;
    this.size = 50;
  }

  draw() {
    let context = this.context;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 1;

    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
    context.stroke();
  }

}
