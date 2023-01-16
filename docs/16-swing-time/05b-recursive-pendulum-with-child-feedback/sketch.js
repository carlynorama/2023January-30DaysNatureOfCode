"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 16-swing-time/03-stacked-pendulum/sketch.ts
// written by calynorama 2023 Jan 15
//
let originx = 200;
let originy = 200;
let size = 15;
let movers = [];
// let numMovers = 5;
let pendulumA;
let pendulumB;
let pendulumC;
let pendulumD;
let pendulumS;
//need to have that many colors in the arrays.
let fillColors = [];
let strokeColors = [];
let gravity = 0.01;
function setup() {
    //noiseSeed(12);
    createControlledCanvas(400, 400);
    originx = width / 2;
    originy = height / 2; //0;//
    fillColors = [color(0, 51, 102, 200), color(153, 102, 0, 200), color(102, 0, 0, 200), color(51, 102, 0, 200), color(51, 0, 102, 200), color(102, 0, 51, 200)];
    strokeColors = [color(0, 0, 51, 200), color(51, 0, 0, 200), color(51, 0, 0, 200), color(0, 51, 0, 200), color(0, 0, 51, 200), color(51, 0, 0, 200)];
    // let minA = -Math.PI/3;
    // let maxA = Math.PI/3;
    // pendulumA = Pendulum.createPendulum(0, random(50, 80));
    // pendulumB = Pendulum.createPendulum(random(minA, maxA), random(50, 80));
    // pendulumC = Pendulum.createPendulum(random(minA, maxA), random(50, 80));
    // pendulumD = Pendulum.createPendulum(random(minA, maxA), random(50, 80));
    //let minA = -Math.PI/3;
    let angle = -Math.PI / 3;
    pendulumA = Pendulum.createPendulum(angle, size * 2);
    pendulumS = Pendulum.createPendulumStack(angle, size * 2, pendulumA, 5, 0);
    for (let p = 0; p < 7; p++) {
    }
    background(204);
}
function draw() {
    if (runFlag) {
        background(204);
        strokeWeight(1);
        translate(originx, originy);
        pendulumS.updatePendulum(gravity, new Vector(0, 0), drawMe);
        push();
        fill(0);
        circle(0, 0, size / 2);
        pop();
    }
}
function drawMe(location, pendulum) {
    //let coords = pendulum.cartesian
    push();
    translate(location.x, location.y);
    push();
    translate(pendulum.x, pendulum.y);
    rotate(pendulum.heading);
    ellipseMode(CENTER);
    circle(0, 0, size * 2);
    line(-size / 2, 0, size / 2, 0);
    line(-size, 0, size, 0);
    pop();
    line(0, 0, pendulum.x, pendulum.y);
    pop();
}