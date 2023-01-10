const thisWidth = 400;
const thisHeight = 400;


// function mouseClicked() {
//   runFlag = false;
// }

// ------------------------------------------------------------------------ setup()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setup() {

  createControlledCanvas(thisWidth, thisHeight);
  background(51);



  console.log("--------- End of Setup ---------");
  //noLoop();
}


// ------------------------------------------------------------------------ draw()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function draw() {
if (runFlag) {  
 background(51);

 fill(51, 204, 204);
 rect(200, 200, 10, 10);

}

}


// ------------------------------------------------------------ functions passed to QuadTree()


// function drawBounds(bounds) {
//   stroke(255,20);
//   rectMode(CORNER);
//   rect(bounds.x, bounds.y, bounds.width, bounds.height);
// }