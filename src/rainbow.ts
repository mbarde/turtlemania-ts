import { AnimatedProperty } from './animation';

export class Rainbow {

    private r: AnimatedProperty;
    private g: AnimatedProperty;
    private b: AnimatedProperty;

    constructor(oscillationSpeedFactor: number = 1) {
        this.r = new AnimatedProperty(
            0, 255, Math.random() * oscillationSpeedFactor);
        this.r.randomize();
        this.g = new AnimatedProperty(
            0, 255, Math.random() * oscillationSpeedFactor);
        this.g.randomize();
        this.b = new AnimatedProperty(            
            0, 255, Math.random() * oscillationSpeedFactor);
        this.b.randomize();
    }

    update() {
        this.r.update();
        this.g.update();
        this.b.update();
    }

    setOscillationSpeedFactor(oscillationSpeedFactor: number) {
        this.r.setDelta(Math.random() * oscillationSpeedFactor);
        this.g.setDelta(Math.random() * oscillationSpeedFactor);
        this.b.setDelta(Math.random() * oscillationSpeedFactor);
    }

    getColor() {
        const r = this.r.getValue();
        const g = this.g.getValue();
        const b = this.b.getValue();
        return `rgb(${r},${g},${b})`;
    }

}
