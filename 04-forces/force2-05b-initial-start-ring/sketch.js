let movers = [];
let numMovers = 12;

function setup() {
  let color1 = color(204, 204, 0, 255);
  let color2 = color(0, 204, 204, 255);
  let color3 = color(204);
  createControlledCanvas(400, 400);
  background(51);

  for (let i = 0; i < numMovers; i++) {
    let vector = p5.Vector.random2D().normalize();
    vector.setMag(random(100-150));
    let m = random(5,100);
    if (i % 2 == 0) {

      movers[i] = new Mover(vector.x, vector.y, m, color1);
    } else {
      movers[i] = new Mover(x, y, m, color2);
    }

  }


}

function draw() {
  if (runFlag) {
    background(51, 1);

    movers.forEach(mover => {
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



  }
}
