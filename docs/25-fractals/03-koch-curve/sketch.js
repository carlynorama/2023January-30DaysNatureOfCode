"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 25-fractals/02-cantor-set/sketch.ts
// calynorama 2023 Jan 25
//
//https://natureofcode.com/book/chapter-8-fractals/#chapter08_section4
// - https://blog.logrocket.com/using-trampolines-to-manage-large-recursive-loops-in-javascript-d8c9db095ae3/
// - https://dev.to/oreychandan/recursion-in-typescript-1p0n
let controller;
let mykline;
function setup() {
    controller = new ControlledCanvas(400, 400);
    console.log(factorial(8));
    mykline = new KochLine(new Vector(0, height / 2), new Vector(width, height / 2));
    stroke(0);
    noFill();
    colorMode(HSB);
}
function draw() {
    background(0, 0, 80);
    renderKochLine(mykline);
}
function keyPressed() {
    controller.keyPressed();
}
//----------------------------------------------------------------
//-----------------------------------------------  Rendering
function renderKochLine(kline) {
    line(kline.start.x, kline.start.y, kline.end.x, kline.end.y);
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
