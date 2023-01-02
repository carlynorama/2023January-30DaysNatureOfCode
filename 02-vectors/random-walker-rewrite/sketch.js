let walker;

function setup() {
  createCanvas(400, 400);
  walker = new Walker(200, 200, 0.8);
  background(51);
}

function draw() {
  walker.update();
  walker.render();
}
