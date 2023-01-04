let movers = [];
let numMovers = 12;

function setup() {
  let color1 = color(204, 204, 0, 255);
  let color2 = color(0, 204, 204, 255);
  let color3 = color(204);
  createControlledCanvas(400, 400);
  background(51);

  for (let i = 0; i < numMovers; i++) {
    let x = random(width);
    let y = random(height);
    let m = random(5,100);
    if (i % 2 == 0) {

      movers[i] = new Mover(x, y, m, color1);
    } else {
      movers[i] = new Mover(x, y, m, color2);
    }

  }
  attractor = new Mover(width/2,height/2,500,color3);

}

function draw() {
  if (runFlag) {
    background(51, 1);
    // let mouse = createVector(mouseX, mouseY);
    // mover.acceleration = p5.Vector.sub(mouse, mover.pos);
    // mover.acceleration.setMag(0.1);


    movers.forEach(mover => {
      attractor.attract(mover);
      movers.forEach(other => {
          if (other.pos != mover.pos) {
            mover.attract(other);
          }
        });
      mover.update();

    });

    movers.forEach(mover => {
      mover.render();
    });

    attractor.render();


  }
}
