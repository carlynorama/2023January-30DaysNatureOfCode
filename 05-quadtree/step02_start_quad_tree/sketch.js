let movers = [];

let box;

let qTree;

function setup() {

  let color1 = color(204, 204, 0, 255);
  let color2 = color(0, 204, 204, 255);
  let color3 = color(204, 0, 204, 255);
  let color4 = color(0, 51, 204);

  createControlledCanvas(400, 400);
  background(51);

  //vide suggestion for random
  for (let i = 0; i < 5; i++) {
    let x = random(width);
    let y = random(height);
    let v = p5.Vector.random2D();
    let m = random(25, 100);
    movers[i] = new Mover(x, y, v.x, v.y, m);
  }
  let qTree = new QuadTree(100,100,200,200, 50);

}

function draw() {

  frameRate(12);
  if (runFlag) {
    background(51);

    fill(102);
    stroke(153);
    let box = qTree.bounds;
    rect(box.origin.x, box.origin.y, box.size.width, box.size.height);


    movers.forEach(mover => {
      if (box.contains(mover.position.x, mover.position.y)) {
        mover.color_tmp = color(204, 102, 102);
      }
      else {
        mover.color_tmp = mover.color_start;
      }
      movers.forEach(other => {
        if (mover !== other) {
          stroke(204);
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
