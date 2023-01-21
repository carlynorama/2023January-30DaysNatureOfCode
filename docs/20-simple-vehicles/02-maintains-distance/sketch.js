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
let vehicle;
let fear;
let home;
//let fearRange = 320000;
let safety = 100; //hypot of half canvas
function setup() {
    controller = new ControlledCanvas(400, 400);
    controller.disableGalleryMode();
    controller.enableRecording();
    vehicle = SimpleVehicle.createStillVehicle(50, 50);
    fear = new Vector(width / 2, height / 2);
    home = new Vector(width / 2, height / 2);
    background(0, 0, 80);
    ellipseMode(CENTER);
    colorMode(HSB);
    console.log("-------- DONE SETUP --------");
}
function draw() {
    background(0, 0, 80, 10);
    home = new Vector(mouseX, mouseY);
    let steering = vehicle.maintainDistance(home, safety); //.scaledBy(5);
    vehicle.applyInternalPower(steering);
    //if (!vehicle.checkForArrival(home) || vehicle.checkForArrival(fear)) {
    vehicle.update();
    ///}
    let distance = vehicle.position.distanceTo(fear);
    //showFear(fear, distance);
    showVehicle(vehicle, distance);
    showSafety(home);
    showHome(home);
    controller.recordingWatcher();
}
function keyPressed() {
    controller.keyPressed();
}
function showDesireLineBetween(a, b) {
    line(a.x, a.y, b.x, b.y);
}
function showVehicle(vehicle, distance) {
    //strokeWeight(2);
    push();
    translate(vehicle.x, vehicle.y);
    let hue = map(distance, 0, width, 240, 420);
    fill(hue, 60, 60);
    //TRIANGLE
    push();
    rotate(vehicle.heading);
    triangle(-vehicleSize, -vehicleSize / 2, -vehicleSize, vehicleSize / 2, vehicleSize, 0);
    pop();
    pop();
}
function showFear(target, distance) {
    push();
    translate(target.x, target.y);
    let hue = map(distance, 0, width, 420, 240);
    fill(hue, 60, 60);
    circle(0, 0, vehicleSize);
    pop();
}
function showSafety(target) {
    push();
    translate(target.x, target.y);
    //let hue = map(distance, 0, width, 420, 240);
    //fill(hue, 60, 60);
    noFill();
    circle(0, 0, safety * 2);
    pop();
}
function showHome(target) {
    push();
    translate(target.x, target.y);
    //let hue = map(distance, 0, width, 420, 240);
    //fill(hue, 60, 60);
    noFill();
    circle(0, 0, vehicleSize * 2);
    pop();
}
