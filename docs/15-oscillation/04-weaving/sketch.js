

let angles = [];
let anglesV = [];

let spacing = 5;
let total; 

const r = 150;
const d = 20;

function setup() {
  createControlledCanvas(400, 400);
  background(204);
  angle_yV = radians(1);
  total = floor(width/spacing);
  
  for(let i = 0; i < total; i++ ) {
    angles.push(i);
    anglesV.push(0.01 + (i/TWO_PI)*0.01);
    
    //angles.push(map(i, 0, total, 0, 2*TWO_PI));
    //anglesV.push(0.02);
  }

}



function draw() {
  if (runFlag) {
  background(204, 200);
  translate(0,200);
  
  stroke(102, 80);
  fill(204, 153, 102);
  
  for(let i = 0; i < total; i++ ) {
      let s = sin(angles[i]);
      let y = r*s;
      let x = i * spacing;
      ellipse(x, y, 5);
      angles[i] += anglesV[i];
  }
}
}