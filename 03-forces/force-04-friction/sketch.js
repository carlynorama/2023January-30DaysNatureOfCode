let movers = [];
let numMovers = 12;



function setup() {
  createControlledCanvas(400, 400);
  let color1 = color(204, 204, 0, 255);
  let color2 = color(0, 204, 204, 255);
  for (let i = 0; i < numMovers; i++) {
    movers[i] = new Mover(random(width), 200, color2);
  }

}

function draw() {
  if (runFlag) {
    let wind = createVector(0.5,0);
    let gravity = createVector(0,0.1);
    background(51);

    if (mouseIsPressed) {
      movers.forEach(mover => {
        mover.applyForce(wind);
      });
    } else {
      movers.forEach(mover => {
        mover.clearExternalForces();
        mover.applyForce(gravity);
      });
    }

    movers.forEach(mover => {
      let weight = p5.Vector.mult(gravity, mover.mass);
      mover.applyForce(weight);
      mover.update();
      mover.render();
    });

  }
}
