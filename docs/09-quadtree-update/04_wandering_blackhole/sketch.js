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

let memoryLength = 100;
let timePassed = 0;
let rememberedDead = [];
let onTheBlock = [];

let thisQueryPoint;
let diameter = 20;
let myMonster;

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
    qTree.addPoint(x,y, successPoint); 
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

  console.log("--------- End of Setup ---------");
  
}

// -------------------------------------------------------------- update ()

function update() {
  thisQueryPoint = fetchPoint();
  myNeighborhood = Bounds.createBoundsFromCenter(thisQueryPoint.x, thisQueryPoint.y, diameter, diameter);

  onTheBlock = qTree.popRadius(thisQueryPoint.x, thisQueryPoint.y, diameter/2);
  rememberedDead.push(...onTheBlock);

  diameter = (rememberedDead.length * inc * 3) + 20;

  if (timePassed % memoryLength == 0) {
    rememberedDead.shift();
    //console.log("forgetting");
  }

  timePassed += 1;
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
  
  frameRate(8);
  
   background(51);
   update();
  

   noFill();
   stroke(102, 102, 102);
   qTree.doWithLeafBounds(drawBounds);
   qTree.doWithPoints(drawFieldPoint);
 
  rememberedDead.forEach((point) => { drawGone(point) } )
  onTheBlock.forEach((point) => { drawFound(point) } )

  drawMonster(myNeighborhood);
  drawCenter(thisQueryPoint);

}

}


// ------------------------------------------------------------ functions passed to QuadTree()

//Only runs once during qTree setup. 
function successPoint(point) { 
  fieldPointsToClear.push(point);
}

function drawFound(point) {
    noFill();
    stroke(255);
    ellipseMode(CENTER);
    ellipse(point.x, point.y, 3);
}

function drawGone(point) {
  noFill();
  stroke(0, 100);
  ellipseMode(CENTER);
  ellipse(point.x, point.y, 3);
}

function drawCenter(point) {
  fill(0, 100);
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
  stroke(255,20);
  rectMode(CORNER);
  rect(bounds.x, bounds.y, bounds.width, bounds.height);
}

function drawMonster(bounds) {
  ellipseMode(CORNER);
  fill(0, 80);
  noStroke();
  ellipse(bounds.x, bounds.y, bounds.width, bounds.height);

}

