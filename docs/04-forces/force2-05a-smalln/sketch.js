let movers = [];

function setup() {

  let color1 = color(204, 204, 0, 255);
  let color2 = color(0, 204, 204, 255);
  let color3 = color(204, 0, 204, 255);
  let color4 = color(204, 102,0);

  createControlledCanvas(400, 400);
  background(51);

  //vide suggestion for random
  // for (let i = 0; i < 5; i++) {
  //   let x = random(width);
  //   let y = random(height);
  //   let v = p5.Vector.random2D();
  //   let m = random(25, 100);
  //   movers[i] = new Mover(x, y, v.x, v.y, m);
  // }


  // //2, placed a pair
  // movers[0] = new Mover(100, 200, 0, 5, 10, color1);
  // movers[1] = new Mover(300, 200, 0, -5, 10, color3);

  //3, one in the center.
  movers[0] = new Mover(100, 200, 0, 5, 10, color1);
  movers[1] = new Mover(300, 200, 0, -5, 10, color2);
  movers[2] = new Mover(200, 200, 0, 0, 10, color3);

  //4, places at corners of a square.
  // movers[0] = new Mover(300, 200, 0, 5, 10, color1);
  // movers[1] = new Mover(100, 200, 0, -5, 10, color2);
  // movers[2] = new Mover(200, 300, -5, 0, 10, color3);
  // movers[3] = new Mover(200, 100, 5, 0, 10, color4);
}

function draw() {
  if (runFlag) {
    background(51, 10);

        movers.forEach(mover => {
          movers.forEach(other => {
              if (mover !== other) {
                stroke(mover.color)
                mover.attract(other);
                line(mover.position.x, mover.position.y, other.position.x, other.position.y);
              }
            });

        });

        movers.forEach(mover => {
          mover.update();
          mover.render();
        });
  }
}
