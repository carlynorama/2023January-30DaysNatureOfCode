import { makeNoise2D } from "open-simplex-noise";
import { makeNoise3D } from "open-simplex-noise";
import { makeNoise4D } from "open-simplex-noise";
import { Noise2D } from "open-simplex-noise/lib/2d";
import { Noise3D } from "open-simplex-noise/lib/3d";
import { Noise4D } from "open-simplex-noise/lib/4d";
//../../addons/open-simplex-noise/main.js

let sketch = function(p:p5) {
  const a = 100;
  const b = 100;
  let noiseMaker:Noise4D;

  let angle = 0;
  const a_inc = Math.PI/180.0;

  const y_inc = 0.01;
  const x_inc = 0.01;
  p.setup = function() {
    p.createCanvas(200, 200);
    noiseMaker = makeNoise3D(Date.now());
    //p.noLoop();
  };

  p.draw = function () {
    p.background(0);
    // p.fill(204, 0, 0);
    // p.rect(a, b, 50, 50);
    angle += a_inc;
    let zoff = Math.sin(angle);
    let woff = Math.cos(angle);
    let xoff = 0;
    for (let x = 0; x < p.width; x++) {
        let yoff = 0;
        for (let y = 0; y < p.height; y++) {
          //TODO run a check?
          // const value = (noiseMaker(xoff, yoff, zoff) + 1) * 128;
          const value = (noiseMaker(xoff, yoff, zoff, woff));
          //console.log(value);
          let bright = value > 0 ? 255 : 0;
          //p.stroke(value);
          p.stroke(bright);
          p.point(x, y);
          yoff += y_inc;
        }
        xoff += x_inc;
    }
    
};
};
  
let myp5 = new p5(sketch);

