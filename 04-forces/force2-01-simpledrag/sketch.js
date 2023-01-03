let movers = [];
let numMovers = 12;

let liquidBoundary = 0;
//https://sciencenotes.org/table-of-density-of-common-materials/
let liquidRho = 0.0005; 
let airRho = 0.00001;
//let mu = 0.1;

// let color1 = color(204, 204, 0, 255);
// let color2 = color(0, 204, 204, 255);
// let color3 = color(204);

function setup() {

  let color1 = color(204, 204, 0, 255);
  let color2 = color(0, 204, 204, 255);
  let color3 = color(204);
  createControlledCanvas(400, 400);
  liquidBoundary = width/2;
  background(51);
  let gravity = createVector(0,0.1);
  for (let i = 0; i < numMovers; i++) {
    movers[i] = new Mover(random(0, width), 0, random(1,8), color1, gravity);
  }


}

function draw() {
  if (runFlag) {
    let color1 = color(204, 204, 0, 255);
    let color2 = color(0, 204, 204, 255);
    let color3 = color(204);

    let wind = createVector(0.5,0);

    background(51);

    stroke(color3);
    line(0, liquidBoundary, width,liquidBoundary);

    let windIsBlowing = false;
    if (mouseIsPressed) {
      windIsBlowing = true;
    }

    movers.forEach(mover => {
       if (mover.pos.y > liquidBoundary) {
         mover.color = color3;
         mover.applyDrag(liquidRho);
        } else {
          mover.color = color1;
          mover.applyDrag(airRho);
       }

      mover.applyGravity();
      mover.update();
      mover.render();
    });

  }
}
