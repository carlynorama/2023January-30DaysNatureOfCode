"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 19-recordable-particles/02-particle-interfaces.ts
// written by calynorama 2023 Jan 18
// following: https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/4-particles/2-particle-emitters
let controller;
//NOTE Particles have a dissipation factor to chill out the world.
const vehicleSize = 20; //same as docking distance
let wanderer;
function setup() {
    controller = new ControlledCanvas(400, 400);
    wanderer = new Wanderer(80, 40, Math.PI / 3, 15);
    background(0, 0, 80);
    ellipseMode(CENTER);
    noFill();
    colorMode(HSB);
    console.log("-------- DONE SETUP --------");
}
//let counter = 270;
function draw() {
    background(0, 0, 80, 10);
    wanderer.wander();
    wanderer.update(400, 400);
    showWanderer(wanderer.vehicle);
    showApparatus(wanderer);
}
function keyPressed() {
    controller.keyPressed();
}
function showDesireLineBetween(a, b) {
    line(a.x, a.y, b.x, b.y);
}
function showApparatus(wander) {
    // let wanderPoint = wander.wanderCanvasPoint()
    // line(0, 0, wanderPoint.x, wanderPoint.y);
    push();
    stroke(51, 100);
    translate(wander.vehicle.x, wander.vehicle.y);
    line(0, 0, wander.toLookAhead.x, wander.toLookAhead.y);
    translate(wander.toLookAhead.x, wander.toLookAhead.y);
    circle(0, 0, wander.toWanderPoint.magnitude() * 2);
    line(0, 0, wander.toWanderPoint.x, wander.toWanderPoint.y);
    push();
    translate(wander.toWanderPoint.x, wander.toWanderPoint.y);
    circle(0, 0, wander.toWobblePoint.magnitude() * 2);
    line(0, 0, wander.toWobblePoint.x, wander.toWobblePoint.y);
    pop();
    let newItems = wander.toWobbleFromLookAhead();
    //let newPoint = Vector.createAngleVector(newItems.angle(), wander.toWanderPoint.magnitude())
    let newPoint = wander.calculateSeekPoint();
    push();
    //strokeWeight(3);
    //stroke(260, 80, 100);
    line(0, 0, newItems.x, newItems.y);
    pop();
    push();
    translate(newPoint.x, newPoint.y);
    strokeWeight(1);
    fill(300, 80, 100);
    circle(0, 0, 3);
    pop();
    circle(0, 0, 3);
    translate(wander.toWanderPoint.x, wander.toWanderPoint.y);
    translate(wander.toWobblePoint.x, wander.toWobblePoint.y);
    //let n = wander.toWobblePoint.x
    //line(0, 0, 0, -wander.toWobblePoint.y);
    circle(0, 0, 3);
    pop();
}
function showWanderer(vehicle) {
    //strokeWeight(2);
    push();
    translate(vehicle.x, vehicle.y);
    // let hue = map(distance, 0, width, 240, 420);
    // fill(hue, 60, 60);
    //TRIANGLE
    push();
    rotate(vehicle.heading);
    triangle(-vehicleSize, -vehicleSize / 2, -vehicleSize, vehicleSize / 2, vehicleSize, 0);
    pop();
    pop();
}
function showTarget(target) {
    push();
    translate(target.x, target.y);
    circle(0, 0, vehicleSize);
    pop();
}
