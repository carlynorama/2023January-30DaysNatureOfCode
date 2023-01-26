"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 25-fractals/02-cantor-set/sketch.ts
// calynorama 2023 Jan 25
//
//https://natureofcode.com/book/chapter-8-fractals/#chapter08_section5
//Coding Challenge: https://www.youtube.com/watch?v=fcdNSZ9IzJM
let controller;
let root;
const rootHeight = 100;
function setup() {
    controller = new ControlledCanvas(400, 400);
    colorMode(HSB);
    background(0, 0, 80);
    noFill();
    root = new Branch(new Vector(width / 2, height), new Vector(width / 2, height - rootHeight));
    root.makeSubBranches();
    root.growBranches();
    renderBranch(root);
    console.log(root);
    console.log("------------ END SETUP! -------------");
    noLoop();
}
function draw() {
}
function keyPressed() {
    controller.keyPressed();
    if (key == "t") {
        background(0, 0, 80);
        root.growBranches();
        renderBranch(root);
    }
}
//----------------------------------------------------------------
//-----------------------------------------------  Rendering
function renderBranch(branch) {
    strokeWeight(5 * branch.end.distanceTo(branch.start) / rootHeight);
    //strokeWeight((10 * (0.5)));
    line(branch.start.x, branch.start.y, branch.end.x, branch.end.y);
    if (branch.branches.length > 0) {
        push();
        branch.branches.forEach((subBranch) => { renderBranch(subBranch); });
        pop();
    }
    else if (branch.isMaxDepth) {
        push();
        noStroke();
        fill(140, 20, 60, 0.2);
        circle(branch.end.x, branch.end.y, 20);
        pop();
    }
    //  else {
    //   line(branch.start.x,branch.start.y, branch.end.x, branch.end.y)
    //   line(branch.start.x,branch.start.y, branch.end.x, branch.end.y);
    //  }
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
