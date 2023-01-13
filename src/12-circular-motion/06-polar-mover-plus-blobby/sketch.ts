let originx = 200;
let originy = 200;

let noiseMax = 0.5;
let spikeRange = 50;

let angle = 0;
let r = 150;
let direction = 1;

let mover:PolarMover;


function setup() {
  createControlledCanvas(400, 400);
  originx = width/2;
  originy = height/2;

  mover = PolarMover.createPolarMover(angle, r);

  background(204);
}

function draw() {
  if (runFlag) {
    background(204);

    let xoff = map(cos(angle), -1, 1, 0, noiseMax);   
    let yoff = map(sin(angle), -1, 1, 0, noiseMax);
    //zOff is adding a in an extra in and out breathing to the whole shape, if really need it to loop in time as well would need that to be up against and angle as well. sin of time, for example. 
    r = map(noise(xoff, yoff), 0, 1, 100-spikeRange, 100+spikeRange);


    strokeWeight(1);
    stroke(0);
    noFill();

    translate(originx, originy);

    drawPath();

    mover.setPosition(angle, r);
    mover.needsCartesian(drawMe);
    
    angle += 0.04;
    

  }
}

function drawPath() {
  push();
  beginShape();
  for (let a = 0; a < TWO_PI; a +=0.01) {
    //where in the noise cloud am I?
    let xoff = map(cos(a), -1, 1, 0, noiseMax);   
    let yoff = map(sin(a), -1, 1, 0, noiseMax);
    //zOff is adding a in an extra in and out breathing to the whole shape, if really need it to loop in time as well would need that to be up against and angle as well. sin of time, for example. 
    let r = map(noise(xoff, yoff), 0, 1, 100-spikeRange, 100+spikeRange);
    let x = r * cos(a);
    let y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}


function drawMe(x:number, y:number, a:number) {
  push();
  let size = 10; 
  fill(255);
  
  push();
  translate(x, y);
  rotate(a);
  triangle(-size, -size / 2, -size, size / 2, size, 0);
  
  pop();
  //stroke(51);
  point(x, y);
  pop();
}






// let a:Vector;
// let b:Vector;
// let c:Vector;

// a = Vector.createAngleVector(Math.PI/3, 100);
// b = Vector.createAngleVector(Math.PI/6, 100);
// c = a.added(b);

// function drawVectorAdd(a:Vector, b:Vector) {
//   push();
//   strokeWeight(1);
//   c = a.added(b);
//   line(0, 0, a.x, a.y);
//   line(a.x, a.y, a.x + b.x, a.y + b.y);
//   line(0, 0, c.x, c.y);
//   pop();
// }