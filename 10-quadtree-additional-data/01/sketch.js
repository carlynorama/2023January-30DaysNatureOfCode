let thisWidth = 400;
let thisHeight = 400;
let element_limit = 6;

let particleSet;


// function mouseClicked() {
//   runFlag = false;
// }

// ------------------------------------------------------------------------ setup()
function setup() {

  createControlledCanvas(thisWidth, thisHeight);
  background(51);

  particleSet = new ParticleSet(thisWidth, thisHeight, element_limit);
  particleSet.populateSet(20);


  console.log("--------- End of Setup ---------");
  noLoop();
}


// ------------------------------------------------------------------------ draw()
function draw() {
if (runFlag) {  
 background(51);
 particleSet.update()
 particleSet.draw();
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

