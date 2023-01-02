let mover;

function setup() {
  createControlledCanvas(400, 400);
  let color1 = color(204, 204, 0, 255);
  let color2 = color(0, 204, 204, 255);
  mover1 = new Mover(200, 200, color1);
  mover2 = new Mover(200, 200, color2);
  background(51);
}

function draw() {
  if (runFlag) {
    if (mouseIsPressed) {
      wind = createVector(0.5,0);
      mover1.applyForce(wind);
      mover2.applyForce(wind);
    } else {
      mover1.clearExternalForces();
      mover2.clearExternalForces();
    }
    mover1.update();
    mover1.render();

    mover2.update();
    mover2.render();
  }
}
