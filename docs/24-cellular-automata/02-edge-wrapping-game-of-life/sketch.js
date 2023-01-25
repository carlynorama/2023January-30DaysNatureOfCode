"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 24-cellular-automata/02-edge-wrapping-game-of-life/sketch.ts
// calynorama 2023 Jan 24
//
//https://natureofcode.com/book/chapter-7-cellular-automata/#chapter07_section6
let controller;
let last_cells = [];
let rows = 20;
let cols = 20;
let cells = new Array(rows * cols).fill(0);
//no edges
cells[208] = 1;
cells[228] = 1;
cells[188] = 1;
//top edge
cells[4] = 1;
cells[24] = 1;
cells[384] = 1;
//bottom edge
cells[14] = 1;
cells[374] = 1;
cells[394] = 1;
//right edge
cells[119] = 1;
cells[139] = 1;
cells[159] = 1;
//left edge
cells[14 * 20] = 1;
cells[15 * 20] = 1;
cells[16 * 20] = 1;
//right edge
cells[119] = 1;
cells[139] = 1;
cells[159] = 1;
//left edge
cells[10 * 20] = 1;
cells[10 * 20 + 1] = 1;
cells[11 * 20 - 1] = 1;
//const startSeed = 10;
//let cells = new Array(40).fill().map((e,i) => (startSeed == i) ? 1 :0 );
let theRules = 30;
let cellSize;
let numberOfRows;
function setup() {
    controller = new ControlledCanvas(400, 400);
    cellSize = width / cols;
    frameRate(5);
    neighborIndices(243, rows, cols, cells.length);
    neighborhoodValue(243, cells, rows, cols);
    //noLoop();
}
function draw() {
    frameRate(5);
    // if (frameCount > 10) {
    //   noLoop();
    // }
    background(220);
    last_cells = [...cells];
    cells = updateBuffer_dictionaryStyle(cells, rows, cols);
    drawBuffer(rows, cols, cells);
}
function keyPressed() {
    controller.keyPressed();
}
//----------------------------------------------------------------
//----------------------------------------------- Buffer Rendering
function drawBuffer(rows, cols, buffer_array) {
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            const bufferIndex = j * cols + i;
            if (last_cells[bufferIndex] == 0)
                fill(255);
            else
                fill(0);
            stroke(0);
            rect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }
}
//----------------------------------------------------------------
//------------------------------------------------ Buffer Creation
function updateBuffer(cells, rows, cols) {
    let newBuffer = [];
    for (let i = 0; i < cells.length; i++) {
        const newstate = rules(cells[i], neighborhoodValue(i, cells, rows, cols));
        //print(newstate);
        newBuffer.push(newstate);
    }
    return newBuffer;
}
function updateBuffer_dictionaryStyle(cells, rows, cols) {
    let newBuffer = [];
    for (let i = 0; i < cells.length; i++) {
        const newstate = rules(cells[i], neighborhoodValue_dictionaryStyle(i, cells, rows, cols));
        //print(newstate);
        newBuffer.push(newstate);
    }
    return newBuffer;
}
function rules(myValue, livingNeighbors) {
    //if (livingNeighbors > 0) { console.log('howdy')}
    switch (livingNeighbors) {
        case 3:
            return 1;
        case 2:
            return myValue;
        default:
            return 0;
    }
}
function neighborValueCoordinateStyle(x, y, board) {
    let neighbors = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            //Add up all the neighbors’ states.
            neighbors += board[x + i][y + j];
        }
    }
    neighbors -= board[x][y];
}
const neighborhoodValue_dictionaryStyle = (indexValue, buffer, rows, cols) => {
    const indices = neighborDictionary(indexValue, rows, cols, buffer.length);
    //print(indices);
    //uses JavaScript ability to access an array out of bounds and fail quietly.
    const total = Object.entries(indices)
        .map((item) => buffer[item[1]])
        .reduce((acc, current) => acc + current, 0);
    //console.log(indexValue,total);
    //   if (indexValue == 14*20) {console.log(indexValue,total)}
    //   if (indexValue == 15*20) {console.log(indexValue,total)}
    //   if (indexValue == 16*20) {console.log(indexValue,total)}
    //   if (indexValue == 14*20 + 1) {console.log(indexValue,total)}
    //   if (indexValue == 15*20 + 1) {console.log(indexValue,total)}
    //   if (indexValue == 16*20 + 1) {console.log(indexValue,total)}
    //   if (indexValue == 14*20 + cols-1) {console.log(indexValue,total)}
    //   if (indexValue == 15*20 + cols-1) {console.log(indexValue,total)}
    //   if (indexValue == 16*20 + cols-1) {console.log(indexValue,total)}
    return total;
};
const neighborhoodValue = (indexValue, buffer, rows, cols) => {
    const indices = neighborIndices(indexValue, rows, cols, buffer.length);
    //uses JavaScript ability to access an array out of bounds and fail quietly.
    const total = indices
        .map((item) => buffer[item])
        .reduce((acc, current) => {
        if (current !== undefined) {
            return acc + current;
        }
        else {
            return acc;
        }
    }, 0);
    //console.log(indexValue,total);
    //if (indexValue == 0) {console.log(indexValue,total)}
    return total;
};
//Edges wrap and shift up. Fix that?
function neighborIndices(myindex, rows, cols, buffer_length) {
    //const myCoords = myCoordinates(myindex, rows, cols);
    //not using //.filter(isInBuffer) b/c can just ignore undefined in reciever.
    //const isInBuffer = (value) => (value >= 0 && value < buffer_length)
    const neighbors = [
        myindex - 1 - cols,
        myindex - cols,
        myindex + 1 - cols,
        myindex - 1,
        myindex + 1,
        myindex - 1 + cols,
        myindex + cols,
        myindex + 1 + cols,
    ];
    return neighbors;
}
// //example usage:const total = Object.entries(indices).map(item => buffer[item[1]] )
function neighborDictionary(myindex, rows, cols, buffer_length) {
    const myCoords = myCoordinates(myindex, rows, cols);
    const ul = myindex - 1 - cols;
    const um = myindex - cols;
    const ur = myindex + 1 - cols;
    const ml = myindex - 1;
    const mr = myindex + 1;
    const ll = myindex - 1 + cols;
    const lm = myindex + cols;
    const lr = myindex + 1 + cols;
    let possible = { ul, um, ur, ml, mr, ll, lm, lr };
    //console.log("possible", possible)
    return wrapEdges(possible, myindex, buffer_length);
}
function myCoordinates(indexValue, rows, cols) {
    const x = indexValue % rows;
    const y = floor(indexValue / cols);
    //console.log("my coords", myRowNumber, myColNumber);
    return { x, y };
}
function neighborhoodValueCoordinateStyle(x, y, board) {
    let neighbors = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            //Add up all the neighbors’ states.
            neighbors += board[x + i][y + j];
        }
    }
    neighbors -= board[x][y];
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
//------------------------------------------------ neighborCleanup
// //example usage:const total = Object.entries(indices).map(item => buffer[item[1]] )
function purgeEdges(neighborDictionary, myindex, buffer_length) {
    //let possible = { ul, um, ur, ml, mr, ll, lm, lr };
    let possible = { ...neighborDictionary };
    let x = myindex % cols;
    if (x == 0) {
        delete possible.ul;
        delete possible.ml;
        delete possible.ll;
    }
    if (x == cols) {
        delete possible.ur;
        delete possible.mr;
        delete possible.lr;
    }
    if (myindex < cols) {
        delete possible.ul;
        delete possible.um;
        delete possible.ur;
    }
    if (myindex > buffer_length - cols) {
        delete possible.ll;
        delete possible.lm;
        delete possible.lr;
    }
    return possible;
}
function wrapEdges(neighborDictionary, myindex, buffer_length) {
    //let possible = { ul, um, ur, ml, mr, ll, lm, lr };
    let possible = { ...neighborDictionary };
    let x = myindex % cols;
    if (x == 0) {
        possible.ul = possible.ul + cols;
        possible.ml = possible.ml + cols;
        possible.ll = possible.ll + cols;
    }
    if (x == cols - 1) {
        possible.ur = possible.ur - cols;
        possible.mr = possible.mr - cols;
        possible.lr = possible.lr - cols;
    }
    if (myindex < cols) {
        possible.ul += buffer_length;
        possible.um += buffer_length;
        possible.ur += buffer_length;
    }
    if (myindex > buffer_length - cols) {
        possible.ll -= buffer_length;
        possible.lm -= buffer_length;
        possible.lr -= buffer_length;
    }
    //console.log("wrapped possible", possible)
    return possible;
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
    return 0 | (a << 2) | (b << 1) | c;
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
