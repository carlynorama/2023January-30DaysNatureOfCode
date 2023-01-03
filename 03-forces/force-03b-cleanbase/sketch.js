let movers = [];
let numMovers = 12;

function setup() {
  createControlledCanvas(400, 400);
  background(51);

  let color1 = color(204, 204, 0, 255);
  let color2 = color(0, 204, 204, 255);
  for (let i = 0; i < numMovers; i++) {
    movers[i] = new Mover(random(0, width), 200, random(1,8), color1);
  }

}

function draw() {
  if (runFlag) {
    let wind = createVector(0.5,0);
    let gravity = createVector(0,0.1);
    background(51);

    stroke(255);
    line(0, 200, width,200);

    let windIsBlowing = false;
    if (mouseIsPressed) {
      windIsBlowing = true;
    }

    movers.forEach(mover => {
      let weight = p5.Vector.mult(gravity, mover.mass);
      mover.applyForce(weight);
      if (windIsBlowing) {
        mover.applyForce(wind);
      }
      mover.update();
      mover.render();
    });

  }
}


// background(0);
//
// for (let mover of movers) {
//   if (mouseIsPressed) {
//     let wind = createVector(0.1, 0);
//     mover.applyForce(wind);
//   }
//   let gravity = createVector(0, 0.2);
//   let weight = p5.Vector.mult(gravity, mover.mass);
//   mover.applyForce(weight);
//
//   mover.update();
//   //mover.edges();
//   //mover.show();
//   mover.render();
//}
