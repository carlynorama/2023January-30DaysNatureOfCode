let thisWidth = 400;
let thisHeight = 400;
let qTree;
let element_limit = 6;

let queryBounds;
let startPoint; 
let endPoint; 

// ------------------------------------------------------------------------ setup()
function setup() {

  createControlledCanvas(400, 400);
  background(51);



  qTree = QuadTree.createQuadTree(0,0,thisWidth,thisHeight,element_limit);

	for (let i = 0; i < 300; i++) {
		let x = randomGaussian(thisWidth / 2, thisWidth / 8);
		let y = randomGaussian(thisHeight / 2, thisHeight / 8);
    qTree.addPoint(x,y, successPoint);
  }

  startPoint =  new Point(63,78+50);
  endPoint = new Point(220,156+50);
  queryBounds = Bounds.createBoundsFromPoints(startPoint, endPoint);
  //console.log(queryBounds.pretty());


  qTree.doWithSubTreeInfo(fullTreeResults);

  console.log("--------- End of Setup ---------");
  //noLoop();

}

// ------------------------------------------------------------ functions passed to QuadTree()
function drawBounds(bounds) {
  rect(bounds.x, bounds.y, bounds.width, bounds.height);
  ellipseMode(CENTER);
  ellipse(bounds.x, bounds.y, 5);
}

//Only runs once during set up. Could use it to create a set, etc. 
function successPoint(point) {
  fill(205);
  noStroke();
  ellipseMode(CENTER);
  ellipse(point.x, point.y, 2);
}

function somePointsFunction(point) {
  if (!(typeof(point.x) === 'number' && typeof(point.y) === 'number')) {
    throw new Error('sketch.allPoints: are you sure you got a point?');
  }
  noFill();
  stroke(51, 204, 102);
  ellipseMode(CENTER);
  ellipse(point.x, point.y, 3);
}

function allPointsFunction(point) {
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

function fullTreeResults(points, bounds, level, quadrantPath) {
  console.log(level, quadrantPath, points[0], points[1], points[2], points[3], bounds.pretty());
}


// ------------------------------------------------------------------------ draw()
function draw() {
  
    background(51);

   noFill();
   stroke(102, 102, 102);
   qTree.doWithLeafBounds(drawBounds);
   //QuadTreeDrawer.drawSubTrees(qTree, 0);

  noFill();
  stroke(51, 204, 102);
  queryBounds.updateCenter(mouseX, mouseY);
  drawBounds(queryBounds);

  qTree.doWithPoints(allPointsFunction);
  qTree.doWithPointsIn(queryBounds, somePointsFunction);


  //noLoop();
}
