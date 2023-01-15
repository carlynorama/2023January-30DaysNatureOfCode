import { makeNoise3D } from "../../addons/open-simplex-noise/main.js";
//../../addons/open-simplex-noise/main.js
let sketch = function (p) {
    const a = 100;
    const b = 100;
    let noiseMaker;
    let zoff = 0;
    const z_inc = 0.1;
    const y_inc = 0.1;
    const x_inc = 0.1;
    p.setup = function () {
        p.createCanvas(200, 200);
        noiseMaker = makeNoise3D(Date.now());
        //p.noLoop();
    };
    p.draw = function () {
        p.background(100);
        p.fill(204, 0, 0);
        p.rect(a, b, 50, 50);
        let xoff = 0;
        for (let x = 0; x < p.width; x++) {
            let yoff = 0;
            for (let y = 0; y < p.height; y++) {
                //TODO run a check?
                // const value = (noiseMaker(xoff, yoff, zoff) + 1) * 128;
                const value = (noiseMaker(xoff, yoff, zoff));
                //console.log(value);
                let bright = value > 0 ? 255 : 0;
                //p.stroke(value);
                p.stroke(bright);
                p.point(x, y);
                yoff += y_inc;
            }
            xoff += x_inc;
        }
        zoff += z_inc;
    };
};
let myp5 = new p5(sketch);
