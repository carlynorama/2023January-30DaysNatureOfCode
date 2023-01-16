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
let size = 20;
let movers = [];
// let numMovers = 5;
let pendulumA;
let pendulumB;
let pendulumC;
let pendulumD;
//need to have that many colors in the arrays.
let fillColors = [];
let strokeColors = [];
let gravity = 0.01;
function setup() {
    //noiseSeed(12);
    createControlledCanvas(400, 400);
    originx = width / 2;
    originy = 0; //height/2;
    fillColors = [color(0, 51, 102, 200), color(153, 102, 0, 200), color(102, 0, 0, 200), color(51, 102, 0, 200), color(51, 0, 102, 200), color(102, 0, 51, 200)];
    strokeColors = [color(0, 0, 51, 200), color(51, 0, 0, 200), color(51, 0, 0, 200), color(0, 51, 0, 200), color(0, 0, 51, 200), color(51, 0, 0, 200)];
    // let minA = -Math.PI/3;
    // let maxA = Math.PI/3;
    // pendulumA = Pendulum.createPendulum(0, random(50, 80));
    // pendulumB = Pendulum.createPendulum(random(minA, maxA), random(50, 80));
    // pendulumC = Pendulum.createPendulum(random(minA, maxA), random(50, 80));
    // pendulumD = Pendulum.createPendulum(random(minA, maxA), random(50, 80));
    let angle = Math.PI / 9;
    pendulumA = Pendulum.createPendulum( angle, 60);
    pendulumB = Pendulum.createPendulum( angle, 60);
    pendulumC = Pendulum.createPendulum( angle, 60);
    pendulumD = Pendulum.createPendulum( angle, 60);
    pendulumC.child = pendulumD;
    pendulumB.child = pendulumC;
    pendulumA.child = pendulumB;
    background(204);
}
function draw() {
    if (runFlag) {
        background(204);
        strokeWeight(1);
        translate(originx, originy);
        pendulumA.walk(gravity, new Vector(0, 0), drawMe);
        // //An alternative would be to let p5js draw handle the translate.
        // //might be faster. 
        // for (let i = 0; i < movers.length; i++) {
        //   if (i != 0) { 
        //     movers[i].origin = movers[i-1].translatedPosition
        //     movers[i].incrementAngle(movers[i-1].angularVelocity);
        //   } 
        //   let root = movers[i].origin;
        //   movers[i].applyGravity(gravity);
        //   stroke(51, 200);
        //   line(root.x, root.y, movers[i].translatedPosition.x, movers[i].translatedPosition.y);
        //   stroke(strokeColors[i]);
        //   fill(fillColors[i]);
        //   movers[i].needsTranslatedCartesian(drawMe);
        // }
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
    //rotate(Math.PI/3);
    //
    //
    //line(0,0,pendulum.x,pendulum.y);
    //line(0,0,location.x, location.y);
    //line(-size,0,size,0);
    //circle(pendulum.x, pendulum.y, size*2);
    // push();
    // //stroke(204);
    // translate(0, 0);
    // translate(pendulum.x, pendulum.y);
    // //translate(location.x, location.y);
    // line(-size/2,0,size/2,0);
    // rotate(pendulum.heading);
    // line(-size,0,size,0);
    // pop();
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
