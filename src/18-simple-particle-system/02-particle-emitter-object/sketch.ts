//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 18-simple-particle-system/01-particle-emitter.ts
// written by calynorama 2023 Jan 18
//
// Derived From
// The Coding Train / Daniel Shiffman
// https://editor.p5js.org/codingtrain/sketches/QRzgzQLnQ

//TODO: Random Shuffle https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html

let emitters:Emitter[] = []

//NOTE Particles have a dissipation factor to chill out the world.
const g = 0.1;
let gravity:Vector;
const particleSize = 5;

function setup() {
  
  createControlledCanvas(400, 400);
  background(204);

  gravity = new Vector(0, g);
  emitters.push(new Emitter(width/2, height/6));

  console.log("-------- DONE SETUP --------");
}
function draw() {
  if (runFlag) {
      background(204);

      emitters.forEach(emitter => {
        emitter.addParticle(3);
        emitter.applyGravityAndWeaken(gravity, 2);
        emitter.update();
        drawParticles(emitter.particles, emitter.origin);
      })

  }
}

function mousePressed() {
  emitters.push(new Emitter(mouseX, mouseY));
}

function drawParticles(particles:Particle[], anchor:Vector) {
  for (let p = 0; p < particles.length-1; p++) {
    showParticle(particles[p]);
    showSpringBetween(particles[p], anchor)
  }
}
function showSpringBetween(a:{x:number, y:number}, b:{x:number, y:number}) {
  //strokeWeight;
  stroke(0, 0, 51, 5);
  line(a.x, a.y, b.x, b.y);
}
function showParticle(particle:Particle) {
  //strokeWeight(2);
  push();
  noStroke();
  fill(204, particle.health);
  circle(particle.position.x, particle.position.y, particleSize);
  stroke(0, 0, 51, particle.health);
  fill(0, 51, 102, particle.health);
  circle(particle.position.x, particle.position.y, particleSize);
  fill(0, 51, 102, particle.health);
  circle(particle.position.x, particle.position.y, particleSize/2);
  pop();
}

function showRoot(particle:Particle) {
  //strokeWeight(2);
  noStroke();
  fill(204);
  circle(particle.position.x, particle.position.y, particleSize*5);
  stroke(0, 0, 51);
  fill(153, 102, 51, 200);
  circle(particle.position.x, particle.position.y, particleSize * 5);
  fill(0, 102, 51);
  circle(particle.position.x, particle.position.y, particleSize);
}
