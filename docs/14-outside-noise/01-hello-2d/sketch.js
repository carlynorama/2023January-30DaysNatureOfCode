import { makeNoise2D } from "../../addons/open-simplex-noise/main.js";
let sketch = function (p) {
    let a = 100;
    let b = 100;
    let noiseMaker;
    p.setup = function () {
        p.createCanvas(200, 200);
        noiseMaker = makeNoise2D(Date.now());
        p.noLoop();
    };
    p.draw = function () {
        p.background(0);
        p.fill(255);
        p.rect(a, b, 50, 50);
        for (let x = 0; x < p.width; x++) {
            for (let y = 0; y < p.height; y++) {
                //const i = (x + y * p.width) * 4;
                const value = (noiseMaker(x, y) + 1) * 128;
                //console.log(value);
                //let bright = value > 0 ? 255 : 0;
                p.stroke(value);
                p.point(x, y);
            }
        }
    };
};
let myp5 = new p5(sketch);