

let angles = [];
let anglesV = [];

let spacing = 5;
let total; 

const r = 150;
const d = 20;

function setup() {
  
  createCanvas(400, 400);
  background(204);
  angle_yV = radians(1);
  total = floor(width/spacing);
  
  
  for(let i = 0; i < total; i++ ) {
    angles.push(map(i, 0, total, 0, 2*TWO_PI));
    //anglesV.push(0.2);
    anglesV.push(0.01 + (i/TWO_PI)*0.01);
  }

}



function draw() {
  if (runFlag) {
  background(204, 200);
  translate(0,200);
  
  stroke(102, 80);
  fill(204, 153, 102);
  
  beginShape();
  for(let i = 0; i < total; i++ ) {
      let s = sin(angles[i]);
      let y = r*s;
      let x = i * spacing;
      //ellipse(x, y, 5);
      vertex(x,y);
      angles[i] += anglesV[i];
  }
  endShape(CLOSE);
}
}