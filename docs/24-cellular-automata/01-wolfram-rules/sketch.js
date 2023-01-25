"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 24-cellular-automata/01-wolfram-rules/sketch.ts
// calynorama 2023 Jan 24
// also at https://editor.p5js.org/carlynorama/sketches/hRNLzARh_
//https://natureofcode.com/book/chapter-7-cellular-automata/#chapter07_section2
let controller;
let cells = [];
//let last_cells = [1,0,1,0,0,0,0,1,0,1,1,1,0,0,0,1,1,1,0,0]
let last_cells = new Array(40).fill(0);
last_cells[10] = 1;
//const startSeed = 10;
//let last_cells = new Array(40).fill().map((e,i) => (startSeed == i) ? 1 :0 );
//let theRules = 90;
let theRules = 30;
let cellSize;
let numberOfRows;
function setup() {
    controller = new ControlledCanvas(400, 400);
    cellSize = width / last_cells.length;
    numberOfRows = floor(height / cellSize);
    frameRate(5);
}
function draw() {
    background(220);
    cells = [...last_cells];
    for (let i = 0; i < numberOfRows; i++) {
        let thisRow = generateRow(cells, theRules);
        drawRow(thisRow, cellSize);
        translate(0, cellSize);
        cells = thisRow;
        if (i == 0) {
            last_cells = [...thisRow];
        }
    }
}
function keyPressed() {
    controller.keyPressed();
}
//----------------------------------------------------------------
//-------------------------------------------------- Row Rendering
function drawRow(items, itemSize) {
    for (let i = 0; i < cells.length; i++) {
        if (items[i] == 0)
            fill(255);
        //Create a fill based on its state (0 or 1).
        else
            fill(0);
        stroke(0);
        rect(i * itemSize, 0, itemSize, itemSize);
    }
}
//----------------------------------------------------------------
//--------------------------------------------------- Row Creation
function generateRow(currentRow, ruleSet) {
    let newRow = [];
    for (let i = 0; i < cells.length; i++) {
        let li = check_index(i - 1, currentRow);
        let ri = check_index(i + 1, currentRow);
        const left = currentRow[li];
        const middle = currentRow[i];
        const right = currentRow[ri];
        const newstate = getCellValue(ruleSet, left, middle, right);
        newRow.push(newstate);
    }
    return newRow;
}
function check_index(value, array) {
    if (value < 0)
        return array.length - 1;
    if (value > array.length - 1)
        return 0;
    return value;
}
function getCellValue(ruleSet, a, b, c) {
    let ruleIndex = 0;
    ruleIndex = binaryConversion(a, b, c);
    return getBit_int(ruleSet, ruleIndex);
}
//----------------------------------------------------------------
//------------------------------------------------- Binary Helpers
//returns 0 or 1
function getBit_int(value, position) {
    return (value >> position) & 1;
}
//returns true or false
function getBit_boolean(value, position) {
    return (value & (1 << position)) > 0;
}
function testMask() {
    console.log(getBit_boolean(2, 1), getBit_int(2, 1));
}
function binaryConversion(a, b, c) {
    return 0 | (a << 2) | (b << 1) | (c);
    //compare to 4*a + b*2 + c
}
//both prefix and n are strings. 
const makeNumber = (prefix, n) => {
    return Number(`${prefix}${n}`); //prefixes are 0b, 0x and num
    //consider also parseInt('1111', 2); and parseInt(1111, 2); 
};
const makeNumberFromArray = (array) => {
    let s = array.reduce((accumulator, currentValue) => accumulator + currentValue, "");
    return parseInt(s, 2);
};
