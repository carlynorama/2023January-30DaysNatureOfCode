"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 18-simple-particle-system/03-particle-emitter-experiments.ts
// written by calynorama 2023 Jan 18
// following: https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/4-particles/2-particle-emitters
let emitters = [];
//NOTE Particles have a dissipation factor to chill out the world.
const g = 0.01;
let gravity;
const particleSize = 5;
function setup() {
    createControlledCanvas(400, 400);
    background(0, 0, 80);
    gravity = new Vector(0, g);
    emitters.push(new Emitter(width / 2, height / 6));
    ellipseMode(CENTER);
    colorMode(HSB);
    console.log("-------- DONE SETUP --------");
}
function draw() {
    if (runFlag) {
        background(0, 0, 80);
        emitters.forEach(emitter => {
            emitter.addParticle(3);
            emitter.applyGravityAndWeaken(gravity, 0.005);
            emitter.update();
            drawParticles(emitter.particles, emitter.origin);
        });
    }
}
function mousePressed() {
    emitters.push(new Emitter(mouseX, mouseY));
}
function drawParticles(particles, anchor) {
    for (let p = 0; p < particles.length - 1; p++) {
        showParticle(particles[p]);
        stroke(degrees(particles[p].heading), 50, 60, particles[p].health * 10);
        showSpringBetween(particles[p], anchor);
    }
}
function showSpringBetween(a, b) {
    //strokeWeight;
    //stroke(0, 0, 51, 5);
    line(a.x, a.y, b.x, b.y);
}
function showParticle(particle) {
    //strokeWeight(2);
    push();
    translate(particle.position.x, particle.position.y);
    let hue = degrees(particle.heading);
    let health = 100 * particle.health;
    // If using alpha draw a background for the particle.
    // noStroke();
    // fill(204); <-- background color
    // circle(0, 0, particleSize);
    noStroke();
    //stroke(hue, saturation, 25);
    fill(hue, 40, 80, health);
    // circle(0, 0, particleSize);
    // fill(hue, saturation, 50);
    // circle(0, 0, particleSize/2);
    //TRIANGLE
    push();
    rotate(particle.heading);
    //  fill(255, particle.health);
    triangle(-particleSize, -particleSize / 2, -particleSize, particleSize / 2, particleSize, 0);
    pop();
    pop();
    // push();
    // translate(particle.position.x, particle.position.x);
    // rotate(particle.heading);
    // triangle(-particleSize, -particleSize / 2, -particleSize, particleSize / 2, particleSize, 0);
    // pop();
    // point(particle.position.x, particle.position.x);
}
// function showRoot(particle:Particle) {
//   //strokeWeight(2);
//   noStroke();
//   fill(204);
//   circle(particle.position.x, particle.position.y, particleSize*5);
//   stroke(0, 0, 51);
//   fill(153, 102, 51, 200);
//   circle(particle.position.x, particle.position.y, particleSize * 5);
//   fill(0, 102, 51);
//   circle(particle.position.x, particle.position.y, particleSize);
// }
