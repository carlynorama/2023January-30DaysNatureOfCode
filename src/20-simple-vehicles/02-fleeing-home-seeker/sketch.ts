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
let vehicle:SimpleVehicle;
let fear:Vector;
let home:Vector;

//let fearRange = 320000;

let safety = 100; //hypot of half canvas

function setup() {
  
  controller = new ControlledCanvas(400, 400);
  controller.disableGalleryMode()
  controller.enableRecording()

  vehicle = SimpleVehicle.createStillVehicle(20,20);
  fear = new Vector(width/2, height/2);
  home = new Vector(width/2, height/2);

  background(0, 0, 80);

  

  ellipseMode(CENTER);
  colorMode(HSB);
  console.log("-------- DONE SETUP --------");
}
function draw() {
      background(0, 0, 80, 10);

      fear = new Vector(mouseX, mouseY);

      //linear flee. 
      let fearComponent = vehicle.flee(fear); // skirt(fear, safety);
      
      let desireComponent = vehicle.tackle(home).scaledBy(5);

      //console.log(fearComponent.x, fearComponent.y);

      let steering = desireComponent.added(fearComponent);
      vehicle.applyInternalPower(steering);
      if (!vehicle.checkForArrival(home) || vehicle.checkForArrival(fear)) {
        vehicle.update();
      }
      

      let distance = vehicle.position.distanceTo(fear);
      
      showFear(fear, distance);
      showVehicle(vehicle, distance);
      //showSafety(fear);
      showHome(home);

      controller.recordingWatcher();
}

function keyPressed() {
  controller.keyPressed();
}

function showDesireLineBetween(a:{x:number, y:number}, b:{x:number, y:number}) {
  line(a.x, a.y, b.x, b.y);
}

function showVehicle(vehicle:DrawableVehicle, distance:number) {
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

function showFear(target:Vector, distance:number) {
  push();
  translate(target.x, target.y);
  let hue = map(distance, 0, width, 420, 240);
  fill(hue, 60, 60);
  circle(0,0, vehicleSize);
  pop();
}

function showSafety(target:Vector) {
  push();
  translate(target.x, target.y);
  //let hue = map(distance, 0, width, 420, 240);
  //fill(hue, 60, 60);
  noFill();
  circle(0,0, safety*2);
  pop();
}

function showHome(target:Vector) {
  push();
  translate(target.x, target.y);
  //let hue = map(distance, 0, width, 420, 240);
  //fill(hue, 60, 60);
  noFill();
  circle(0,0, vehicleSize*2);
  pop();
}



