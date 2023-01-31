//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// src/reusable/noisemaker.ts
// calynorama 2023 Jan
//
import { makeNoise2D } from "open-simplex-noise";
export class NoiseMaker {
    constructor() {
        this.noise2D = makeNoise2D(Date.now());
    }
}
