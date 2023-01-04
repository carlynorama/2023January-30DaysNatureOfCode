let movers = [];

let box;

function setup() {

  let color1 = color(204, 204, 0, 255);
  let color2 = color(0, 204, 204, 255);
  let color3 = color(204, 0, 204, 255);
  let color4 = color(0, 51, 204);

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

  let range = new Range(20,100);
  console.log('inclusiveContains')
  console.log(20, range.inclusiveContains(20));
  console.log(30, range.inclusiveContains(30));
  console.log(10, range.inclusiveContains(10));
  console.log(100, range.inclusiveContains(110));
  console.log(100, range.inclusiveContains(100));
  console.log('exclusiveContains')
  console.log(20, range.exclusiveContains(20));
  console.log(30, range.exclusiveContains(30));
  console.log(10, range.exclusiveContains(10));
  console.log(110, range.exclusiveContains(110));
  console.log(100, range.exclusiveContains(100));
  console.log('upperInclusiveContains')
  console.log(20, range.upperInclusiveContains(20));
  console.log(30, range.upperInclusiveContains(30));
  console.log(10, range.upperInclusiveContains(10));
  console.log(110, range.upperInclusiveContains(110));
  console.log(100, range.upperInclusiveContains(100));
  console.log('lowerInclusiveContains')
  console.log(20, range.lowerInclusiveContains(20));
  console.log(30, range.lowerInclusiveContains(30));
  console.log(10, range.lowerInclusiveContains(10));
  console.log(110, range.lowerInclusiveContains(110));
  console.log(100, range.lowerInclusiveContains(100));


  box = new Bounds(0, 0, 200, 200);
  console.log(box.minX(),box.minY());
  console.log(box.maxX(),box.maxY());
  console.log('all should be true, bounds are upper limit inclusive for now')
  console.log(box.contains(30,30));
  console.log(box.contains(200,200));
  console.log('all should be false')
  console.log(box.contains(0,0));
  console.log(box.contains(300,300));



}

function draw() {

  frameRate(12);
  if (runFlag) {
    background(51);

    fill(102);
    stroke(153);
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
