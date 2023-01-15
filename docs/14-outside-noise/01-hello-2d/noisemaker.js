import { makeNoise2D } from "../../addons/open-simplex-noise/main.js";
export class NoiseMaker {
    constructor() {
        this.noise2D = makeNoise2D(Date.now());
    }
}
