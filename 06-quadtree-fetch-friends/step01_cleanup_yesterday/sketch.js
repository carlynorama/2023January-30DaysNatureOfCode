let movers = [];
let qTree;
let qtDisplay;
let element_limit = 6;

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

  // Constructor Tests.
  // let bounds = new Bounds(100,100,200,200);
  // qTree = new QuadTree(bounds, 5);
  qTree = QuadTree.createQuadTree(100,100,200,200,element_limit);

  qtDisplay = new QuadTreeDrawer(qTree);


  console.log("--------- End of Setup ---------");
  //noLoop();

}



function draw() {
    frameRate(5);
    background(51);
    // qTree.clear();
    // qTree.subtrees = [];
    qTree = QuadTree.createQuadTree(100,100,200,200,element_limit);
    numberOfPointsInBounds = 0;
    numberOfPointsInTree = 0;

    fill(75);
    stroke(102);
    qtDisplay.drawBounds();

    let box = qTree.bounds;
    //stroke(153);
    noStroke();
    movers.forEach(mover => {




      movers.forEach(other => {
        if (mover !== other) {
          //stroke(204);
          mover.attract(other);
          //line(mover.position.x, mover.position.y, other.position.x, other.position.y);
        }
      });
      mover.update();
      mover.render();

      if (box.contains(mover.position.x, mover.position.y)) {
        displayFound(qTree.limit);
        mover.color_tmp = color(204, 102, 102);
        let y = qTree.addPoint(mover.position.x, mover.position.y, displayAdded);
      }
      else {  mover.color_tmp = mover.color_start; }

    });

    movers.forEach(mover => {
      mover.update();
      mover.render();
    });



    stroke(204, 102, 102);
    QuadTreeDrawer.drawSubTrees(qTree, 0);

    let test = color(204);
    //console.log(test);
    QuadTreeDrawer.drawSubPoints(qTree, 0,test);
    //qtDisplay.drawPoints();

    //YES! Everyone is in there!
    // console.log("instance walk");
    // qTree.walk();
    //console.log("static walk");
    //QuadTree.walkTree(qTree, 0);
}

function displayAdded(point) {
  //numberOfPointsInTree +=1;
  let limit = constrain(element_limit, 1, 25);
  let y = (floor(numberOfPointsInTree/limit) * 10) + 5;
  let x = (numberOfPointsInTree % limit * 10) + 5;
  numberOfPointsInTree +=1;

  stroke(204, 102, 102);
  fill(51);
  rect(x, y, 5, 5);
}

function displayFound(row_limit) {
  //numberOfPointsInTree +=1;
  let limit = constrain(row_limit, 1, 25);
  let y = (floor(numberOfPointsInBounds/limit) * 10) + 5;
  let x = (numberOfPointsInBounds % limit * 10) + 5;
  numberOfPointsInBounds +=1;

  stroke(102, 102, 102);
  fill(51);
  rect(x, y, 5, 5);
}
