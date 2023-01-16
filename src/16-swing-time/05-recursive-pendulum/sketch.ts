//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 16-swing-time/03-stacked-pendulum/sketch.ts
// written by calynorama 2023 Jan 15
//


let originx = 200;
let originy = 200;

let size = 15;

let movers:Pendulum[] = []
// let numMovers = 5;

let pendulumA:Pendulum
let pendulumB:Pendulum
let pendulumC:Pendulum
let pendulumD:Pendulum
let pendulumS:Pendulum

//need to have that many colors in the arrays.
let fillColors = [];
let strokeColors = [];

let gravity = 0.01;


function setup() {
  //noiseSeed(12);
  createControlledCanvas(400, 400);
  originx = width/2;
  originy = height/2;//0;//

  fillColors = [color(0, 51, 102, 200), color(153, 102, 0, 200), color(102, 0, 0, 200), color(51, 102, 0, 200), color(51, 0, 102, 200), color(102, 0, 51, 200)]

  strokeColors = [color(0, 0, 51, 200), color(51, 0, 0, 200), color(51, 0, 0, 200), color(0, 51, 0, 200), color(0, 0, 51, 200), color(51, 0, 0, 200)]

  // let minA = -Math.PI/3;
  // let maxA = Math.PI/3;
  // pendulumA = Pendulum.createPendulum(0, random(50, 80));
  // pendulumB = Pendulum.createPendulum(random(minA, maxA), random(50, 80));
  // pendulumC = Pendulum.createPendulum(random(minA, maxA), random(50, 80));
  // pendulumD = Pendulum.createPendulum(random(minA, maxA), random(50, 80));

  //let minA = -Math.PI/3;
  let angle = -Math.PI/3;
  pendulumA = Pendulum.createPendulum(angle, size*2);
  pendulumB = Pendulum.createPendulum(angle, size*2);
  pendulumC = Pendulum.createPendulum(angle, size*2);
  pendulumD = Pendulum.createPendulum(angle, size*2);

  // pendulumC.child = pendulumD;
  // pendulumB.child = pendulumC;
  // pendulumA.child = pendulumB;

  pendulumS = Pendulum.createPendulumStack(angle, size*2, pendulumA, 5, 0);

  

  for (let p = 0; p < 7; p++) {

  }

  background(204);
}

function draw() {
  
  if (runFlag) {
  background(204);
    strokeWeight(1);
    translate(originx, originy);

    pendulumS.updatePendulum(gravity, new Vector(0,0), drawMe);

    push();
    fill(0);
    circle(0,0,size/2)
    pop();


  }
}


function drawMe(location:Vector, pendulum:Pendulum) {
  //let coords = pendulum.cartesian
  push();
  translate(location.x, location.y);
  

  push();
  
  translate(pendulum.x, pendulum.y);
  rotate(pendulum.heading);
  ellipseMode(CENTER);
  circle(0, 0, size*2);
  line(-size/2,0,size/2,0);
  
  line(-size,0,size,0);
  pop();

  line(0, 0, pendulum.x, pendulum.y);
  
  //rotate(Math.PI/3);
  //
  
  //
  //line(0,0,pendulum.x,pendulum.y);
  //line(0,0,location.x, location.y);
  


  //line(-size,0,size,0);
  //circle(pendulum.x, pendulum.y, size*2);

  // push();
  // //stroke(204);
  // translate(0, 0);
  // translate(pendulum.x, pendulum.y);
  // //translate(location.x, location.y);
  // line(-size/2,0,size/2,0);
  // rotate(pendulum.heading);
  // line(-size,0,size,0);
  // pop();
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