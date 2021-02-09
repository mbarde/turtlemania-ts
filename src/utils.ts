export interface Vector2 {
  x: number;
  y: number;
}

export function addVector2(vec0: Vector2, vec1: Vector2) {
  return { x: vec0.x + vec1.x,
           y: vec0.y + vec1.y }
}
