import { makeNoise2D } from "open-simplex-noise";
export class NoiseMaker {
    constructor() {
        this.noise2D = makeNoise2D(Date.now());
    }
}
