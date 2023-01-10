let thisWidth = 400;
let thisHeight = 400;
let qTree;
let element_limit = 6;

const xoff = 0;
const yoff = 10000;
const inc = 0.01;


let pointSet = [];
let pointIndex = 0;
const pointQty = 5000;

let thisQueryPoint;
let thisQueryBounds;
let diameter = 50;
let myNeighborhood;

// ------------------------------------------------------------------------ setup()
function setup() {

  createControlledCanvas(400, 400);
  background(51);



  qTree = QuadTree.createQuadTree(0,0,thisWidth,thisHeight,element_limit);

	for (let i = 0; i < pointQty; i++) {
    let x = map(noise(xoff+ i*inc), 0, 1, 0, width);
    let y = map(noise(yoff + i*inc), 0, 1, 0, height);
    qTree.addPoint(x,y, successPoint);
    thisQueryPoint = new Point(x,y);
    pointSet.push(thisQueryPoint);
  }

   thisQueryBounds = Bounds.createBoundsFromCenter(thisQueryPoint.x, thisQueryPoint.y, diameter, diameter);
   myNeighborhood = thisQueryBounds;
   console.log("thisQueryBounds", thisQueryBounds.x, thisQueryBounds.y);


  console.log("--------- End of Setup ---------");
  //noLoop();
  
}

// -------------------------------------------------------------- update ()

function update() {
  thisQueryPoint = fetchPoint();// makePoint(); //
  thisQueryBounds = Bounds.createBoundsFromCenter(thisQueryPoint.x, thisQueryPoint.y, diameter, diameter);
  myNeighborhood = thisQueryBounds;
}

let reverseFlag = false;
function fetchPoint() {

  if (reverseFlag) { pointIndex -= 1; }
  else { pointIndex += 1; } 
  
  if  (pointIndex > pointQty-1) { reverseFlag = true; pointIndex = pointQty-1; } 
  else if  (pointIndex < 0) { reverseFlag = false; pointIndex = 0; } 

  return pointSet[pointIndex]
}



// ------------------------------------------------------------------------ draw()
function draw() {
if (runFlag) {  frameRate(24);
  
   background(51);
   update();

   noFill();
   stroke(102, 102, 102);
   qTree.doWithLeafBounds(drawBounds);
   qTree.doWithPoints(drawFieldPoint);
 

  drawNeighborhood(myNeighborhood);

  qTree.doWithPointsInRadius(thisQueryPoint.x, thisQueryPoint.y, diameter/2, drawFound);

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

function drawFound(point) {
    noFill();
    //console.log(point.x, point.y)
    stroke(51, 204, 102);
    ellipseMode(CENTER);
    ellipse(point.x, point.y, 3);
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

