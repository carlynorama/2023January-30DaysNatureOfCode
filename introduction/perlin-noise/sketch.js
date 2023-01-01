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
  stroke(255);
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

  start += inc;

  //One dimensional terain generator.
  stroke(255);
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
