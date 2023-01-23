//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 19-recordable-particles/02-particle-interfaces.ts
// written by calynorama 2023 Jan 18
// following: https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/4-particles/2-particle-emitters


let controller:ControlledCanvas;


//NOTE Particles have a dissipation factor to chill out the world.

const vehicleSize = 20; //same as docking distance

let wanderer:Wanderer;



function setup() {
  controller = new ControlledCanvas(400, 400);
 
  wanderer = new Wanderer(80, 40, Math.PI/3, 15);

  background(0, 0, 80);

  ellipseMode(CENTER);
  colorMode(HSB);
  console.log("-------- DONE SETUP --------");
}
//let counter = 270;
function draw() {
  background(0, 0, 80, 10);

  wanderer.wander();
  wanderer.update(400, 400);

  push();
  stroke(0, 0, 40);
  fill(0, 0, 60);
  showWanderer(wanderer.vehicle);
  pop();

  //showApparatus(wanderer);

  push();
  stroke(0, 0, 100);
  showPaths(wanderer);
  pop();
  
  push();
  let butterflyLoc = wanderer.wanderCanvasPoint()
  fill(300, 80, 100);
  stroke(0, 0, 20);
  butterfly(butterflyLoc.x, butterflyLoc.y, wanderer.toWobblePoint.angle(), 15);
  pop();

}

function keyPressed() {
  controller.keyPressed();
}

function showPaths(wanderer:Wanderer) {
  for (let path of wanderer.paths) {
    beginShape();
    noFill();
    for (let v of path) {
      //vertex(v.x, v.y);
      curveVertex(v.x, v.y);
    }
    endShape();
  }
}


function showApparatus(wanderer:Wanderer) {
  // let wanderPoint = wander.wanderCanvasPoint()
  // line(0, 0, wanderPoint.x, wanderPoint.y);

  push();
  stroke(51, 100);
  translate(wanderer.vehicle.x, wanderer.vehicle.y);
  line(0,0, wanderer.toLookAhead.x, wanderer.toLookAhead.y);

  translate(wanderer.toLookAhead.x, wanderer.toLookAhead.y);
  circle(0, 0, wanderer.toWanderPoint.magnitude()*2);
  line(0,0, wanderer.toWanderPoint.x, wanderer.toWanderPoint.y);

  push();
  translate(wanderer.toWanderPoint.x, wanderer.toWanderPoint.y);
  circle(0, 0, wanderer.toWobblePoint.magnitude()*2);
  line(0,0, wanderer.toWobblePoint.x, wanderer.toWobblePoint.y);
  pop();

  let newItems = wanderer.toWobbleFromLookAhead();
  //let newPoint = Vector.createAngleVector(newItems.angle(), wander.toWanderPoint.magnitude())
  let newPoint = wanderer.calculateSeekPoint();

  push();
  //strokeWeight(3);
  //stroke(260, 80, 100);
  line(0,0, newItems.x, newItems.y);
  pop();

  push();
  translate(newPoint.x, newPoint.y);
  strokeWeight(1);
  fill(300, 80, 100);
  circle(0,0, 3);
  pop();

  circle(0, 0, 3);

  translate(wanderer.toWanderPoint.x, wanderer.toWanderPoint.y);
  translate(wanderer.toWobblePoint.x, wanderer.toWobblePoint.y);

  circle(0, 0, 3);

  pop();
}

function butterfly(x:number, y:number, angle:number, butterflySize:number = 10) {
  push();
  translate(x, y);
  rotate(angle);
  //triangle(-butterflySize/2, -butterflySize / 2, -butterflySize/2, butterflySize / 2, 0, 0);
  triangle(butterflySize/2, butterflySize / 2, butterflySize/2, -butterflySize / 2, 0, 0);
  pop();
}

function showWanderer(vehicle:DrawableVehicle) {
  //strokeWeight(2);
  push();
    translate(vehicle.x, vehicle.y);
    // let hue = map(distance, 0, width, 240, 420);
    // fill(hue, 60, 60);
    //TRIANGLE
    push();
      rotate(vehicle.heading);
      triangle(-vehicleSize, -vehicleSize/3, -vehicleSize, vehicleSize/3, 0, 0);
    pop();
  pop();

}

function showTarget(target:Vector) {
  push();
  translate(target.x, target.y);
  circle(0,0, vehicleSize);
  pop();
}




