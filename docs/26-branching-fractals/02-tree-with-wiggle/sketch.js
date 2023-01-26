"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 25-fractals/02-cantor-set/sketch.ts
// calynorama 2023 Jan 25
//
//https://natureofcode.com/book/chapter-8-fractals/#chapter08_section5
//Coding Challenge: https://www.youtube.com/watch?v=0jjeOYMjmDU
let controller;
let slider;
function setup() {
    controller = new ControlledCanvas(400, 400);
    colorMode(HSB);
    background(0, 0, 80);
    stroke(0);
    noFill();
    //@ts-expect-error
    slider = createSlider(0, PI, PI / 9, PI / 180);
    console.log("------------ END SETUP! -------------");
    //noLoop();
}
function draw() {
    frameRate(2);
    background(0, 0, 80, 0.8);
    //stroke(50, 50);
    translate(200, height);
    //console.log(slider);
    //@ts-expect-error
    drawBranch(100, slider.value(), 0.67, 0.2);
}
function keyPressed() {
    controller.keyPressed();
    if (key == "t") {
    }
}
//----------------------------------------------------------------
//-----------------------------------------------  Rendering
function drawBranch(length, angle, shrinkage, wiggle) {
    strokeWeight(2 * length / 100 + random(-wiggle, wiggle));
    let thisLengthWiggle = random(-wiggle, wiggle) + 1;
    line(0, 0, 0, -length * thisLengthWiggle);
    translate(0, -length * thisLengthWiggle);
    if (length > 4) {
        const actualShrinkage = shrinkage + random(-wiggle, wiggle);
        push();
        rotate(angle + random(-wiggle, wiggle));
        drawBranch(length * actualShrinkage, angle, shrinkage, wiggle);
        pop();
        push();
        rotate(-angle + random(-wiggle, wiggle));
        drawBranch(length * actualShrinkage, angle, shrinkage, wiggle);
        pop();
    }
}
function simpleDrawBranch(length, angle, shrinkage) {
    line(0, 0, 0, -length);
    translate(0, -length);
    //rotate(angle);
    if (length > 4) {
        push();
        rotate(angle);
        simpleDrawBranch(length * shrinkage, angle, shrinkage);
        pop();
        push();
        rotate(-angle);
        simpleDrawBranch(length * shrinkage, angle, shrinkage);
        pop();
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
