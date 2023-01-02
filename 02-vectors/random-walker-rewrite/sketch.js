let walker;
let runFlag = false;

function run() {
  if (runFlag == false) {
    console.log('running');
    runFlag = true;
  }
}

function stop() {
  if (runFlag == true) {
    console.log('stopping');
    runFlag = false;
  }
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.mouseOver(run);
  canvas.mouseOut(stop);
  walker = new Walker(200, 200, 0.8);
  background(51);
}



function draw() {
  if (runFlag) {
    walker.update();
    walker.render();
  }
}
