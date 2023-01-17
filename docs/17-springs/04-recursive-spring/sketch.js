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
let springChain;
//let gravity;
// let counter = 0;
// let threshold = 1000;
function setup() {
    createControlledCanvas(400, 400);
    springChain = new SpringyChain();
    //@todobot for the spin! 
    // bob.applyForce (new Vector(0, 1));
    // anchor.applyForce (new Vector(0, -1));
    //gravity = createVector(0, 0.1);
    //noLoop();
    console.log("---------- END SETUP ----------");
}
function draw() {
    if (runFlag) {
        //blendMode(HARD_LIGHT);
        background(204, 30);
        showSpringBetween(springChain.child, springChain.me);
        springChain.updateNode();
        showParticle(springChain.child);
        springChain.child.update();
        showParticle(springChain.me);
        springChain.me.update();
        if (mouseIsPressed) {
            springChain.child.position = new Vector(mouseX, mouseY);
            springChain.child.velocity = Vector.zero2D();
        }
        //counter += 1;
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
    circle(particle.position.x, particle.position.y, 64);
    stroke(0, 0, 51);
    fill(0, 51, 102, 200);
    circle(particle.position.x, particle.position.y, 64);
    fill(0, 51, 102);
    circle(particle.position.x, particle.position.y, 16);
}
