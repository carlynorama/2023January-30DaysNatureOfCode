let particles = [];
let thisWidth = 400;
let thisHeight = 400;
let qTree;
let qtDisplay;
let element_limit = 6;

function setup() {

  createControlledCanvas(400, 400);
  background(51);

  qTree = QuadTree.createQuadTree(0,0,thisWidth,thisHeight,element_limit);

	for (let i = 0; i < 300; i++) {
		let x = randomGaussian(thisWidth / 2, thisWidth / 8);
		let y = randomGaussian(thisHeight / 2, thisHeight / 8);
    qTree.addPoint(x,y, successPoint);
  }

  qtDisplay = new QuadTreeDrawer(qTree);


  console.log("--------- End of Setup ---------");
  //noLoop();

}

function successPoint(point) {
  fill(205);
  noStroke();
  ellipseMode(CENTER);
  ellipse(point.x, point.y, 2);
}



function draw() {
    frameRate(5);
    //background(51);

    fill(75);
    stroke(102);

    let test = color(204, 50);
    QuadTreeDrawer.drawSubPoints(qTree, 0, test);

    stroke(204, 102, 102);
    QuadTreeDrawer.drawSubTrees(qTree, 0);

    // console.log("instance walk");
    // qTree.walk();
    //console.log("static walk");
    //QuadTree.walkTree(qTree, 0);
}
