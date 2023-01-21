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
let vehicles = [];
//let fearRange = 320000;
let safety = 50; //hypot of half canvas
function setup() {
    controller = new ControlledCanvas(400, 400);
    for (let i = 0; i < 200; i++) {
        let newV = SimpleVehicle.createStillVehicle(random(0, width), random(0, height));
        vehicles.push(newV);
    }
    fear = new Vector(300, 300);
    background(0, 0, 80);
    ellipseMode(CENTER);
    colorMode(HSB);
    console.log("-------- DONE SETUP --------");
}
//let counter = 270;
function draw() {
    background(0, 0, 80, 10);
    fear = new Vector(mouseX, mouseY);
    //counter -= 0.1
    vehicles.forEach(vehicle => {
        let steering = Vector.zero2D();
        //if here should provide some energy saving
        if (Math.abs(vehicle.x - fear.x) < safety && Math.abs(vehicle.y - fear.y) < safety) {
            steering = vehicle.skirt(fear, safety).scaledBy(5);
        }
        if (!vehicle.checkForArrival(vehicle.startLocation)) {
            steering = steering.added(vehicle.approach(vehicle.startLocation));
        }
        vehicle.applyInternalPower(steering);
        vehicle.update();
        let distance = vehicle.position.distanceTo(fear);
        showVehicle(vehicle, distance);
    });
    showFear(fear);
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
function showFear(target) {
    push();
    translate(target.x, target.y);
    circle(0, 0, vehicleSize);
    pop();
}
function showSafetyRing(target) {
    push();
    translate(target.x, target.y);
    noFill();
    circle(0, 0, safety * 2);
    pop();
}
