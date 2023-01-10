let thisWidth = 400;
let thisHeight = 400;
let qTree;
let element_limit = 6;

const xoff = 0;
const yoff = 10000;
const inc = 0.01;

fieldPointsQty = 2000;
fieldPointsToClear = [];
let clearFlag = true;

let pointSet = [];
let pointIndex = 0;
const pointQty = 5000;

let thisQueryPoint;
let diameter = 50;
let myNeighborhood;

// function mouseClicked() {
//   runFlag = false;
// }

// ------------------------------------------------------------------------ setup()
function setup() {

  createControlledCanvas(400, 400);
  background(51);



  qTree = QuadTree.createQuadTree(0,0,thisWidth,thisHeight,element_limit);

  for (let i = 0; i < fieldPointsQty; i++) {
		let x = randomGaussian(thisWidth / 2, thisWidth / 8);
		let y = randomGaussian(thisHeight / 2, thisHeight / 8);
    qTree.addPoint(x,y, successPoint); //TODO: success point RERUNS on this point if quad tree is rebalanced. Cant use function to append to array until I fix that.
    //fieldPointsToClear.push(new Point(x,y));
  }

  // if (fieldPointsToClear.length != fieldPointsQty) {
  //   console.log(fieldPointsToClear.length)
  //   throw new Error("wrong number of field points.");
  // }

	for (let i = 0; i < pointQty; i++) {
    let x = map(noise(xoff+ i*inc), 0, 1, 0, width);
    let y = map(noise(yoff + i*inc), 0, 1, 0, height);
    thisQueryPoint = new Point(x,y);
    pointSet.push(thisQueryPoint);
  }

   myNeighborhood = Bounds.createBoundsFromCenter(thisQueryPoint.x, thisQueryPoint.y, diameter, diameter);
   console.log("myNeighborhood", myNeighborhood.x, myNeighborhood.y);

   //this is a very dangerous function because it returns all the points as reference objects? 
   let fullset = qTree.returnAllPoints();
   console.log(fullset);
  //  let removedSet = qTree.popAllPoints();
  //  console.log(removedSet);

  print("hello?");
  console.log("--------- End of Setup ---------");
  //noLoop();
  
}

// -------------------------------------------------------------- update ()

function update() {
  thisQueryPoint = fetchPoint();
  myNeighborhood = Bounds.createBoundsFromCenter(thisQueryPoint.x, thisQueryPoint.y, diameter, diameter);

  fill(204, 50);
  ellipseMode(CENTER);
  ellipse(thisQueryPoint.x, thisQueryPoint.y, diameter);
  let returnedPoints = qTree.popRadius(thisQueryPoint.x, thisQueryPoint.y, diameter/2);
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
if (runFlag) {  
  
  //it doesn't need to be slow I just like it better.
  frameRate(12);
  
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

//Only runs once during qTree setup. 
function successPoint(point) { 
  fieldPointsToClear.push(point);
}

function drawFound(point) {
    noFill();
    //console.log(point.x, point.y)
    // stroke(51, 204, 102);
    // ellipseMode(CENTER);
    // ellipse(point.x, point.y, 3);
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

