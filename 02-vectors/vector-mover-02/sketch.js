let mover;

function setup() {
  createCanvas(400, 400);
  mover = new Mover(0, 0);
  background(51);
}

function draw() {
  mover.update();
  mover.render();
}
