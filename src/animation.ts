export class AnimatedProperty {

  private delta: number;
  private max: number;
  private min: number;
  private value: number;
  private oscillation: boolean;

  constructor(min: number, max: number, delta: number) {
    this.max = max;
    this.min = min;
    this.delta = delta;
    this.value = Math.floor((this.max - this.min)/2) + this.min;
    this.oscillation = true;
  }

  update() {
    this.value += this.delta;
    if (this.oscillation === true) {
      if ( (this.value <= this.min && this.delta < 0) ||
           (this.value >= this.max && this.delta > 0) ) {
        this.delta = -this.delta;
      }
    }
    if (this.value < this.min) this.value = this.min;
    if (this.value > this.max) this.value = this.max;
  }

  setToMax() {
    this.value = this.max;
  }

  setToMin() {
    this.value = this.min;
  }

  getValue(): number {
    return this.value;
  }

  setDelta(delta: number) {
    this.delta = delta;
  }

  setMax(max: number) {
    this.max = max;
  }

  setMin(min: number) {
    this.min = min;
  }

  setValue(value: number) {
    this.value = value;
  }

  setOscillation(oscillation: boolean) {
    this.oscillation = oscillation;
  }

  randomize() {
    const offset = Math.floor(Math.random() * this.max - this.min);
    this.value = this.min + offset;
  }

}
