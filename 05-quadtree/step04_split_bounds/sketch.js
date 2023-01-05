let movers = [];
let outsideBounds;

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
  // for (let i = 0; i < 10; i++) {
  //   let x = random(width);
  //   let y = random(height);
  //   let v = p5.Vector.random2D();
  //   let m = random(25, 100);
  //   movers[i] = new Mover(x, y, v.x, v.y, m, color(204, 50));
  // }
  outSideBounds = new Bounds(100,100,200,200);
  //console.log(qTree.bounds.origin.x);

  console.log("different");

}

function draw() {
  if (runFlag) {
    subdivideTest(bounds);
  }
}

function subdivideTest(bounds) {
  let colors = [
    color(204, 204, 0),
    color(0, 204, 204),
    color(204, 0, 204),
    color(0, 51, 204),
    color(204, 51, 0),
  ]
    let minX = bounds.origin.x;
    let minY = bounds.origin.y;

    let w = bounds.size.width/2;
    let h = bounds.size.height/2;

    let midX = width + minX;
    let midY = height + minY;

    rectMode(CORNER);
    noFill();
    stroke(colors[0]);
    rect(midX, minY, w, h);
    stroke(colors[1]);
    rect(midX, midY, w, h);
    stroke(colors[2]);
    rect(minX, midY, w, h);
    stroke(colors[3]);
    rect(minX, minY, w, h);
}
