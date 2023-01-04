let movers = [];

let G = 100;

function setup() {
  let color1 = color(204, 204, 0, 255);
  let color2 = color(0, 204, 204, 255);
  let color3 = color(204, 0, 204, 255);
  let color4 = color(204);
  createControlledCanvas(400, 400);
  background(51);

  // movers[0] = new Mover(300, 200, 0, 0.1, 1, color1);
  // movers[1] = new Mover(100, 200, 0, -0.1, 1, color2);
  // movers[2] = new Mover(200, 300, -0.1, 0, 1, color3);
  // movers[3] = new Mover(200, 100, 0.1, 0, 1, color4);

  movers[0] = new Mover(300, 200, 0, 5, 10, color1);
  movers[1] = new Mover(100, 200, 0, -5, 10, color2);
  movers[2] = new Mover(200, 300, -5, 0, 10, color3);
  movers[3] = new Mover(200, 100, 5, 0, 10, color4);

}

function draw() {
  if (runFlag) {
    background(51, 1);
    // let mouse = createVector(mouseX, mouseY);
    // mover.acceleration = p5.Vector.sub(mouse, mover.pos);
    // mover.acceleration.setMag(0.1);


    movers.forEach(mover => {
      movers.forEach(other => {
          if (other !== mover) {
            mover.attract(other);
            line(mover.position.x, mover.position.y, other.position.x, other.position.y);
          }
        });
      mover.update();

    });

    movers.forEach(mover => {
      mover.render();
    });
  }
}
