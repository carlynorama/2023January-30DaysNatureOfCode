"use strict";
let originx = 200;
let originy = 200;
let angle = 0;
let r = 150;
function setup() {
    createControlledCanvas(400, 400);
    originx = width / 2;
    originy = height / 2;
    background(51);
}
let lastX, lastY;
//Assumes translate will happen before. 
function drawPolar(angle, r, drawCall) {
    //check that r is always +? 
    push();
    let x = r * cos(angle);
    let y = r * sin(angle);
    //let a = new Vector(x - lastX, y - lastY).perpendicularAngle();
    let a = new Vector(x - lastX, y - lastY).angle();
    //pass it angle an it faces out.
    drawCall(x, y, a);
    lastX = x;
    lastY = y;
    pop();
}
let direction = 1;
function draw() {
    let color2 = color(0, 204, 204, 255);
    //let color3 = color(204);
    if (runFlag) {
        background(51, 20);
        stroke(color2);
        noFill();
        strokeWeight(4);
        ellipseMode(CENTER);
        //draw polor sends push and pop
        translate(originx, originy);
        drawPolar(angle, r, drawMe);
        angle += 0.04;
        r -= 0.2 * direction;
        //console.log(r);
        if (r > width / 2) {
            direction = 1;
        }
        else if (r < 0) {
            direction = -1;
        }
        noFill();
        strokeWeight(4);
        ellipseMode(CENTER);
        ellipse(0, 0, r);
    }
}
function drawMe(x, y, a) {
    let color1 = color(51, 204, 153, 100);
    stroke(color1);
    strokeWeight(2);
    let size = 10; //mover.mass;
    push();
    translate(x, y);
    rotate(a);
    triangle(-size, -size / 2, -size, size / 2, size, 0);
    //point(x, y);
    pop();
}
//# sourceMappingURL=sketch.js.map