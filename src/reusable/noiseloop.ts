//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// noiseloop.ts
// written by calynorama 2023 Jan 13
//

//https://github.com/CodingTrain/Coding-Challenges/tree/main/135_GIF_Loop
//https://github.com/CodingTrain/Coding-Challenges/tree/main/136_Polar_Noise_Loop_2

//TODO: Provide a "locationInLoop" service that when given an angle it will return a revolutions count, the remainder and the percentage. 

//REQUIRES p5js
class NoiseLoop {
    radius: number;
    root: Vector;

    get diameter() { return this.radius * 2 }
  
    constructor(radius:number, root:Vector) {
        this.radius = radius;
        this.root = root;

    }

    static create2D(radius:number, rootWooble:number) {
        //this.root = new Vector(0,0);
       let variation = rootWooble;
        let root = new Vector(Math.random() * variation, Math.random() * variation);
        return new NoiseLoop(radius, root);
    }

    static createSpecific2D(radius:number, x:number, y:number) {
        let root = new Vector(x, y);
        return new NoiseLoop(radius, root);
    }

    static project(val: number, l1: number, u1: number, l2: number, u2: number):number {
        const percent = Math.abs(val - l1)/Math.abs(u1-l1);
        const displacement = (u2-l2) * percent;
        return l2 + displacement;
      }
  
    //TODO: Redo for n length.   
    loopValue = (at:number) => {
        let vector = Vector.create2DAngleVector(at, this.radius)
        .addedTo(this.root) // move to root
        .addedValues(this.radius, this.radius); // perlin noise function can only accept positive values

        //P5JS Dependency
        return noise(vector.x, vector.y);
    }

    scaledValue = (at: number, min:number, max:number) => {
        let rawLoop = this.loopValue(at);
        let result = NoiseLoop.project(rawLoop, 0, 1, min, max);
        return result;
    }

    // scaledValueOldStyle = (at: number, min:number, max:number) => {
    //     let xoff = map(cos(at), -1, 1, this.root.x, this.root.x + this.diameter);
    //     let yoff = map(sin(at), -1, 1, this.root.y, this.root.y + this.diameter);
    //     let rawLoop = noise(xoff, yoff);
    //     let result = map(rawLoop, 0, 1, min, max);
    //     //console.log("manual", rawLoop, result, at, min, max,  seedTest, xoff);
    //     return result;
    // }

    loopValueWithSlide = (at:number, slide:number) => {
        let vector = Vector.create2DAngleVector(at, this.diameter).addedTo(this.root);
        return noise(vector.x, vector.y, slide);
    }

    scaledValueWithSlide= (at: number, slide:number, min:number, max:number) => {
        return map (this.loopValueWithSlide(at, slide), 0, 1, min, max);
    }
}
