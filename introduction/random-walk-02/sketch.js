//https://editor.p5js.org/codingtrain/sketches/N-qqe1ExZ

let x;
let y;

function setup() {
  createCanvas(400, 400);
  x = width / 2;
  y = height / 2;
  background(51);
}


function draw() {
  stroke(255, 100);
  strokeWeight(2);
  point(x, y);
  const r = floor(random(4));
  switch (r) {
    case 0:
      x = x + 1;
      break;
    case 1:
      x = x - 1;
      break;
    case 2:
      y = y + 1;
      break;
    case 3:
      y = y - 1;
      break;
  }
}
