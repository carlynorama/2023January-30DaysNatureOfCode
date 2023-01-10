let mover;

function setup() {
  createControlledCanvas(400, 400);
  mover = new Mover(200, 200);
  background(51);
}

function draw() {
  if (runFlag) {
    mover.update();
    mover.render();
  }
}
