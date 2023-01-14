"use strict";
let originx = 200;
let originy = 200;
let angle = 0;
let r = 150;
let direction = 1;
let moverA;
let moverB;
function setup() {
    createControlledCanvas(400, 400);
    originx = width / 2;
    originy = height / 2;
    moverA = PolarMover.createPolarMover(angle, r);
    moverB = PolarMover.createPolarMover(angle, r);
    background(51);
}
function draw() {
    if (runFlag) {
        //background(51, 0);
        noFill();
        translate(originx, originy);
        moverA.setPosition(angle, r);
        stroke(51, 204, 153, 100);
        moverA.needsCartesian(drawMe);
        angle += 0.04;
        r -= 0.2 * direction;
        if (r > width / 2) {
            direction = 1;
        }
        else if (r < 0) {
            direction = -1;
        }
        //let degreesIn = (4*0.01745329252)
        moverB.updatePosition(moverB.position.normalized().perpendicularAngle() + Math.PI / 64, 1);
        stroke(204);
        moverB.needsCartesian(drawMe);
    }
}
function drawMe(x, y, a) {
    push();
    strokeWeight(2);
    let size = 10;
    push();
    translate(x, y);
    rotate(a);
    triangle(-size, -size / 2, -size, size / 2, size, 0);
    pop();
    stroke(51);
    point(x, y);
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
