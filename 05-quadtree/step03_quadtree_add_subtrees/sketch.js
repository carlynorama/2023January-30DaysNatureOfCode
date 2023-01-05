let movers = [];
let qTree;
let qtDisplay;

function setup() {

  let colors = [
    color(204, 204, 0),
    color(0, 204, 204),
    color(204, 0, 204),
    color(0, 51, 204),
    color(204, 51, 0),
  ]

  createControlledCanvas(400, 400);
  background(51);

  //vide suggestion for random
  for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let v = p5.Vector.random2D();
    let m = random(25, 100);
    movers[i] = new Mover(x, y, v.x, v.y, m, color(204, 50));
  }
  qTree = new QuadTree(100,100,200,200, 50);
  qtDisplay = new QuadTreeDrawer(qTree);

  console.log("4");

}

function draw() {

  frameRate(12);
  if (runFlag) {
    background(51);
    qTree.points = [];
    qTree.subtrees = [];

    fill(102);
    stroke(153);


    qtDisplay.drawBounds();

    let box = qTree.bounds;
    movers.forEach(mover => {
      if (box.contains(mover.position.x, mover.position.y)) {
        mover.color_tmp = color(204, 102, 102);
        qTree.addPoint(mover.position.x, mover.position.y);
      }
      else {
        mover.color_tmp = mover.color_start;
      }

      movers.forEach(other => {
        if (mover !== other) {
          stroke(204);
          mover.attract(other);
          //line(mover.position.x, mover.position.y, other.position.x, other.position.y);
          mover.render();
        }
      });

    });

    movers.forEach(mover => {
      mover.update();
    });

    qtDisplay.drawPoints();

  }
}
