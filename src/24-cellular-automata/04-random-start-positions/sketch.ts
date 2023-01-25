//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 24-cellular-automata/04-random-start-positions/sketch.ts
// calynorama 2023 Jan 24
//

//https://natureofcode.com/book/chapter-7-cellular-automata/#chapter07_section6

let controller:ControlledCanvas;

let last_cells: number[] = [];
let rows = 20;
let cols = 20;
let cells = new Array(rows * cols).fill(0);


let cellSize: number;
let numberOfRows;

function setup() {
  controller = new ControlledCanvas(400, 400);
  cellSize = width / cols;
  frameRate(10);

  neighborIndices(243, rows, cols, cells.length);
  neighborhoodValue(243, cells, rows, cols);

  insertBeacon(floor(random(0, 340)));
  insertBlinker(floor(random(0, 360)));
  insertGlider(floor(random(0, 340)));
  insertSpaceShip(floor(random(0, 340)));
  insertToad(floor(random(0, 360)));
  insertBeacon(floor(random(0, 340)));
  insertBlinker(floor(random(0, 360)));
  insertGlider(floor(random(0, 340)));
  insertSpaceShip(floor(random(0, 340)));
  insertToad(floor(random(0, 360)));
  //noLoop();
}

function draw() {
  frameRate(5);
  if (frameCount % 60 == 0) {
    //print("tick")
    insertSpaceShip(floor(random(0, 340)));
    insertGlider(floor(random(0, 340)));
    insertToad(floor(random(0, 360)));
  }
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

function drawBuffer(rows: number, cols: number, buffer_array: any[]) {
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const bufferIndex = j * cols + i;
      if (last_cells[bufferIndex] == 0) fill(255);
      else fill(0);
      stroke(0);
      rect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
}

//----------------------------------------------------------------
//------------------------------------------------ inject shapes


function insertGlider(rootIndex:number) {
  const gliderRoot = rootIndex;
  cells[gliderRoot] = 1;
  cells[gliderRoot+cols] = 1;
  cells[gliderRoot+2*cols] = 1;
  cells[gliderRoot+cols-2] = 1;
  cells[gliderRoot+2*cols-1] = 1;
}

function insertSpaceShip(rootIndex:number) {
  const spaceShipRoot = rootIndex;
  cells[spaceShipRoot] = 1;
  cells[spaceShipRoot+3] = 1;
  cells[spaceShipRoot+4+cols] = 1;
  cells[spaceShipRoot+2*cols] = 1;
  cells[spaceShipRoot+4+2*cols] = 1;
  cells[spaceShipRoot+1+3*cols] = 1;
  cells[spaceShipRoot+2+3*cols] = 1;
  cells[spaceShipRoot+3+3*cols] = 1;
  cells[spaceShipRoot+4+3*cols] = 1;
}

function insertBlinker(rootIndex:number) {
  const blinkerRoot = rootIndex;
  cells[blinkerRoot] = 1
  cells[blinkerRoot+cols] = 1
  cells[blinkerRoot+cols*2] = 1
}

function insertToad(rootIndex:number) {
  const toadRoot = rootIndex;
  cells[toadRoot] = 1
  cells[toadRoot+1] = 1
  cells[toadRoot+2] = 1
  cells[toadRoot-1+cols] = 1
  cells[toadRoot+1-1+cols] = 1
  cells[toadRoot+2-1+cols] = 1
}

function insertBeacon(rootIndex:number) {
  const beaconRoot = rootIndex;
  cells[beaconRoot] = 1
  cells[beaconRoot+1] = 1
  cells[beaconRoot+cols] = 1
  cells[beaconRoot+3 + cols*3] = 1
  cells[beaconRoot+2 + cols*3] = 1
  cells[beaconRoot+3 + cols*2] = 1
}



//----------------------------------------------------------------
//------------------------------------------------ Buffer Creation

function updateBuffer(cells: number[], rows: any, cols: any) {
  let newBuffer = [];
  for (let i = 0; i < cells.length; i++) {
    const newstate = rules(cells[i], neighborhoodValue(i, cells, rows, cols));
    //print(newstate);
    newBuffer.push(newstate);
  }
  return newBuffer;
}

function updateBuffer_dictionaryStyle(cells: string | any[], rows: number, cols: number) {
  let newBuffer = [];
  for (let i = 0; i < cells.length; i++) {
    const newstate = rules(cells[i], neighborhoodValue_dictionaryStyle(i, cells, rows, cols));
    //print(newstate);
    newBuffer.push(newstate);
  }
  return newBuffer;
}

function rules(myValue: any, livingNeighbors: any) {
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

const neighborhoodValue_dictionaryStyle = (indexValue: number, buffer: string | any[], rows: any, cols: any) => {
  const indices = neighborDictionary(indexValue, rows, cols, buffer.length);
  //print(indices);
  //uses JavaScript ability to access an array out of bounds and fail quietly.
  const total = Object.entries(indices)
    .map((item) => buffer[item[1]])
    .reduce((acc, current) => acc + current, 0);
  return total;
};

const neighborhoodValue = (indexValue: number, buffer: any[], rows: number, cols: number) => {
  const indices = neighborIndices(indexValue, rows, cols, buffer.length);
  //uses JavaScript ability to access an array out of bounds and fail quietly.
  const total = indices
    .map((item) => buffer[item])
    .reduce((acc, current) => {
      if (current !== undefined) {
        return acc + current;
      } else {
        return acc;
      }
    }, 0);

  return total;
};

//Edges wrap and shift up.
function neighborIndices(myindex: number, rows: number, cols: number, buffer_length: number) {
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
function neighborDictionary(myindex: number, rows: any, cols: number, buffer_length: any) {
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

function myCoordinates(indexValue: number, rows: number, cols: number) {
  const x = indexValue % rows;
  const y = floor(indexValue / cols);
  //console.log("my coords", myRowNumber, myColNumber);
  return { x, y };
}

//Board is a 2D array instead of a single string.
function neighborhoodValueCoordinateStyle(x: number, y: number, board: { [x: string]: { [x: string]: number; }; }) {
  let neighbors = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
    //Add up all the neighbors’ states.
      neighbors += board[x+i][y+j];
    }
  }
  neighbors -= board[x][y];
}

function check_index(value: number, array: string | any[]) {
  if (value < 0) return array.length - 1;
  if (value > array.length - 1) return 0;
  return value;
}

//----------------------------------------------------------------
//------------------------------------------------ neighborCleanup


// //example usage:const total = Object.entries(indices).map(item => buffer[item[1]] )
function purgeEdges(neighborDictionary: any, myindex: number, buffer_length: number) {

  //let possible = { ul, um, ur, ml, mr, ll, lm, lr };
  let possible = {...neighborDictionary};

  let x = myindex % cols;
  if (x == 0) {
    delete possible.ul;
    delete possible.ml;
    delete possible.ll;
  }

  if (x == cols) {
    delete possible.ur
    delete possible.mr 
    delete possible.lr
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

function wrapEdges(neighborDictionary: { ul: number; um: number; ur: number; ml: number; mr: any; ll: any; lm: any; lr: any; }, myindex: number, buffer_length: number) {

  //let possible = { ul, um, ur, ml, mr, ll, lm, lr };
  let possible = {...neighborDictionary};

  let x = myindex % cols;
  if (x == 0) {
    possible.ul = possible.ul + cols;
    possible.ml = possible.ml + cols;
    possible.ll = possible.ll + cols;
  }

  if (x == cols-1) {
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

