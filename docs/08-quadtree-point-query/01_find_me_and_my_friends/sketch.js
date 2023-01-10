let thisWidth = 400;
let thisHeight = 400;
let qTree;
let element_limit = 6;

let pointSet = [];
let pointIndex = 0;
let thisQueryPoint;
let thisQueryBounds;
let diameter = 10;
let myFriends = [];
let myNeighborhood;

// ------------------------------------------------------------------------ setup()
function setup() {

  createControlledCanvas(400, 400);
  background(51);



  qTree = QuadTree.createQuadTree(0,0,thisWidth,thisHeight,element_limit);

	for (let i = 0; i < 300; i++) {
		let x = randomGaussian(thisWidth / 2, thisWidth / 8);
		let y = randomGaussian(thisHeight / 2, thisHeight / 8);
    qTree.addPoint(x,y, successPoint);
    thisQueryPoint = new Point(x,y);
    pointSet.push(thisQueryPoint);
  }

  //thisQueryPoint = makePoint();
   console.log(thisQueryPoint.pretty());
   thisQueryBounds = new Bounds(thisQueryPoint, new Size(1,1));

  //qTree.doWithSubTreeInfo(fullTreeResults);
  qTree.infoFromSubtreesTouching(thisQueryBounds, handleTreeInfo);

  //let result = qTree.findPointValue(thisQueryPoint.x, thisQueryPoint.y);
  //console.log(result); 

  console.log("--------- End of Setup ---------");

}

// -------------------------------------------------------------- update ()

function update() {
  thisQueryPoint = fetchPoint();// makePoint(); //
  let result = qTree.findPointValue(thisQueryPoint.x, thisQueryPoint.y);
  if (result != null) {
    //console.log("foundOne");
    myFriends = result.companions;
    myNeighborhood = result.bounds;
  }

}

function fetchPoint() {
  pointIndex += 1;
  return pointSet[pointIndex]
  //return(pointSet[Math.floor(Math.random()*pointSet.length)]);
}

//Takes too long to find a new point if ever!
function makePoint() {
  queryPointX = randomGaussian(thisWidth / 2, thisWidth / 8);
  queryPointY = randomGaussian(thisHeight / 2, thisHeight / 8);
  return new Point(queryPointX, queryPointY);
  //return(pointSet[Math.floor(Math.random()*pointSet.length)]);
}



// ------------------------------------------------------------------------ draw()
function draw() {
  if (runFlag) {
    frameRate(1);
  
    background(51);
    update();
 
    noFill();
    stroke(102, 102, 102);
    qTree.doWithLeafBounds(drawBounds);
    qTree.doWithPoints(drawFieldPoint);
  
 
   drawNeighborhood(myNeighborhood);
   drawFriends(myFriends);
   drawMe(thisQueryPoint);
 }
}




// ------------------------------------------------------------ functions passed to QuadTree()
function drawBounds(bounds) {
  rect(bounds.x, bounds.y, bounds.width, bounds.height);
  ellipseMode(CENTER);
  ellipse(bounds.x, bounds.y, 5);
}

//Only runs once during set up. Could use it to create a set, etc. 
function successPoint(point) { }

function drawFriends(points) {
  for (point of points) {
    noFill();
    stroke(51, 204, 102);
    ellipseMode(CENTER);
    ellipse(point.x, point.y, 3);
  }
}

function drawMe(point) {
  fill(152, 51, 204);
  noStroke();
  ellipseMode(CENTER);
  ellipse(point.x, point.y, 5);
}

function drawFieldPoint(point) {
  if (!(typeof(point.x) === 'number' && typeof(point.y) === 'number')) {
    throw new Error('sketch.allPoints: are you sure you got a point?');
  }
  fill(205);
  noStroke();
  ellipseMode(CENTER);
  ellipse(point.x, point.y, 2);
}

function drawBounds(bounds) {
  rectMode(CORNER);
  rect(bounds.x, bounds.y, bounds.width, bounds.height);
}

function drawNeighborhood(bounds) {
  rectMode(CORNER);
  stroke(204, 51, 204);
  noFill();
  rect(bounds.x, bounds.y, bounds.width, bounds.height);
}

function handleTreeInfo(points, bounds, level, quadrantPath) {
  console.log(level, quadrantPath, points[0], points[1], points[2], points[3], points[4], points[5], bounds.pretty());
  myFriends = points;
  let test = QuadTree.getSubTreeFrom(qTree, level, quadrantPath);
  //console.log(test.bounds.pretty());
  myNeighborhood = test.bounds;
}

