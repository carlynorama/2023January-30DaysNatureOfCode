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
let pathFollower;
let path;
function setup() {
    controller = new ControlledCanvas(400, 400);
    pathFollower = new PathFollower(50, 200, 30);
    //path = Path.createLinearPath(20, random(0,400), 350, random(0,400));
    let start = { x: 350, y: random(0, 400) };
    path = Path.createPath(start, { x: 300, y: random(0, 400) }, { x: 200, y: random(0, 400) }, { x: 100, y: random(0, 400) }, { x: 20, y: random(0, 400) });
    console.log(path.locations);
    background(0, 0, 80);
    ellipseMode(CENTER);
    colorMode(HSB);
    console.log("-------- DONE SETUP --------");
}
//let counter = 270;
function draw() {
    background(0, 0, 80, 10);
    drawPath(path);
    let locationInfo = pathFollower.findClosestPathPoint(path);
    circle(locationInfo.point.x, locationInfo.point.y, 14);
    pathFollower.follow(path);
    pathFollower.update(400, 400);
    stroke(0, 0, 40);
    //fill(0, 0, 60);
    noFill();
    showFollower(pathFollower.vehicle);
    showApparatus(pathFollower);
    // push();
    // stroke(0, 0, 100);
    // showTrails(pathFollower);
    // pop();
}
function keyPressed() {
    controller.keyPressed();
}
function drawPath(path) {
    for (let i = 0; i < path.locations.length - 1; i++) {
        line(path.locations[i].x, path.locations[i].y, path.locations[i + 1].x, path.locations[i + 1].y);
    }
    //console.log(path.locations[0].x, path.locations[0].y, path.locations[1].x, path.locations[1].y)
}
function showFollower(vehicle) {
    //strokeWeight(2);
    push();
    translate(vehicle.x, vehicle.y);
    // let hue = map(distance, 0, width, 240, 420);
    // fill(hue, 60, 60);
    //TRIANGLE
    rotate(vehicle.heading);
    triangle(-vehicleSize, -vehicleSize / 3, -vehicleSize, vehicleSize / 3, 0, 0);
    pop();
}
function showTrails(wanderer) {
    for (let path of wanderer.trails) {
        beginShape();
        noFill();
        for (let v of path) {
            //vertex(v.x, v.y);
            curveVertex(v.x, v.y);
        }
        endShape();
    }
}
function drawVector(vector, weight, hue) {
    push();
    strokeWeight(weight);
    stroke(hue, 40, 60);
    line(0, 0, vector.x, vector.y);
    translate(vector.x, vector.y);
    rotate(vector.angle2D());
    const arrowTip = 8;
    line(0, 0, -arrowTip, -arrowTip / 2);
    line(0, 0, -arrowTip, arrowTip / 2);
    pop();
}
function drawGrayVector(vector, weight, brightness) {
    push();
    strokeWeight(weight);
    stroke(0, 0, brightness);
    line(0, 0, vector.x, vector.y);
    translate(vector.x, vector.y);
    rotate(vector.angle2D());
    const arrowTip = 8;
    line(0, 0, -arrowTip, -arrowTip / 2);
    line(0, 0, -arrowTip, arrowTip / 2);
    pop();
}
function showApparatus(pathFollower) {
    const marker_size = 8;
    noFill();
    //DRAW lookAheadPoint info
    // stroke(0, 80, 40);
    // let checkPoint = pathFollower.lookAheadCanvasPoint()
    // line(0, 0, checkPoint.x, checkPoint.y);
    push();
    stroke(0, 80, 40);
    translate(pathFollower.vehicle.x, pathFollower.vehicle.y);
    rotate(pathFollower.vehicle.heading);
    line(0, 0, pathFollower.lookAheadDistance, 0);
    translate(pathFollower.lookAheadDistance, 0);
    circle(0, 0, marker_size);
    pop();
    //path segment info
    for (let i = 0; i < path.locations.length - 1; i++) {
        push();
        stroke(90, 0, 65, 10);
        line(0, 0, path.locations[i + 1].x, path.locations[i + 1].y);
        line(0, 0, path.locations[i].x, path.locations[i].y);
        let newSegment = path.locations[i + 1].subtracting(path.locations[i]);
        translate(path.locations[i].x, path.locations[i].y);
        drawGrayVector(newSegment, 1, 30);
        pop();
        //vector to project
        push();
        let toProject = pathFollower.lookAheadCanvasPoint().subtracting(path.locations[i]);
        translate(path.locations[i].x, path.locations[i].y);
        drawVector(toProject, 1, 180);
        pop();
        push();
        let projection = toProject.projectOn(newSegment);
        let projectionCanvasPoint = projection.addedTo(path.locations[i]);
        stroke(180, 40, 60);
        circle(projectionCanvasPoint.x, projectionCanvasPoint.y, marker_size);
        translate(path.locations[i].x, path.locations[i].y);
        drawVector(projection, 1, 180);
        pop();
    }
}
// function butterfly(x:number, y:number, angle:number, butterflySize:number = 10) {
//   push();
//   translate(x, y);
//   rotate(angle);
//   //triangle(-butterflySize/2, -butterflySize / 2, -butterflySize/2, butterflySize / 2, 0, 0);
//   triangle(butterflySize/2, butterflySize / 2, butterflySize/2, -butterflySize / 2, 0, 0);
//   pop();
// }
// function showWanderer(vehicle:DrawableVehicle) {
//   //strokeWeight(2);
//   push();
//     translate(vehicle.x, vehicle.y);
//     // let hue = map(distance, 0, width, 240, 420);
//     // fill(hue, 60, 60);
//     //TRIANGLE
//     push();
//       rotate(vehicle.heading);
//       triangle(-vehicleSize, -vehicleSize/3, -vehicleSize, vehicleSize/3, 0, 0);
//     pop();
//   pop();
// }
// function showTarget(target:Vector) {
//   push();
//   translate(target.x, target.y);
//   circle(0,0, vehicleSize);
//   pop();
// }
