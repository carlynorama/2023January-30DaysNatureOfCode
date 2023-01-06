
let staticBounds;

function setup() {

  let colors = [
    color(204, 204, 0),
    color(0, 204, 204),
    color(204, 0, 204),
    color(0, 51, 204),
    color(204, 51, 0),
  ]

  createControlledCanvas(400, 400);
  background(51);
  staticBounds = new Bounds(150, 150, 100, 100);

  console.log("--------- End of Setup ---------");
  //noLoop();

}

function drawBounds(bounds, mode = 'CORNER') {
  rectMode(mode);
  rect(bounds.x, bounds.y, bounds.width, bounds.height);
}

function draw() {
  if runFlag {

    drawBounds(staticBounds);
    
  }
}
