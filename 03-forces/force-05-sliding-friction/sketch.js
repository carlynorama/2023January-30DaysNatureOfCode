let movers = [];
let numMovers = 12;
//let mu = 0.1;

// let color1 = color(204, 204, 0, 255);
// let color2 = color(0, 204, 204, 255);
// let color3 = color(204);

function setup() {
  let color1 = color(204, 204, 0, 255);
  let color2 = color(0, 204, 204, 255);
  let color3 = color(204);
  createControlledCanvas(400, 400);
  let gravity = createVector(0,0.1);
  for (let i = 0; i < numMovers; i++) {
    movers[i] = new Mover(random(0, width), 200, random(1,8), color1, gravity);
  }

}

function draw() {
  if (runFlag) {
    let color1 = color(204, 204, 0, 255);
    let color2 = color(0, 204, 204, 255);
    let color3 = color(204);
    
    let wind = createVector(0.5,0);

    //let gravity = createVector(0,0.1);

    background(51);

    stroke(color3);
    line(0, 200, width,200);

    let windIsBlowing = false;
    if (mouseIsPressed) {
      windIsBlowing = true;
    }

    movers.forEach(mover => {
      if (windIsBlowing) {
        mover.applyForce(wind);
      }

       if (mover.isSliding()) {
        mover.color = color3;
          mover.applyFriction2(0.01);
        } else {
        mover.color = color1;
       }

      mover.update();
      mover.render();
    });

  }
}
