

let outsideBounds;

function setup() {
  createControlledCanvas(400, 400);
  background(51);

  outsideBounds = new Bounds(100,100,200,200);
}

function draw() {
  if (runFlag) {
    //---- NO BOUNDS TYPE
    //subdivideTest(100,100,200,200);
    //subdivideTest(outsideBounds);

    //---- One Set of Bounds
    // let boundsSet = outsideBounds.quads();
    // for (let bounds of boundsSet) {
    //   subdivideTest(bounds);
    // }


    //---- Push a level in
    // let newBoundsArray = [];
    //let boundsSet = outsideBounds.quads();
    // for (let bounds of boundsSet) {
    //   newBoundsArray.push(...bounds.quads());
    // }
    // for (let bounds of newBoundsArray) {
    //   subdivideTest(bounds);
    // }

    //---- Recurse
    let newSet = recurseBoundsSplit(outsideBounds.quads(), 3, 0);
    for (let bounds of newSet) {
      subdivideTest(bounds);
    }
    noLoop();
  }
}

function recurseBoundsSplit(boundsArray, levels, level) {
  let newBoundsArray = [];
  if (level == levels) {
    return boundsArray;
  } else {
    for (let bounds of boundsArray) {
      newBoundsArray.push(...bounds.quads());
    }
    return recurseBoundsSplit(newBoundsArray, levels, level+1);
  }
  return [];
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

  let midX = w + minX;
  let midY = h + minY;

  rectMode(CORNER);
  noFill();
  stroke(204);
  fill(colors[0]);
  rect(midX, minY, w, h);
  fill(colors[1]);
  rect(midX, midY, w, h);
  fill(colors[2]);
  rect(minX, midY, w, h);
  fill(colors[4]);
  rect(minX, minY, w, h);
}


// function subdivideTest(x,y,width, height) {
//   let colors = [
//     color(204, 204, 0),
//     color(0, 204, 204),
//     color(204, 0, 204),
//     color(0, 51, 204),
//     color(204, 51, 0),
//   ]
//     let minX = x;
//     let minY = y;
//
//     let w = width/2;
//     let h = height/2;
//
//     let midX = w + minX;
//     let midY = h + minY;
//
//     rectMode(CORNER);
//     noFill();
//     stroke(204);
//     fill(colors[0]);
//     rect(midX, minY, w, h);
//     fill(colors[1]);
//     rect(midX, midY, w, h);
//     fill(colors[2]);
//     rect(minX, midY, w, h);
//     fill(colors[4]);
//     rect(minX, minY, w, h);
// }
