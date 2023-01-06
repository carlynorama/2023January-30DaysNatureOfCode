
let staticBounds;
let dynamicBounds;

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
  staticBounds = Bounds.createBounds(150, 150, 100, 100);
  dynamicBounds = Bounds.createBounds(150, 150, 100, 100);

  console.log("--------- End of Setup ---------");
  //noLoop();

}

function drawBounds(bounds) {
  rect(bounds.x, bounds.y, bounds.width, bounds.height);
}

function draw() {
  if (runFlag) {
    background(51);
    stroke(153);

    dynamicBounds.updateCenter(mouseX, mouseY);
    //dynamicBounds.updateOrigin(mouseX, mouseY);

    if (dynamicBounds.intersects(staticBounds)) { fill(204, 204, 204); }
    else { fill(102, 102, 102) } ;

    drawBounds(dynamicBounds);
    drawBounds(staticBounds);

    let intersection = dynamicBounds.intersection(staticBounds);
    if (intersection !== null) { fill(204, 102, 102); drawBounds(intersection); }
  }
}
