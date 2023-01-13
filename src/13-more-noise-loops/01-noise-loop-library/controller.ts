//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// controller.ts
// written by calynorama 2023 Jan 13
//

var runFlag = true;


function createControlledCanvas(x:number, y:number) {
  let canvas = createCanvas(x, y);
  //let myParent = canvas.parent();
  let selection = select('#embedded-p5js');
  if (selection) {
    console.log(selection);
    runFlag = false;
    canvas.mouseOver(run);
    canvas.mouseOut(stop);
  } else {
    console.log("I am not embedded");
    runFlag = true;
  }
}

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


function keyPressed() {
  if (keyCode === UP_ARROW) {
    if (runFlag) {runFlag = false} else {runFlag = true};
  } 
}

// MUST decrease frame rate in order to use without skipping frames. 
function recordSeries(x: number, min:number, max:number, nameRoot = 'output_gif-'):string {
    if (x > max) { return "widow is past" }
    else if (x < min) { return "not yet" }
    else 
    { save(nameRoot + nf(x, 3) + '.png');
      return "saved frame" } 
}
