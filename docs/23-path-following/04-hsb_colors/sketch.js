//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// /23-path-following/hsb_colors/sketch.js
// calynorama 2023 Jan 23
// also available at https://editor.p5js.org/carlynorama/sketches/-5zDLBfUZ


let controller;
const boxSize = 21;

const gridSize = boxSize+ 3.4;
const rows = 6;
const cols = 6;
const col_qty = 5;

let hueShift = 10;

function setup() {
  controller = new ControlledCanvas(900, 600);
  colorMode(HSB);
  frameRate(1);
}

function draw() {
  background(220);
  
  hueShift += 1;
 
  row(0, col_qty, hueShift);
  
  translate(-col_qty*cols*gridSize, rows*gridSize);
  row(4, col_qty, hueShift);
  
  translate(-col_qty*cols*gridSize, rows*gridSize);
  row(9, col_qty, hueShift);
  
  translate(-col_qty*cols*gridSize, rows*gridSize);
  row(14, col_qty, hueShift);

}

function keyPressed() {
  controller.keyPressed();
}


function testColors(hues) {
  push()
  //0, 72, 144, 216, 288, 360
  for (i=1; i < cols; i++) {
    for (j=1; j < rows ; j++) {
    fill(hues, i*20, j*20);
    rect(i*gridSize, j*gridSize, boxSize, boxSize);
      //print(i*20,j*20)
    }
  }
  pop();
}

function hueColor(i, hueShift) {
  let hue = 18*i + hueShift;
  return hue % 360;
}

function row(startNum, qty, hueShift) {
  for (let i=0; i<=qty; i++) {
    if (i > 0) { translate(cols*gridSize, 0);  }
    text(hueColor(startNum + i, hueShift),boxSize,boxSize-5);
    testColors(hueColor(startNum + i, hueShift));
  }
}
