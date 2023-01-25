"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 25-fractals/01-recursive-circles/sketch.ts
// calynorama 2023 Jan 25
//
//https://natureofcode.com/book/chapter-8-fractals/#chapter08_section2
// - https://blog.logrocket.com/using-trampolines-to-manage-large-recursive-loops-in-javascript-d8c9db095ae3/
// - https://dev.to/oreychandan/recursion-in-typescript-1p0n
let controller;
function setup() {
    controller = new ControlledCanvas(400, 400);
    console.log(factorial(8));
    stroke(0);
    noFill();
    colorMode(HSB);
}
function draw() {
    background(0, 0, 80);
    //drawCircle(200, 200, 200);
    drawCircleMesh(200, 200, 200);
    noLoop();
}
function keyPressed() {
    controller.keyPressed();
}
//----------------------------------------------------------------
//-----------------------------------------------  Rendering
function drawCircle(x, y, radius) {
    ellipse(x, y, radius * 2, radius * 2);
    if (radius > 2) {
        radius *= 0.75;
        //The drawCircle() function is calling itself recursively.
        drawCircle(x, y, radius);
    }
}
function drawCircleLine(x, y, radius) {
    //keep the work to the visible only 
    if (x < 0 || x > width || y < 0 || y > height) {
        return;
    }
    const diameter = radius + radius;
    ellipse(x, y, diameter, diameter);
    if (radius > 2) {
        //drawCircle() calls itself twice, creating a branching effect. 
        //For every circle, a smaller circle is drawn to the left and the right.
        drawCircleLine(x + radius, y, radius / 2);
        drawCircleLine(x - radius, y, radius / 2);
    }
}
function drawCircleMesh(x, y, radius) {
    //keep the work to the visible only
    if (x < 0 || x > width || y < 0 || y > height) {
        return;
    }
    const diameter = radius + radius;
    ellipse(x, y, diameter, diameter);
    if (radius > 10) {
        //drawCircle() calls itself twice, creating a branching effect. 
        //For every circle, a smaller circle is drawn to the left and the right.
        drawCircleMesh(x + radius, y, radius / 2);
        drawCircleMesh(x - radius, y, radius / 2);
        drawCircleMesh(x, y + radius, radius / 2);
        drawCircleMesh(x, y - radius, radius / 2);
    }
}
//----------------------------------------------------------------
//------------------------------------------------ Generating
function factorial(n) {
    if (n == 1) {
        return 1;
    }
    else {
        return n * factorial(n - 1);
    }
}
//assuming integer values, 𝝨 (i=1,number,i)
const sumBelow = (number, sum = 0) => (number === 0 ? sum : sumBelow(number - 1, sum + number)
//sames as
//if (number === 0) { return sum } 
//else { return sumBelow(number - 1, sum + number) }
);
//Note:the trampoline is slower than an iterative loop
const trampoline = (fn) => (...args) => {
    let result = fn(...args);
    while (typeof result === 'function') {
        result = result();
    }
    return result;
};
