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

let predator:Vehicle;
let target:Vehicle;
let target_inset = 40;


function setup() {
  controller = new ControlledCanvas(400, 400);
 
  predator = Vehicle.createStillVehicle(random(0,width),random(0,height));
  target = Vehicle.createStillVehicle(random(target_inset,width-target_inset),random(target_inset,height-target_inset));

  background(0, 0, 80);

  ellipseMode(CENTER);
  colorMode(HSB);
  console.log("-------- DONE SETUP --------");
}
//let counter = 270;
function draw() {
  background(0, 0, 80, 10);

  let p_steering = predator.pursue(target);
  predator.applyInternalPower(p_steering);
  //predator.applyAcceleration(predator.wallCheck(width, height, 0.8));

  let t_steering = target.evade(predator);
  target.applyInternalPower(t_steering);
  target.applyAcceleration(target.wallCheck(width, height, target_inset, 1.0001));

  predator.update();
  target.update();

  if (target.checkForArrival(predator.position)) {
    target = Vehicle.createStillVehicle(random(target_inset,width-target_inset),random(target_inset,height-target_inset));
    //predator = Vehicle.createStillVehicle();
  }

  let distance = predator.position.distanceTo(target.position);
  showPredator(predator, distance);

  showTarget(target.position);

}

function keyPressed() {
  controller.keyPressed();
}

function showDesireLineBetween(a:{x:number, y:number}, b:{x:number, y:number}) {
  line(a.x, a.y, b.x, b.y);
}

function showPredator(vehicle:DrawableVehicle, distance:number) {
  //strokeWeight(2);
  push();
    translate(vehicle.x, vehicle.y);
    let hue = map(distance, 0, width, 240, 420);
    fill(hue, 60, 60);
    //TRIANGLE
    push();
      rotate(vehicle.heading);
      triangle(-vehicleSize, -vehicleSize / 2, -vehicleSize, vehicleSize / 2, vehicleSize, 0);
    pop();
  pop();

}

function showTarget(target:Vector) {
  push();
  translate(target.x, target.y);
  circle(0,0, vehicleSize);
  pop();
}




