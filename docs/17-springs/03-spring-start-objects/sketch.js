"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 17-springs/01-simple-start.ts
// written by calynorama 2023 Jan 16
//
// Derived From
// Spring Forces (Spring OOP)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw
// Simple Spring: https://editor.p5js.org/codingtrain/sketches/dcd6-2mWa
// Spring Vector: https://editor.p5js.org/codingtrain/sketches/_A2pm_SSg
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP
//see also https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-oscillations/a/spring-forces
/*
F_spring =−k X displacement
*/
let bob;
let anchor;
let spring;
//let gravity;
// let counter = 0;
// let threshold = 1000;
function setup() {
    createControlledCanvas(400, 400);
    bob = new Particle(50, 50);
    anchor = new Particle(350, 350);
    spring = new Spring(0.01, 300, bob, anchor);
    //@todobot for the spin! 
    bob.applyForce(new Vector(0, 1));
    anchor.applyForce(new Vector(0, -1));
    //gravity = createVector(0, 0.1);
    //noLoop();
}
function draw() {
    if (runFlag) {
        //blendMode(HARD_LIGHT);
        background(204, 30);
        showSpring(spring);
        spring.update();
        showParticle(bob);
        bob.update();
        showParticle(anchor);
        anchor.update();
        if (mouseIsPressed) {
            bob.position = new Vector(mouseX, mouseY);
            bob.velocity = Vector.zero2D();
        }
        //counter += 1;
    }
}
function showSpring(spring) {
    //strokeWeight(4);
    stroke(0, 0, 51);
    line(spring.a.position.x, spring.a.position.y, spring.b.position.x, spring.b.position.y);
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
// let y = 250;
// let velocity:Vector;
// let restLength = 200;
// let k = 0.01;
// let gravity:Vector;
// let bob:Vector;
// let anchor:Vector;
// const vDamp = 0.99;
// function setup() {
//   createControlledCanvas(400, 400);
//   anchor = new Vector(width/2, 0);
//   bob = new Vector(width/2, restLength);
//   gravity = new Vector(0, 0.1);
//   velocity = Vector.zero2D();
//   //console.log("----- END OF SETUP -----");
// }
// function draw() {
//   background(204);
//   noStroke();
//   fill(0, 51, 102, 50);
//   stroke(0, 0, 51);
//   line(anchor.x, anchor.y, bob.x, bob.y);
//   circle(bob.x, bob.y, 64);
//   fill(0, 51, 102);
//   circle(bob.x, bob.y, 16);
//   //console.log("----- START MOUSE PRESS -----");
//   if (mouseIsPressed) {
//     bob = new Vector(mouseX, mouseY);
//     velocity = Vector.zero2D();
//   }
//   //console.log("----- START CALCULATION -----");
//   let force = Vector.subtracted(bob, anchor);
//   //console.log("force", force.x, force.y);
//   let x = force.magnitude() - restLength;
//   //console.log("x", x);
//   let n = force.normalized().scaledBy(-1 * k * x);
//   //console.log("n", n.x, n.y);
//   // F = A
//   velocity = velocity.added(n).added(gravity);
//   //console.log("velocity", velocity.x, velocity.y);
//   bob = bob.added(velocity);
//   velocity = velocity.scaledBy(vDamp);
// }
