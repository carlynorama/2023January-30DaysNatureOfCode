//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 17-springs/05-chained-springs-refined.ts
// written by calynorama 2023 Jan 16
//
// Derived From
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html

/*
F_spring =−k X displacement
*/

// let angle_x = Math.PI;
// let angle_xV:number;

// let angle_y = Math.PI;
// let angle_yV:number;

const r = 150;

let originX:number;
let originY:number;

let springForce:SpringForce;
let rootParticle:Particle;
let particles:Particle[] = []
const numParticles = 5;

//NOTE Particles have a dissipation factor to chill out the world.
const k = 0.008;
const g = 0.1;
let gravity:Vector;

const particleSize = 5;
const spacing = 10;

let controller:ControlledCanvas;

function setup() {
  background(204);
  controller = new ControlledCanvas(400, 400);
  originX = width/2;
  originY = height/2;

  gravity = new Vector(0, g);

  // angle_xV = radians(0.3);
  // angle_yV = radians(0.2);

  // let s = cos(angle_x);
  // let c = sin(angle_y);

  // let y = r*s + originY;
  // let x = r*c + originX;
  
  rootParticle = new Particle(originX, originY);

  springForce = new SpringForce(k, spacing);
  
  for (let p = 0; p < numParticles; p++) {
      particles.push(new Particle(originX, ((p+1) * spacing) + originY));
  }

  
  console.log("-------- DONE SETUP --------");
}
function draw() {
  if (controller.runFlag) {
      //blendMode(HARD_LIGHT);
      background(204, 5);
      showRoot(rootParticle);

      //these are backwards on purpose
      // let s = cos(angle_x);
      // let c = sin(angle_y);

      // let y = r*s + originY;
      // let x = r*c + originX;

      // rootParticle.position = new Vector(x, y);

      //console.log("applying forces");
      for (let p = 0; p < numParticles; p++) {
        particles[p].applyForce(gravity);
        if (p !== 0) {
            let effect = springForce.calculateBetween(particles[p], particles[p-1]);
          //console.log("effect",effect);

            particles[p-1].applyForce(effect);
            particles[p].applyForce(effect.scaledBy(-1));
        } 
        else {
          let effect = springForce.calculateBetween(particles[p], rootParticle);
          //console.log("effect",effect);
          particles[p].applyForce(effect.scaledBy(-1));
        }
      }
      
      drawParticlesCurve(particles, rootParticle);
      
      showSpringBetween(rootParticle, particles[0]);

      //console.log("updating");
      for (let p = 0; p < numParticles; p++) {
        particles[p].update();
      }

      // if (mouseIsPressed) {
      //   particles[numParticles-1].position = new Vector(mouseX, mouseY);
      //   particles[numParticles-1].velocity = Vector.zero2D();
      // }
      
      if (mouseIsPressed) {
        rootParticle.position = new Vector(mouseX, mouseY);
        rootParticle.velocity = Vector.zero2D();
      }

      // angle_x += angle_xV;
      // angle_y += angle_yV;
  }
}

function keyPressed() {
  controller.keyPressed();
}



function drawParticlesCurve(particles:Particle[], anchor:Particle) {

  noFill();
beginShape();
curveVertex(anchor.position.x, anchor.position.y);



  for (let p = 0; p < numParticles; p++) {
    showParticle(particles[p]);
    curveVertex(particles[p].position.x,particles[p].position.y);
    
  }

  curveVertex(particles[numParticles-1].position.x,particles[numParticles-1].position.y)

  endShape();
}

function drawParticles(particles:Particle[], anchor:Particle) {
  for (let p = 0; p < numParticles; p++) {
    if (p !== 0) {
      showSpringBetween(particles[p], particles[p-1])
    } 
    else {
      showSpringBetween(particles[p], anchor)
    }
    showParticle(particles[p]);
  }
}
function showSpringBetween(a:Particle, b:Particle) {
  //strokeWeight;
  stroke(0, 0, 51);
  line(a.position.x, a.position.y, b.position.x, b.position.y);
}
function showParticle(particle:Particle) {
  //strokeWeight(2);
  push();
  noStroke();
  fill(204);
  circle(particle.position.x, particle.position.y, particleSize);
  stroke(0, 0, 51);
  fill(0, 51, 102, 200);
  circle(particle.position.x, particle.position.y, particleSize);
  fill(0, 51, 102);
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
