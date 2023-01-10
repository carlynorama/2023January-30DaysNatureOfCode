let thisWidth = 400;
let thisHeight = 400;
let element_limit = 6;

let particleSet;

let pointSet = [];
let pointIndex = 0;
const pointQty = 5000;

const xoff = 0;
const yoff = 10000;
const inc = 0.01;


let thisQueryPoint;
let diameter = 20;
let myNeighborhood;

function mouseClicked() {
  runFlag = false;
}

// ------------------------------------------------------------------------ setup()
function setup() {

  createControlledCanvas(thisWidth, thisHeight);
  background(51);

  particleSet = new ParticleSet(thisWidth, thisHeight, element_limit);
  particleSet.populateSet(1000);

  for (let i = 0; i < pointQty; i++) {
    let x = map(noise(xoff+ i*inc), 0, 1, 0, width);
    let y = map(noise(yoff + i*inc), 0, 1, 0, height);
    thisQueryPoint = new Point(x,y);
    pointSet.push(thisQueryPoint);
  }

  myNeighborhood = Bounds.createBoundsFromCenter(thisQueryPoint.x, thisQueryPoint.y, diameter, diameter);



  console.log("--------- End of Setup ---------");
  //noLoop();
}

// ------------------------------------------------------------------------ update()
function update() {
  thisQueryPoint = fetchPoint();
  myNeighborhood = Bounds.createBoundsFromCenter(thisQueryPoint.x, thisQueryPoint.y, diameter, diameter);
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
 background(51);
 particleSet.update();
 QuadTree.boundsAccess(particleSet.qtree, drawBounds);
 particleSet.draw();

 drawFinger(myNeighborhood);
 drawCenter(thisQueryPoint);
}

}


// ------------------------------------------------------------ drawing functions()


function drawBounds(bounds) {
  stroke(255,20);
  rectMode(CORNER);
  rect(bounds.x, bounds.y, bounds.width, bounds.height);
}

function drawCenter(point) {
  fill(0, 100);
  noStroke();
  ellipseMode(CENTER);
  ellipse(point.x, point.y, 5);
}

function drawFinger(bounds) {
  ellipseMode(CORNER);
  fill(0, 80);
  noStroke();
  ellipse(bounds.x, bounds.y, bounds.width, bounds.height);
}
