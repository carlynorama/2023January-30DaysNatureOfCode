let movers = [];

let G = 25;

function setup() {
  let color1 = color(204, 204, 0, 255);
  let color2 = color(0, 204, 204, 255);
  let color3 = color(204, 0, 204, 255);
  let color4 = color(204);
  createControlledCanvas(400, 400);
  background(51);

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
  if (runFlag) {
    background(0, 10);

    line(0,0,width, height);
    line(width,0,0,height);

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


    // background(51, 1);
    // // let mouse = createVector(mouseX, mouseY);
    // // mover.acceleration = p5.Vector.sub(mouse, mover.pos);
    // // mover.acceleration.setMag(0.1);
    //
    //
    // movers.forEach(mover => {
    //   movers.forEach(other => {
    //       if (other !== mover) {
    //         mover.attract(other);
    //         line(mover.position.x, mover.position.y, other.position.x, other.position.y);
    //       }
    //     });
    //   mover.update();
    //
    // });
    //
    // movers.forEach(mover => {
    //   mover.render();
    // });
  }
}
