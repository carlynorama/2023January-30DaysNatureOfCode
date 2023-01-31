//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// src/reusable/noisemaker.ts
// calynorama 2023 Jan
//

import { makeNoise2D } from "open-simplex-noise";
import { Noise2D } from "open-simplex-noise/lib/2d";

export class NoiseMaker {

    noise2D: Noise2D;

    constructor() {
        this.noise2D= makeNoise2D(Date.now());
    }

}