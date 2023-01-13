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
    diameter: number;
    root: Vector;
  
    constructor(diameter:number) {
      this.diameter = diameter;
      this.root = new Vector(Math.random() * 1000, Math.random() * 1000);
    }

    static project(val: number, l1: number, u1: number, l2: number, u2: number):number {
        //check against NumRange.locationInRange();
        const percent = Math.abs(val - l1)/Math.abs(u1-l1);
        const displacement = (u2-l2) * percent;
        return l2 + displacement;
      }
  
    // loopValue(at:number) {
    // //   let xoff = map(cos(at), -1, 1, this.root.x, this.root.x + this.diameter);
    // //   let yoff = map(sin(at), -1, 1, this.root.y, this.root.y + this.diameter);
    // //   return noise(xoff, yoff);
    // }

    loopValue = (at:number) => {
        let vector = Vector.createAngleVector(at, this.diameter).added(this.root);
        return noise(vector.x, vector.y);
    }

    scaledValue = (at: number, min:number, max:number) => {
        return map (this.loopValue(at), 0, 1, min, max);
    }

    loopValueWithZSlide = (at:number, zoff:number) => {
        let vector = Vector.createAngleVector(at, this.diameter).added(this.root);
        return noise(vector.x, vector.y, zoff);
    }

    scaledValueWithZSlide= (at: number, zoff:number, min:number, max:number) => {
        return map (this.loopValueWithZSlide(at, zoff), 0, 1, min, max);
    }
}
