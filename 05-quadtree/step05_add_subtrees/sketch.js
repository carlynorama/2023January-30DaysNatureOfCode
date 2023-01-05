let movers = [];
let qTree;
let qtDisplay;

let numberOfPointsInBounds = 0;
let numberOfPointsInTree = 0;

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

  //generateMoverSet(100);
  movers = loadMoverSet();

  console.log("make first qtree");
  qTree = new QuadTree(100,100,200,200, 5);
  qtDisplay = new QuadTreeDrawer(qTree);

  // let throwingX = 277.6318366730977;
  // let throwingY = 186.80057493258775;
  let throwingX = 120.04105975672697;
  let throwingY = 285.2761365342877;

  let result = testSubTreeBounds(qTree, throwingX, throwingY);
   if (!result) {
     throw new Error("Should of passed.");
   } else {
     console.log("working check.")
   }

  console.log("--------- End of Setup ---------");
  noLoop();

}



function draw() {


  frameRate(5);
  if (runFlag) {
    //background(51);
    qTree.points = [];
    qTree.subtrees = [];

    // fill(102);
    // stroke(153);
    //qtDisplay.drawBounds();



    let box = qTree.bounds;
    stroke(153);
    movers.forEach(mover => {
      if (box.contains(mover.position.x, mover.position.y)) {
        displayFound(qTree.limit);
        mover.color_tmp = color(204, 102, 102);
        let y = qTree.addPoint(mover.position.x, mover.position.y, displayAdded);
        //console.log("sketch addpoint", y);
      }
      else {
        mover.color_tmp = mover.color_start;
      }

      mover.render();

      // movers.forEach(other => {
      //   if (mover !== other) {
      //     stroke(204);
      //     mover.attract(other);
      //     //line(mover.position.x, mover.position.y, other.position.x, other.position.y);
      //     //mover.render();
      //   }
      // });

    });

    movers.forEach(mover => {
      mover.update();
    });

    console.log(qTree.points.length);
    //console.log(qTree.subTrees)
    stroke(255,0,0);
    // drawSubTrees(qTree);
    //qtDisplay.drawPoints();

  }
}

function displayAdded(row_limit) {
  //numberOfPointsInTree +=1;
  let limit = constrain(row_limit, 1, 25);
  let y = (floor(numberOfPointsInTree/limit) * 15) + 5;
  let x = (numberOfPointsInTree % limit * 15) + 5;
  numberOfPointsInTree +=1;

  stroke(204, 102, 102);
  fill(51);
  rect(x, y, 10, 10);
}

function displayFound(row_limit) {
  //numberOfPointsInTree +=1;
  let limit = constrain(row_limit, 1, 25);
  let y = (floor(numberOfPointsInBounds/limit) * 15) + 5;
  let x = (numberOfPointsInBounds % limit * 15) + 5;
  numberOfPointsInBounds +=1;

  stroke(102, 102, 102);
  fill(51);
  rect(x, y, 10, 10);
}

function testSubTreeBounds(tree, throwingX, throwingY) {
  //let throwingX = 277.6318366730977;
  //let throwingY = 186.80057493258775;

  testTreeBounds(tree.bounds, throwingX, throwingY);

  let subBounds = tree.bounds.quads()
  console.log(subBounds);
  for (let wtf of subBounds) {
    console.log(wtf.pretty());
    if (testTreeBounds(wtf, throwingX, throwingY)) {
      return true;
    }
  }

  return false;
}

function testTreeBounds(bounds, testX, testY) {
  if (bounds.contains(testX, testY)) {
    fill(0,255,0, 15)
    circle(testX, testY, 10);
    console.log(testX, testY,"point in bounds");
    return true
  } else {
    fill(255,0,0, 15)
    circle(testX, testY, 10);
    console.log(testX, testY,"point not in bounds");
    return false
  }
}
