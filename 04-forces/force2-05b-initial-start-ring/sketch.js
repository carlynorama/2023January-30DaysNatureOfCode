let movers = [];
let attractor;
const numMovers = 100;

let originx = 200;
let originy = 200;

function setup() {
  let color1 = color(204, 204, 0, 255);
  let color2 = color(0, 204, 204, 255);
  let color3 = color(204);

  createControlledCanvas(400, 400);
  originx = width/2;
  originy = height/2;

  background(51);

  for (let i = 0; i < numMovers; i++) {
    let pos = p5.Vector.random2D();
    let vel = pos.copy();

    vel.rotate(PI/2);
    vel.setMag(5);

    pos.setMag(random(150,150));

    let m = 10;
    if (i % 2 == 0) {
      movers[i] = new Mover(pos.x, pos.y, vel.x, vel.y, m, color1);
    } else {
      movers[i] = new Mover(pos.x, pos.y, vel.x, vel.y, m, color2);
    }
  }

  attractor = new Mover(0, 0, 0, 0, 1000, color1)

}

function draw() {
  if (runFlag) {
    background(51, 50);
    translate(originx, originy);

    movers.forEach(mover => {
      attractor.attract(mover);
      movers.forEach(other => {
          if (other !== mover) {
            mover.attract(other);
          }
        });
      mover.update();

    });

    movers.forEach(mover => {
      mover.render();

    });

    attractor.update();
    //attractor.render();
  }
}
