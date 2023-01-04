// Mutual Attract// The Nature of Code

let movers = [];

function setup() {
  createCanvas(400, 400);
  // for (let i = 0; i < 5; i++) {
  //   let x = random(width);
  //   let y = random(height);
  //   let v = p5.Vector.random2D();
  //   let m = random(25, 100);
  //   movers[i] = new Mover(x, y, v.x, v.y, m);
  // }
  movers[0] = new Mover(300, 200, 0, 5, 10);
  movers[1] = new Mover(100, 200, 0, -5, 10);
  movers[2] = new Mover(200, 300, -5, 0, 10);
  movers[3] = new Mover(200, 100, 5, 0, 10);
  background(0);
}

function draw() {
  background(0, 10);

  for (let mover of movers) {
    for (let other of movers) {
      if (mover !== other) {
        mover.attract(other);
        stroke(255);
        line(mover.pos.x, mover.pos.y, other.pos.x, other.pos.y);
      }
    }
  }

  for (let mover of movers) {
    mover.update();
    // mover.show();
    // attractor.attract(mover);
  }
}
