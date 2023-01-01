var inc = 0.01;

function setup() {
  createCanvas(200, 200);
}

function draw() {
  loadPixels();
  background(51);
  stroke(255);
  noFill();
  beginShape();
  let = yoff = start;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      var index = (x + y*width) * 4;
      pixels[index + 0] = 255;
      pixels[index + 1] = 0;
      pixels[index + 2] = 0;
      pixels[index + 4] = 255;
    }
  }

  updatePixels();
}
