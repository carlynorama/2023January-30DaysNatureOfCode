let movers = [];
let numMovers = 12;

function setup() {
  createControlledCanvas(400, 400);
  background(51);

  let color1 = color(153, 255, 102, 200);
  let color2 = color(0, 204, 255, 200);
  //mover1 = new Mover(200, 200, color1);
  //mover2 = new Mover(200, 200, color2);
  for (let i = 0; i < numMovers; i++) {
    if (i % 2 == 0) {
      console.log('even');
      movers[i] = new Mover(200, 200, color1);
    } else {
      movers[i] = new Mover(200, 200, color2);
    }

  }

}

function draw() {
  if (runFlag) {
    background(51);
    if (mouseIsPressed) {
      wind = createVector(0.5,0);
      movers.forEach(mover => {
        mover.applyForce(wind);
      });
    } else {
      movers.forEach(mover => {
        mover.clearExternalForces();
      });
    }

    movers.forEach(mover => {
      mover.update();
      mover.render();
    });

  }
}
