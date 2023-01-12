let originx = 200;
let originy = 200;

let angle = 0;
let r = 150;
let direction = 1;


let mover:PolarMover;


function setup() {
  createControlledCanvas(400, 400);
  originx = width/2;
  originy = height/2;

  mover = PolarMover.createPolarMover(angle, r);

  background(51);
}

function draw() {
  
  let color2 = color(0, 204, 204, 255);
  //let color3 = color(204);

  if (runFlag) {
    background(51, 20);
    
    stroke(color2);
    noFill();
    strokeWeight(4);
    ellipseMode(CENTER);

    //draw polor sends push and pop
    translate(originx, originy);
    mover.setPosition(angle, r);
    mover.needsCartesian(drawMe);
  
    angle += 0.04;
    r -= 0.2 * direction;

    //console.log(r);

    if (r > width/2) { direction = 1 }
    else if (r < 0 ) { direction = -1 }
     

    noFill();
    strokeWeight(4);
    ellipseMode(CENTER);
    ellipse(0, 0, r);

  }
}

function drawMe(x:number, y:number, a:number) {
  push();
  let color1 = color(51, 204, 153, 100);
  stroke(color1);
  strokeWeight(2);
  let size = 10; //mover.mass;
  push();
  translate(x, y);
  rotate(a);
  triangle(-size, -size / 2, -size, size / 2, size, 0);
  //point(x, y);
  pop();
  pop();
}
