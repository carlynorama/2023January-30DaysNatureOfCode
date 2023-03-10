let originx = 200;
let originy = 200;

let noiseMax = 2;
let spikeRange = 50;

let angle = 0;
let angle_inc = 0.01;
let r = 150;
let direction = 1;

let mover:PolarMover;

 let zoff = 0.001; //Z is time. 
 let zoff_inc = 0.001;


function setup() {
  //noiseSeed(12);
  createControlledCanvas(400, 400);
  originx = width/2;
  originy = height/2;

  //------------------------------------------------- MAKE THE MOVER
  //------------------  Make sure mover has the right start velocity. 
  //move to 1 behind zero and create the conditions to seed the mover. 
  let prepAngle = angle - 1 * angle_inc;
  let prepzoff = zoff - 1 * zoff_inc;
  let xoff = map(cos(prepAngle), -1, 1, 0, noiseMax);   
  let yoff = map(sin(prepAngle), -1, 1, 0, noiseMax);
  r = map(noise(xoff, yoff, prepzoff), 0, 1, 100-spikeRange, 100+spikeRange);

  mover = PolarMover.createPolarMover(prepAngle, r);
  //------------------------------------------------------------------
  
  

  background(204);
  //noLoop();
}

function draw() {
  
  if (runFlag) {
  //background(204, 1);
    strokeWeight(1);
    translate(originx, originy);

    stroke(204, 153, 51, 100);
    noFill();
    drawPath(zoff);

    let xoff = map(cos(angle), -1, 1, 0, noiseMax);   
    let yoff = map(sin(angle), -1, 1, 0, noiseMax);
    r = map(noise(xoff, yoff, zoff), 0, 1, 100-spikeRange, 100+spikeRange);

    //console.log(mover.pretty());
    mover.setPosition(angle, r);
    //console.log(mover.pretty());

    stroke(0, 51, 102, 200);
    if (angle % 0.0314 < 0.01) { line(0, 0, mover.position.x, mover.position.y);}
    //line(0, 0, mover.position.x, mover.position.y);

    stroke(0, 0, 51,255);
    fill(0, 51, 102, 200);
    mover.needsCartesian(drawMe);
    
    //line(0, 0, mover.position.x, mover.position.y);
    
    angle += angle_inc;
    zoff += zoff_inc;
    

  }
}

function drawPath(zoff:number) {
  push();
  beginShape();
  for (let a = 0; a < TWO_PI; a +=0.01) {
    //where in the noise cloud am I?
    let xoff = map(cos(a), -1, 1, 0, noiseMax);   
    let yoff = map(sin(a), -1, 1, 0, noiseMax);
    //zOff is adding a in an extra in and out breathing to the whole shape, if really need it to loop in time as well would need that to be up against and angle as well. sin of time, for example. 
    let r = map(noise(xoff, yoff, zoff), 0, 1, 100-spikeRange, 100+spikeRange);
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