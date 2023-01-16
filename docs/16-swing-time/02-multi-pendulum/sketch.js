"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 16-swing-time/02-mulit-pendulum/sketch.ts
// written by calynorama 2023 Jan 15
//
let originx = 200;
let originy = 200;
let angle = 0;
let angle_inc = 0.01;
let angleV = 0;
let angleA = 0;
let r = 150;
let moverA;
let moverB;
let gravity = 0.01;
function setup() {
    //noiseSeed(12);
    createControlledCanvas(400, 400);
    originx = width / 2;
    originy = height / 2;
    moverA = TetheredPolarMover.createPolarMover(angle, r);
    moverB = TetheredPolarMover.createPolarMover(angle, r / 2);
    background(204);
    //noLoop();
}
function draw() {
    if (runFlag) {
        background(204);
        strokeWeight(1);
        translate(originx, originy);
        moverA.applyGravity(gravity);
        moverB.applyGravity(gravity);
        //MOVER A
        stroke(0, 51, 102, 200);
        // if (angle % (22/7) < 0.01) { line(0, 0, moverA.position.x, moverA.position.y);}
        line(0, 0, moverA.position.x, moverA.position.y);
        stroke(0, 0, 51, 255);
        fill(0, 51, 102, 200);
        //mover.needsTranslatedCartesian(drawMe);
        moverA.needsCartesian(drawMe);
        //MOVER B
        stroke(0, 102, 51, 200);
        // if (angle % (22/7) < 0.01) { line(0, 0, moverA.position.x, moverA.position.y);}
        line(0, 0, moverB.position.x, moverB.position.y);
        stroke(0, 51, 0, 255);
        fill(0, 102, 51, 200);
        //mover.needsTranslatedCartesian(drawMe);
        moverB.needsCartesian(drawMe);
    }
}
function drawMe(x, y, a) {
    push();
    let size = 10;
    ellipseMode(CENTER);
    circle(x, y, size * 2);
    push();
    //stroke(204);
    translate(x, y);
    line(-size / 2, 0, size / 2, 0);
    rotate(a);
    line(-size, 0, size, 0);
    pop();
    // 
    // rotate(a + mover.angularVelocity);
    // triangle(-size/2, -size / 2, -size/2, size / 2, size/2, 0);
    //stroke(51);
    //point(x, y);
    pop();
}
// let a:Vector;
// let b:Vector;
// let c:Vector;
// a = Vector.createAngleVector(Math.PI/3, 100);
// b = Vector.createAngleVector(Math.PI/6, 100);
// c = a.added(b);
// function drawVectorAdd(a:Vector, b:Vector) {
//   push();
//   strokeWeight(1);
//   c = a.added(b);
//   line(0, 0, a.x, a.y);
//   line(a.x, a.y, a.x + b.x, a.y + b.y);
//   line(0, 0, c.x, c.y);
//   pop();
// }
