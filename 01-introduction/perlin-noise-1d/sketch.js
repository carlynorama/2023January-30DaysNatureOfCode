var xoff = 0;
var yoff = 10000;
var inc = 0.01;
var start = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(51);



  //sin wave generator.
  stroke(0, 0, 255);
  noFill();
  beginShape();
  yoff = start;
  for (var x = 0; x < width; x++) {
    //stroke(255);
    var y = height/2 + sin(yoff) * height / 2;

    vertex(x, y);
    yoff += inc;
  }
  endShape();

  // -> do this once below
  //start += inc;

  //One dimensional terain generator.
  stroke(255, 0, 0);
  noFill();
  beginShape();
  yoff = start;
  for (var x = 0; x < width; x++) {
    //stroke(255);
    var y = noise(yoff) * height;

    vertex(x, y);
    yoff += inc;
  }
  endShape();

  //ADD the two.
  stroke(255);
  noFill();
  beginShape();
  yoff = start;
  for (let x = 0; x < width; x++) {
    let n = map(noise(yoff), 0, 1, -50, 50);
    let s = map(sin(yoff), -1, 1, 50, height-50);  //compress it a little s y fits.
    let y = s + n;

    // let y = random(height);
    // let y = height / 2 + sin(xoff) * height / 2;
    // let y = noise(xoff) * 100 + height / 2 + sin(xoff) * height / 2;
    vertex(x, y);

    yoff += inc;
  }
  endShape();

  start += inc;

  //noLoop();

  // vertical bars
  // stroke(255);
  // noFill();
  // beginShape();
  // for (var x = 0; x < width; x++) {
  //   stroke(255);
  //   vertex(x, random(height));
  // }
  // endShape();
  // noLoop();

  //Ball moving around the screen
  // var x = map(noise(xoff), 0, 1, 0, width);
  // var y = map(noise(yoff), 0, 1, 0, height);
  // ellipse(x, y, 24, 24);
  //
  // xoff += 0.01
  // yoff += 0.01
}
