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
let angle = -Math.PI / 6;
let movers = [];
let numMovers = 5;
//need to have that many colors in the arrays.
let fillColors = [];
let strokeColors = [];
let gravity = 0.01;
function setup() {
    //noiseSeed(12);
    createControlledCanvas(400, 400);
    originx = width / 2;
    originy = height / 2;
    fillColors = [color(0, 51, 102, 200), color(153, 102, 0, 200), color(102, 0, 0, 200), color(51, 102, 0, 200), color(51, 0, 102, 200), color(102, 0, 51, 200)];
    strokeColors = [color(0, 0, 51, 200), color(51, 0, 0, 200), color(51, 0, 0, 200), color(0, 51, 0, 200), color(0, 0, 51, 200), color(51, 0, 0, 200)];
    for (let m = 0; m < numMovers; m++) {
        movers.push(TetheredPolarMover.createPolarMover(angle, random(10, 190)));
    }
    background(204);
}
function draw() {
    if (runFlag) {
        background(204);
        strokeWeight(1);
        translate(originx, originy);
        for (let i = 0; i < movers.length; i++) {
            movers[i].applyGravity(gravity);
            stroke(51, 200);
            line(0, 0, movers[i].position.x, movers[i].position.y);
            stroke(strokeColors[i]);
            fill(fillColors[i]);
            movers[i].needsCartesian(drawMe);
        }
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
