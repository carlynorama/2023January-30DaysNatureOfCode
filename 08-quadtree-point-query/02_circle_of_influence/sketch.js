let thisWidth = 400;
let thisHeight = 400;
let qTree;
let element_limit = 6;

let pointSet = [];
let pointIndex = 0;
let thisQueryPoint;
let thisQueryBounds;
let diameter = 50;
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

   console.log(thisQueryPoint.pretty());
   thisQueryBounds = Bounds.createBoundsFromCenter(thisQueryPoint.x, thisQueryPoint.y, diameter, diameter);
   console.log(thisQueryBounds.pretty());
   myNeighborhood = thisQueryBounds;
   qTree.infoFromSubtreesTouching(thisQueryBounds, handleTreeInfo);
    
  console.log("--------- End of Setup ---------");
  
}

// -------------------------------------------------------------- update ()

function update() {
  thisQueryPoint = fetchPoint();// makePoint(); //
  thisQueryBounds = Bounds.createBoundsFromCenter(thisQueryPoint.x, thisQueryPoint.y, diameter, diameter);
  myNeighborhood = thisQueryBounds;
  myFriends = [];
  qTree.infoFromSubtreesTouching(thisQueryBounds, handleTreeInfo);
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
  fill(255, 0, 0);
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
  ellipseMode(CORNER);
  rectMode(CORNER);
  stroke(204, 51, 204);
  noFill();
  //rect(bounds.x, bounds.y, bounds.width, bounds.height);
  ellipse(bounds.x, bounds.y, bounds.width, bounds.height);

  ellipseMode(CENTER);
  ellipse(bounds.center.x, bounds.center.y, 8);
}

function handleTreeInfo(points, bounds, level, quadrantPath) {
  //console.log("start", myFriends);
  //console.log(level, quadrantPath, points[0], points[1], points[2], points[3], points[4], points[5], bounds.pretty());
  for (let point of points) {
    //console.log("outside", point.x, point.y);
    if (thisQueryBounds.inscribedCircleContains(point.x,point.y)) {
      //console.log("inside", point.x, point.y);
      myFriends.push(point);
    }
  }
  //console.log("end",myFriends);
}

