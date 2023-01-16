"use strict";
let originx = 200;
let originy = 200;
let angle = 0;
// let angle_inc = 0.01;
// let angleV = 0;
// let angleA = 0;
let r = 150;
let mover;
let gravity = 0.01;
function setup() {
    createControlledCanvas(400, 400);
    originx = width / 2;
    originy = height / 2;
    mover = TetheredPolarMover.createPolarMover(angle, r);
    background(204);
}
function draw() {
    if (runFlag) {
        background(204);
        strokeWeight(1);
        translate(originx, originy);
        // let force = gravity * Math.cos(angle);
        // angleA = (force) / r;
        // angleV += angleA;
        // angle += angleV;
        mover.applyGravity(gravity);
        stroke(0, 51, 102, 200);
        line(0, 0, mover.position.x, mover.position.y);
        stroke(0, 0, 51, 255);
        fill(0, 51, 102, 200);
        mover.needsCartesian(drawMe);
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
    pop();
}
