let mover;

function setup() {
  createControlledCanvas(400, 400);
  mover = new Mover(200, 200);
  background(51);
}

function draw() {
  if (runFlag) {
    if (mouseIsPressed) {
      wind = createVector(0.5,0);
      mover.applyForce(wind);
    } else {
      mover.clearExternalForces();
    }
    mover.update();
    mover.render();
  }
}
