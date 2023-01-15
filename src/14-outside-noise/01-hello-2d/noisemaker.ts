import { makeNoise2D } from "open-simplex-noise";
import { Noise2D } from "open-simplex-noise/lib/2d";
//../../addons/open-simplex-noise/main.js

export class NoiseMaker {

    noise2D: Noise2D;

    constructor() {
        this.noise2D= makeNoise2D(Date.now());
    }

}