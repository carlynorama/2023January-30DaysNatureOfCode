//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 17-springs/01-simple-start.ts
// written by calynorama 2023 Jan 16
//
// Derived From
// Spring Forces (Simple Spring)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/160-spring-forces.html
// https://youtu.be/Rr-5HiXquhw

// Simple Spring: https://editor.p5js.org/codingtrain/sketches/dcd6-2mWa
// Spring Vector: https://editor.p5js.org/codingtrain/sketches/_A2pm_SSg
// Spring OOP: https://editor.p5js.org/codingtrain/sketches/9BAoEn4Po
// Soft Spring: https://editor.p5js.org/codingtrain/sketches/S5dY7qjxP

//see also https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-oscillations/a/spring-forces

/*
F_spring =−k X displacement
*/

let y = 250;
let velocity = 0;
let restLength = 200;
let k = 0.01;

const vDamp = 0.99;

let originX:number;
let originY:number;

function setup() {
  createControlledCanvas(400, 400);
  originX = width/2;
  originY = restLength;
}

function draw() {
  background(204);
  noStroke();
  fill(0, 51, 102, 50);
  stroke(0, 0, 51);
  line(originX, 0, originX, y);
  circle(originX, y, 64);
  fill(0, 51, 102);
  circle(originX, y, 16);

  let x = y - restLength;
  let force = -k * x;

  // F = A
  velocity += force;
  y += velocity;

  velocity *= vDamp;
}
