//see https://editor.p5js.org/codingtrain/sketches/2_hBcOBrF

let inc = 0.01;
let start = 0.0002

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  noiseDetail(8, 0.5);
}

function draw() {

  loadPixels();
  let yoff = start;
  //let xoff = start + 1000;
  for (let y = 0; y < height; y++) {
    let xoff = start + 1000;
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      // let r = random(255);
      let r = noise(xoff+1000, yoff+1000) * 204;
      let g = noise(xoff, yoff) * 204;
      let b = noise(xoff+10000, yoff+1000) * 204;
      pixels[index + 0] = r;
      pixels[index + 1] = g;
      pixels[index + 2] = b;
      pixels[index + 3] = 255;

      xoff += inc;
    }
    yoff += inc;
  }
  start += inc;
  updatePixels();
  //noLoop();
}
