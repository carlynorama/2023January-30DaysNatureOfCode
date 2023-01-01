// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/bqF9w9TTfeo
// https://thecodingtrain.com/CodingChallenges/053-random-walk-levy.html

//Compare to:
// https://editor.p5js.org/codingtrain/sketches/L24X90MBH

let pos;
let prev;

function setup() {
  createCanvas(400, 400);
  pos = createVector(width/2, height/2);
  prev = pos.copy();
  background(51);
}

function draw() {

  stroke(0,204,204);
  strokeWeight(1);
  fill(204,204,204);
  circle(pos.x, pos.y, 9,9);

  stroke(255);
  strokeWeight(3);
  line(pos.x, pos.y, prev.x, prev.y);
  prev.set(pos);

  var step = p5.Vector.random2D();

  var r = random(100);
  if (r < 1) {
    step.mult(random(25, 100));
  } else {
    step.setMag(2);
  }

  pos.add(step);
  //shunts it back to the middle if off screen
  if (pos.x < width && pos.x > 0 && pos.y < height && pos.y > 0) {
    //do nothing... what is the sytax for not again?
  } else {
    pos = createVector(width/2, height/2);
  }

}
