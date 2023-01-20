//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 19-recordable-particles/02-particle-interfaces.ts
// written by calynorama 2023 Jan 18
// following: https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/4-particles/2-particle-emitters


let controller:ControlledCanvas;

let emitters:Emitter[] = []

//NOTE Particles have a dissipation factor to chill out the world.

const particleSize = 5;

function setup() {
  
  controller = new ControlledCanvas(400, 400);
  controller.disableGalleryMode()
  controller.enableRecording()

  background(0, 0, 80);

  ellipseMode(CENTER);
  colorMode(HSB);
  console.log("-------- DONE SETUP --------");
}
function draw() {
      background(0, 0, 80, 10);


      controller.recordingWatcher();
}

function keyPressed() {
  controller.keyPressed();
}

function showDesireLineBetween(a:{x:number, y:number}, b:{x:number, y:number}) {
  line(a.x, a.y, b.x, b.y);
}

function showVehicle(particle:DrawableVehicle, seekPoint:Vector); {
  //strokeWeight(2);
  push();
    translate(particle.x, particle.y);
    let hue = map();
    noStroke();
    fill(hue, 40, 80);
    //TRIANGLE
    push();
      rotate(particle.heading);
      triangle(-particleSize, -particleSize / 2, -particleSize, particleSize / 2, particleSize, 0);
    pop();
  pop();

}

