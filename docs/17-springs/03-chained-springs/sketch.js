"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 17-springs/04-recursive-spring.ts
// written by calynorama 2023 Jan 16
//
// Derived From
// Spring Forces (Spring OOP)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP
//see also https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-oscillations/a/spring-forces
/*
F_spring =−k X displacement
*/
let originX;
let originY;
let springForce;
let rootParticle;
let particles = [];
let numParticles = 5;
let particleSize = 20;
let spacing = 10;
//let gravity = 0.01;
function setup() {
    createControlledCanvas(400, 400);
    originX = width / 2;
    originY = height / 10;
    rootParticle = new Particle(originX, originY);
    springForce = new SpringForce(0.03, spacing);
    for (let p = 0; p < numParticles; p++) {
        particles.push(new Particle(originX, ((p + 1) * spacing) + originY));
    }
    background(204);
}
function draw() {
    if (runFlag) {
        //blendMode(HARD_LIGHT);
        showRoot(rootParticle);
        background(204, 30);
        //console.log("applying forces");
        for (let p = 0; p < numParticles; p++) {
            if (p !== 0) {
                let effect = springForce.calculateBetween(particles[p], particles[p - 1]);
                //console.log("effect",effect);
                particles[p - 1].applyForce(effect);
                particles[p].applyForce(effect.scaledBy(-1));
            }
            else {
                let effect = springForce.calculateBetween(particles[p], rootParticle);
                //console.log("effect",effect);
                particles[p].applyForce(effect.scaledBy(-1));
            }
        }
        drawParticles(particles, rootParticle);
        
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
        //counter += 1;
    }
}
function drawParticles(particles, anchor) {
    for (let p = 0; p < numParticles; p++) {
        if (p !== 0) {
            showSpringBetween(particles[p], particles[p - 1]);
        }
        else {
            showSpringBetween(particles[p], anchor);
        }
        showParticle(particles[p]);
    }
}
function showSpringBetween(a, b) {
    //strokeWeight;
    stroke(0, 0, 51);
    line(a.position.x, a.position.y, b.position.x, b.position.y);
}
function showParticle(particle) {
    //strokeWeight(2);
    noStroke();
    fill(204);
    circle(particle.position.x, particle.position.y, particleSize);
    stroke(0, 0, 51);
    fill(0, 51, 102, 200);
    circle(particle.position.x, particle.position.y, particleSize);
    fill(0, 51, 102);
    circle(particle.position.x, particle.position.y, particleSize / 2);
}
function showRoot(particle) {
    //strokeWeight(2);
    noStroke();
    fill(204);
    circle(particle.position.x, particle.position.y, particleSize * 2);
    stroke(0, 0, 51);
    fill(102, 153, 51, 200);
    circle(particle.position.x, particle.position.y, particleSize * 2);
    fill(0, 102, 51);
    circle(particle.position.x, particle.position.y, particleSize);
}
