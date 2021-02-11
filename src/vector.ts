export class Vector2 {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  rotate(degrees: number) {
    let x, y, cos, sin, radians: number;
    radians = -degrees * (Math.PI/180);
    cos = Math.cos(radians);
    sin = Math.sin(radians);
    x = this.x
    y = this.y
    this.x = x * cos - y * sin;
    this.y = x * sin + y * cos;
  }

  add(vec: Vector2) {
    this.x += vec.x;
    this.y += vec.y;
  }

  sub(vec: Vector2) {
    this.x -= vec.x;
    this.y -= vec.y;
  }

  scale(factor: number) {
    this.x *= factor;
    this.y *= factor;
  }

  normalize() {
    let mag: number;
    mag = this.magnitude();
    if (mag === 0) return;
    this.x = this.x / mag;
    this.y = this.y / mag;
  }

  magnitude(): number {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }

  distanceTo(vec: Vector2): number {
    let hVec = this.clone();
    hVec.sub(vec);
    return hVec.magnitude();
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }
}
