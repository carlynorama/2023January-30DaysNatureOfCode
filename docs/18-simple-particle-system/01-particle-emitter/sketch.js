"use strict";
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
let pOrigin;
// let pOrigin_x:number;
// let pOrigin_y:number;
let particles = [];
//const numParticles = 100;
//NOTE Particles have a dissipation factor to chill out the world.
const g = 0.1;
let gravity;
const particleSize = 5;
function setup() {
    background(204);
    createControlledCanvas(400, 400);
    pOrigin = new Vector(width / 2, height / 6);
    gravity = new Vector(0, g);
    console.log("-------- DONE SETUP --------");
}
function draw() {
    if (runFlag) {
        //blendMode(HARD_LIGHT);
        background(204);
        for (let i = 0; i < 3; i++) {
            particles.push(Particle.createRandomVelocityParticle(pOrigin.x, pOrigin.y));
        }
        //console.log("applying forces");
        for (let p = 0; p < particles.length - 1; p++) {
            particles[p].applyForce(gravity);
            particles[p].weakenByAmount(2);
            particles[p].update();
        }
        drawParticles(particles, pOrigin);
        if (mouseIsPressed) {
            pOrigin = new Vector(mouseX, mouseY);
            // pOrigin_x = mouseX
            // pOrigin_y = mouseY
        }
        particles = particles.filter(particle => !particle.finished);
        // particles = particles.filter(particle => !(particle.y > height))
        // particles = particles.filter(particle => !(particle.x > width || particle.x < 0))
        //console.log(particles.length);
    }
}
function drawParticlesCurve(particles, anchor_x, anchor_y) {
    noFill();
    stroke(0, 0, 51, 50);
    beginShape();
    let numParticles = particles.length;
    curveVertex(anchor_x, anchor_y);
    for (let p = 0; p < particles.length - 1; p++) {
        //if (p % 7 == 0) {
        showParticle(particles[p]);
        //}
        curveVertex(particles[p].position.x, particles[p].position.y);
    }
    curveVertex(particles[numParticles - 1].position.x, particles[numParticles - 1].position.y);
    endShape();
}
function drawParticles(particles, anchor) {
    for (let p = 0; p < particles.length - 1; p++) {
        showParticle(particles[p]);
        showSpringBetween(particles[p], anchor);
    }
}
function showSpringBetween(a, b) {
    //strokeWeight;
    stroke(0, 0, 51, 5);
    line(a.x, a.y, b.x, b.y);
}
function showParticle(particle) {
    //strokeWeight(2);
    push();
    noStroke();
    fill(204, particle.health);
    circle(particle.position.x, particle.position.y, particleSize);
    stroke(0, 0, 51, particle.health);
    fill(0, 51, 102, particle.health);
    circle(particle.position.x, particle.position.y, particleSize);
    fill(0, 51, 102, particle.health);
    circle(particle.position.x, particle.position.y, particleSize / 2);
    pop();
}
function showRoot(particle) {
    //strokeWeight(2);
    noStroke();
    fill(204);
    circle(particle.position.x, particle.position.y, particleSize * 5);
    stroke(0, 0, 51);
    fill(153, 102, 51, 200);
    circle(particle.position.x, particle.position.y, particleSize * 5);
    fill(0, 102, 51);
    circle(particle.position.x, particle.position.y, particleSize);
}
