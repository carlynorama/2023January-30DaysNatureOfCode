"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 27-selection/01-rejection-sampling/sketch.ts
// calynorama 2023 Jan 27
//
// https://en.wikipedia.org/wiki/Rejection_sampling
/*
The algorithm, which was used by John von Neumann[4] and dates back to Buffon and his needle,[5] obtains a sample from distribution X
, with density f, using samples from distribution Y, with density g, as follows:

- Obtain a sample y from distribution Y and a sample u from Unif(0,1) (the uniform distribution over the unit interval).
- Check whether or not u < f(y)/Mg(y)  //(f(y)/M *g(y)) is the normalized probability
  - if this holds, accept y as a sample drawn from f
  - if not, reject the value of y and return to the sampling step.
The algorithm will take an average of M
*/
// https://github.com/CodingTrain/Suggestion-Box/issues/119
// https://github.com/CodingTrain/Suggestion-Box/issues/146
let controller;
class DisplayShape {
    //hue:number;
    constructor(form) {
        this.form = form;
        this.size = 20;
        this.counter = 0;
        //this.hue = form.charCodeAt(0)/128 * 360;
        //console.log(this.hue);
    }
}
let lexicon = {
    "rect": (shape) => { fill(0, 60, 60); rect(0, 0, shape.size, shape.size / 2); },
    "ellipse": (shape) => { fill(72, 60, 60); ellipse(0, 0, shape.size, shape.size / 2); },
    "circle": (shape) => { fill(140, 60, 60); circle(0, 0, shape.size); },
    "square": (shape) => { fill(210, 60, 60); rect(0, 0, shape.size, shape.size); },
    "triangle": (shape) => { fill(280, 60, 60); triangle(0, 0, -shape.size / 2, shape.size, shape.size / 2, shape.size); },
};
const numberOfShapes = 10000;
let xValues;
let yValues;
let shapes;
let weights;
function setup() {
    controller = new ControlledCanvas(400, 400);
    colorMode(HSB);
    background(0, 0, 80);
    shapes = [new DisplayShape("rect"), new DisplayShape("circle"), new DisplayShape("ellipse"), new DisplayShape("square"), new DisplayShape("triangle")];
    //weights = [0.325, 0.30, 0.225, 0.1, 0.05]
    //weights = [0.2, 0.2, 0.2, 0.2, 0.2];
    //weights = [0.52, 0.20, 0.12, 0.1, 0.06]
    weights = shuffle([0.52, 0.20, 0.12, 0.1, 0.06]);
    testWeights(weights, shapes.length);
    xValues = new Array(numberOfShapes).fill(0).map((element) => random(0, width));
    yValues = new Array(numberOfShapes).fill(0).map((element) => random(0, height));
    console.log("------------ END SETUP! -------------");
    noLoop();
}
function draw() {
    background(0, 0, 80);
    for (let i = 0; i < numberOfShapes; i++) {
        push();
        translate(xValues[i], yValues[i]);
        //const whichShape = round(random(0, shapes.length-1));
        //const thisShape = shapes[whichShape];
        const thisShape = selectSample_limitedFast(weights, shapes);
        if (thisShape != null) {
            const doThis = lexicon[thisShape.form];
            doThis(thisShape);
            thisShape.counter += 1;
        }
        else {
            noFill();
            circle(0, 0, 5);
        }
        pop();
    }
    const sum = shapes.reduce((acc, e) => acc + e.counter, 0);
    shapes.forEach((shape, index) => {
        console.log(shape.form, shape.counter, weights[index], shape.counter / sum);
    });
    console.log(sum);
}
function keyPressed() {
    controller.keyPressed();
    // if (key == "t") {
    // }
}
let epsilon = 0.00001;
function testWeights(weights, valuesLength) {
    if (weights.length != valuesLength) {
        throw new Error("did not provide a weight for every value");
    }
    const aboveZero = weights.filter((element) => element >= 0);
    if (aboveZero.length != weights.length) {
        throw new Error("some weights are below zero");
    }
    const sum = aboveZero.reduce((acc, current) => acc + current, 0);
    if (!(Math.abs(1 - sum) < epsilon)) {
        throw new Error("weights do not add up to be close enough 1");
    }
}
//Questions: 
//This algorithm assumes array in random order every time or a sorted order? 
function selectSample_limitedFast(weights, values) {
    // - Obtain a sample y from distribution Y and a sample u from Unif(0,1) (the uniform distribution over the unit interval).
    // - Check whether or not u < f(y)/Mg(y)  //(f(y)/M *g(y)) is the normalized probability
    //   - if this holds, accept y as a sample drawn from f
    //   - if not, reject the value of y and return to the sampling step.
    // The algorithm will take an average of M
    let selectionNumber = Math.random();
    //console.log(selectionNumber);
    for (let i = 0; i < weights.length; i++) {
        const weight = weights[i];
        //console.log(weight, i);
        if (selectionNumber < weight) {
            //console.log("found one", values[i]);
            return values[i];
        }
        else {
            selectionNumber -= weight;
        }
    }
    return null; //shouldn't happen. 
}
//https://en.wikipedia.org/wiki/Fisher–Yates_shuffle
function shuffle(array) {
    let counter = array.length;
    let shallowCopy = Array.from(array);
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        let temp = shallowCopy[counter];
        shallowCopy[counter] = shallowCopy[index];
        shallowCopy[index] = temp;
    }
    return shallowCopy;
}
function arrayRange(start, stop, step) {
    return Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);
}
