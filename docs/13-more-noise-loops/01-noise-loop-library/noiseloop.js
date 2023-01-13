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
    constructor(diameter) {
        // loopValue(at:number) {
        // //   let xoff = map(cos(at), -1, 1, this.root.x, this.root.x + this.diameter);
        // //   let yoff = map(sin(at), -1, 1, this.root.y, this.root.y + this.diameter);
        // //   return noise(xoff, yoff);
        // }
        this.loopValue = (at) => {
            let vector = Vector.createAngleVector(at, this.diameter).added(this.root);
            return noise(vector.x, vector.y);
        };
        this.scaledValue = (at, min, max) => {
            //return map(this.loopValue(at), 0, 1, min, max);
            let xoff = map(Math.cos(at), -1, 1, this.root.x, this.root.x + this.diameter);
            let yoff = map(Math.sin(at), -1, 1, this.root.y, this.root.y + this.diameter);
            return map(noise(xoff, yoff), 0, 1, min, max);
        };
        this.scaledValueOldStyle = (at, min, max) => {
            let xoff = map(cos(at), -1, 1, this.root.x, this.root.x + this.diameter);
            let yoff = map(sin(at), -1, 1, this.root.y, this.root.y + this.diameter);
            return map(noise(xoff, yoff), 0, 1, min, max);
        };
        this.loopValueWithSlide = (at, slide) => {
            let vector = Vector.createAngleVector(at, this.diameter).added(this.root);
            return noise(vector.x, vector.y, slide);
        };
        this.scaledValueWithSlide = (at, slide, min, max) => {
            return map(this.loopValueWithSlide(at, slide), 0, 1, min, max);
        };
        this.diameter = diameter;
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
