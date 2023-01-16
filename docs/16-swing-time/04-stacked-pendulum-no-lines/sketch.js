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
let angle = -Math.PI / 6;
let movers = [];
let numMovers = 5;
//need to have that many colors in the arrays.
let fillColors = [];
let strokeColors = [];
let gravity = 0.01;
function setup() {

    createControlledCanvas(400, 400);
    originx = width / 2;
    originy = height / 2;
    fillColors = [color(0, 51, 102, 200), color(153, 102, 0, 200), color(102, 0, 0, 200), color(51, 102, 0, 200), color(51, 0, 102, 200), color(102, 0, 51, 200)];
    strokeColors = [color(0, 0, 51, 200), color(51, 0, 0, 200), color(51, 0, 0, 200), color(0, 51, 0, 200), color(0, 0, 51, 200), color(51, 0, 0, 200)];
    for (let m = 0; m < numMovers; m++) {
        if (m != 0) {
            movers[m] = TetheredPolarMover.createStackedMover(random(-Math.PI, Math.PI), random(10, 50), movers[m - 1].position);
        }
        else {
            movers[0] = TetheredPolarMover.createPolarMover(angle, random(20, 30));
        }
    }
    background(204);
}
function draw() {
    if (runFlag) {
        //background(204,1);
        strokeWeight(1);
        translate(originx, originy);
        //An alternative would be to let p5js draw handle the translate.
        //might be faster. 
        for (let i = 0; i < movers.length; i++) {
            if (i != 0) {
                movers[i].origin = movers[i - 1].translatedPosition;
                movers[i].incrementAngle(movers[i - 1].angularVelocity);
            }
            let root = movers[i].origin;
            movers[i].applyGravity(gravity);
            //stroke(51, 200);
            noStroke();
            line(root.x, root.y, movers[i].translatedPosition.x, movers[i].translatedPosition.y);
            stroke(strokeColors[i]);
            fill(fillColors[i]);
            movers[i].needsTranslatedCartesian(drawMe);
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
    pop();
}