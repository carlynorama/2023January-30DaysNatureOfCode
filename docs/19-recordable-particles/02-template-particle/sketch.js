"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 19-recordable-particles/02-particle-interfaces.ts
// written by calynorama 2023 Jan 18
// following: https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/4-particles/2-particle-emitters
let controller;
let emitters = [];
//NOTE Particles have a dissipation factor to chill out the world.
const g = 0.01;
let gravity;
const particleSize = 5;
function setup() {
    controller = new ControlledCanvas(400, 400);
    controller.disableGalleryMode();
    controller.enableRecording();
    background(0, 0, 80);
    gravity = new Vector(0, g);
    emitters.push(new Emitter(width / 2, height / 6));
    ellipseMode(CENTER);
    colorMode(HSB);
    console.log("-------- DONE SETUP --------");
}
function draw() {
    background(0, 0, 80, 10);
    emitters.forEach(emitter => {
        emitter.addParticle(3);
        emitter.applyGravityAndWeaken(gravity, 0.005);
        emitter.update();
        drawParticles(emitter.particles, emitter.origin);
    });
    controller.recordingWatcher();
}
function keyPressed() {
    controller.keyPressed();
}
function mousePressed() {
    emitters.push(new Emitter(mouseX, mouseY));
}
function drawParticles(particles, anchor) {
    for (let p = 0; p < particles.length - 1; p++) {
        showParticle(particles[p]);
        stroke(degrees(particles[p].heading), 50, 60, particles[p].health * 10);
        //showSpringBetween(particles[p], anchor)
    }
}
// function showSpringBetween(a:{x:number, y:number}, b:{x:number, y:number}) {
//   //strokeWeight;
//   //stroke(0, 0, 51, 5);
//   line(a.x, a.y, b.x, b.y);
// }
function showParticle(particle) {
    //strokeWeight(2);
    push();
    translate(particle.x, particle.y);
    let hue = degrees(particle.heading);
    let health = 100 * particle.health;
    noStroke();
    fill(hue, 40, 80, health);
    //TRIANGLE
    push();
    rotate(particle.heading);
    triangle(-particleSize, -particleSize / 2, -particleSize, particleSize / 2, particleSize, 0);
    pop();
    pop();
}
