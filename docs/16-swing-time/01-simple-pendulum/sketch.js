"use strict";
let originx = 200;
let originy = 200;
let angle = 0;
let angle_inc = 0.01;
let angleV = 0;
let angleA = 0;
let r = 150;
let mover;
let gravity = 0.01;
function setup() {
    //noiseSeed(12);
    createControlledCanvas(400, 400);
    originx = width / 2;
    originy = height / 2;
    mover = TetheredPolarMover.createPolarMover(angle, r);
    background(204);
    //noLoop();
}
function draw() {
    if (runFlag) {
        background(204);
        strokeWeight(1);
        translate(originx, originy);
        let force = gravity * Math.cos(angle);
        angleA = (force) / r;
        angleV += angleA;
        angle += angleV;
        console.log("angleA", angleA, "theta, c(t)", angle, Math.cos(angle));
        //mover.incrementAngle(angleV);
        mover.applyGravity(gravity);
        //mover.update();
        //mover.setAngle(angle);
        //console.log(mover.pretty());
        stroke(0, 51, 102, 200);
        // if (angle % 0.0314 < 0.01) { line(0, 0, mover.position.x, mover.position.y);}
        line(0, 0, mover.position.x, mover.position.y);
        stroke(0, 0, 51, 255);
        fill(0, 51, 102, 200);
        //mover.needsTranslatedCartesian(drawMe);
        mover.needsCartesian(drawMe);
        //line(0, 0, mover.position.x, mover.position.y);
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
