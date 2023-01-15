import { makeNoise3D } from "../../addons/open-simplex-noise/main.js";
let sketch = function (p) {
    let a = 100;
    let b = 100;
    let noiseMaker;
    let z = 0;
    let z_inc = 0.01;
    p.setup = function () {
        p.createCanvas(200, 200);
        noiseMaker = makeNoise3D(Date.now());
        p.noLoop();
    };
    p.draw = function () {
        p.background(0);
        p.fill(255);
        p.rect(a, b, 50, 50);
        for (let x = 0; x < p.width; x++) {
            for (let y = 0; y < p.height; y++) {
                //const i = (x + y * p.width) * 4;
                //TODO run a check?
                const value = (noiseMaker(x, y, z) + 1) * 128;
                console.log(value);
                //let bright = value > 0 ? 255 : 0;
                p.stroke(value);
                p.point(x, y);
            }
        }
        z += z_inc;
    };
};
let myp5 = new p5(sketch);
// import { makeNoise2D } from "open-simplex-noise";
// import { Noise2D } from "open-simplex-noise/lib/2d";
// let ctx: { createImageData: (arg0: number, arg1: number) => { data: number[]; }; putImageData: (arg0: { data: number[]; }, arg1: number, arg2: number) => void; };
// let imageData: { data: number[]; };
// let noise2D: Noise2D;
// function setup() {
//   createCanvas(200, 200);
//   ctx = drawingContext();
//   imageData = ctx.createImageData(width, height);
//   noise2D = makeNoise2D(Date.now());
// }
// function draw() {
//   for (let x = 0; x < width; x++) {
//     for (let y = 0; y < height; y++) {
//       const i = (x + y * width) * 4;
//       const value = (noise2D(x, y) + 1) * 128;
//       imageData.data[i] = value;
//       imageData.data[i + 1] = value;
//       imageData.data[i + 2] = value;
//       imageData.data[i + 3] = 255;
//     }
//   }
//   ctx.putImageData(imageData, 0, 0);
// }
// // // 4D Open Simplex Noise Loop
// // // Daniel Shiffman
// // // https://thecodingtrain.com/CodingChallenges/137-4d-opensimplex-noise-loop
// // // https://youtu.be/3_0Ax95jIrk
// // // let capturer = new CCapture( { 
// // //     format: 'png', 
// // //     name: 'open_simplex_noise_loop',
// // //   } );
// // import { makeNoise4D } from "open-simplex-noise";
// // //import { Noise4D } from "open-simplex-noise";
// //   const totalFrames:number = 360;
// //   let counter:number = 0;
// //   const record:boolean = false;
// //   const increment:number = 0.03;
// //   // Just for non-looping demo
// //   let zoff:number = 0;
// //   let this_noise: { (x: number, y: number, z: number, w: number): number; noise4D?: any; noise3D?: any; };
// //   // the canvas variable is needed for the capturer
// //   let this_canvas;
// //   function setup() {
// //     // I made the canvas really small because it's slow for me otherwise
// //     this_canvas = createCanvas(200, 200)//.canvas();
// //     this_noise = makeNoise4D(Date.now());
// //     //if (record) capturer.start();
// //   }
// //   function draw() {
// //     rect(0,0, 50,50);
// //     let percent = (counter % totalFrames) / totalFrames;
// //     render(percent);
// //     // if (record && counter<totalFrames-1) {
// //     //   // note that canvas animations don't run in the background
// //     //   // you will have to keep the window open to record
// //     //   capturer.capture(canvas);
// //     // }
// //     // else if (record) {
// //     //   capturer.stop();
// //     //   capturer.save();
// //     //   // this will download a tar archive with the pngs inside
// //     //   // extract with 7zip or a similar tool
// //     //   // then use ffmpeg to convert into a gif or video
// //     //   noLoop();
// //     // }
// //     counter++;
// //   }
// //   function render(percent:number) {
// //     let uoff,voff;
// //     // Only doing calculations if recording to save on computation
// //     if (record) {
// //       let angle = map(percent, 0, 1, 0, TWO_PI);
// //       uoff = map(sin(angle), -1, 1, 0, 2);
// //       voff = map(sin(angle), -1, 1, 0, 2);
// //     }
// //     let xoff = 0;
// //     for (let x = 0; x < width; x++) {
// //       let yoff = 0;
// //       for (let y = 0; y < height; y++) {
// //         let n;
// //         if (record) {
// //           // 4D Open Simplex Noise is very slow!
// //           n = this_noise.noise4D(xoff, yoff, uoff, voff);
// //         } 
// //         else {
// //           // If you aren't worried about looping run this instead for speed!
// //           n = this_noise.noise3D(xoff, yoff, zoff);
// //         }
// //         let bright = n > 0 ? 255 : 0;
// //         stroke(bright);
// //         point(x,y)
// //         yoff += increment;
// //       }
// //       xoff += increment;
// //     }
// //     zoff += increment;
// //   }
