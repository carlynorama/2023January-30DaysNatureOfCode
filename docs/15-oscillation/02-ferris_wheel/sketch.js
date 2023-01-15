let angle = 0;
let angleV;
const r = 150;
const d = 20;

function setup() {
  createControlledCanvas(400, 400);
  background(204);
  angleV = radians(10);
}



function draw() {
  if (runFlag) {
  background(204, 5);
  translate(200,200);
  
  stroke(102, 80);
  fill(204, 153, 102);
 
  let c = cos(angle);
  let s = sin(angle)
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
  
  angle += angleV;
}
}