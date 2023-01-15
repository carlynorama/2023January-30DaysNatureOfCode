let angle_x = 0;
let angle_xV;

let angle_y = 0;
let angle_yV;

const r = 150;
const d = 20;

function setup() {
  createControlledCanvas(400, 400);
  background(204);
  angle_xV = radians(10);
  angle_yV = radians(7);
}



function draw() {
  if (runFlag) {
  background(204, 10);
  translate(200,200);
  
  stroke(102, 80);
  fill(204, 153, 102);
 
  let c = cos(angle_x);
  let s = sin(angle_y);
  if( (c < 0 && s < 0) || (c > 0 && s > 0)) {
    fill(102, 153, 204);
  }
  let y = r*s;
  let x = r*c;
  //push();
  
  line(0, 0, x, y);
  //pop();
  noStroke();
  ellipse(x, y, s*d , c*d);
  
  angle_x += angle_xV;
  angle_y += angle_yV;
}
}