let mover;

function setup() {
  let color1 = color(204, 204, 0, 255);
  let color2 = color(0, 204, 204, 255);
  //let color3 = color(204);
  createControlledCanvas(400, 400);
  background(51);

  mover = new Mover(0,0,50,color1);
  attractor = new Attractor(200,200,500,color2);

}

function draw() {
  if (runFlag) {
    background(51, 5);
    // let mouse = createVector(mouseX, mouseY);
    // mover.acceleration = p5.Vector.sub(mouse, mover.pos);
    // mover.acceleration.setMag(0.1);
    attractor.attract(mover);
    mover.update();

    attractor.render();
    mover.render();

  }
}
