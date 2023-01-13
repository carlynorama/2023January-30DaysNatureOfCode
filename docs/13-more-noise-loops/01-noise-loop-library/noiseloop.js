"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// noiseloop.ts
// written by calynorama 2023 Jan 13
//
//https://github.com/CodingTrain/Coding-Challenges/tree/main/135_GIF_Loop
//https://github.com/CodingTrain/Coding-Challenges/tree/main/136_Polar_Noise_Loop_2
//REQUIRES p5js
class NoiseLoop {
    //seed: number;
    get diameter() { return this.radius * 2; }
    constructor(radius) {
        this.loopValue = (at) => {
            let vector = Vector.createAngleVector(at, this.radius)
                .added(this.root) // move to root
                .added(new Vector(this.radius, this.radius)); // perlin noise function can only accept positive values
            //P5JS Dependency
            return noise(vector.x, vector.y);
        };
        this.scaledValue = (at, min, max) => {
            let rawLoop = this.loopValue(at);
            let result = NoiseLoop.project(rawLoop, 0, 1, min, max);
            return result;
        };
        this.scaledValueOldStyle = (at, min, max) => {
            let xoff = map(cos(at), -1, 1, this.root.x, this.root.x + this.diameter);
            let yoff = map(sin(at), -1, 1, this.root.y, this.root.y + this.diameter);
            let seedTest = noise(5, 2);
            let rawLoop = noise(xoff, yoff);
            let result = map(rawLoop, 0, 1, min, max);
            console.log("manual", rawLoop, result, at, min, max, seedTest, xoff);
            return result;
        };
        this.loopValueWithSlide = (at, slide) => {
            let vector = Vector.createAngleVector(at, this.diameter).added(this.root);
            return noise(vector.x, vector.y, slide);
        };
        this.scaledValueWithSlide = (at, slide, min, max) => {
            return map(this.loopValueWithSlide(at, slide), 0, 1, min, max);
        };
        this.radius = radius;
        this.root = new Vector(0, 0);
        //this.root = new Vector(Math.random() * 1000, Math.random() * 1000);
        //this.seed = 12;
    }
    static project(val, l1, u1, l2, u2) {
        //check against NumRange.locationInRange();
        const percent = Math.abs(val - l1) / Math.abs(u1 - l1);
        const displacement = (u2 - l2) * percent;
        return l2 + displacement;
    }
}
