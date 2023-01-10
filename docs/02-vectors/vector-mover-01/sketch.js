let mover;

function setup() {
  createCanvas(400, 400);
  mover = new Mover(200, 200, 0.8);
  background(51);
}

function draw() {
  mover.update();
  mover.render();
}
