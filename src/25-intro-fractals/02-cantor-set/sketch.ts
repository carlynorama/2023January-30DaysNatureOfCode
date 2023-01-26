//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 25-fractals/02-cantor-set/sketch.ts
// calynorama 2023 Jan 25
//

//https://natureofcode.com/book/chapter-8-fractals/#chapter08_section3

// - https://blog.logrocket.com/using-trampolines-to-manage-large-recursive-loops-in-javascript-d8c9db095ae3/
// - https://dev.to/oreychandan/recursion-in-typescript-1p0n

let controller:ControlledCanvas;


function setup() {
  controller = new ControlledCanvas(400, 400);

  console.log(factorial(8));
  
  stroke(0);
  noFill();
  colorMode(HSB);
}

let h_divisor = 5;
let smallest = 1;
let v_gap = 10;
function draw() {
    background(0, 0, 80);

    //recursiveSetOfCantorSets(0, 0, width, 3, v_gap, smallest); 
    translate(0,5);
    drawVariableCantorSet(0, 0, width, 3, v_gap, smallest);
    translate(0,70);
    drawVariableCantorSet(0, 0, width, 5, v_gap, smallest);
    translate(0,50);
    drawVariableCantorSet(0, 0, width, 7, v_gap, smallest);
    translate(0,50);
    drawVariableCantorSet(0, 0, width, 9, v_gap, smallest);
    translate(0,35);
    drawVariableCantorSet(0, 0, width, 11, v_gap, smallest);
    translate(0,35);
    drawVariableCantorSet(0, 0, width, 13, v_gap, smallest);
    translate(0,35);
    drawVariableCantorSet(0, 0, width, 15, v_gap, smallest);
    translate(0,35);
    drawVariableCantorSet(0, 0, width, 17, v_gap, smallest);
    translate(0,35);
    drawVariableCantorSet(0, 0, width, 19, v_gap, smallest);
    translate(0,35);
    drawVariableCantorSet(0, 0, width, 21, v_gap, smallest);
    
    //drawCantorSet(0, 0, width, v_gap, smallest);
    //drawCircle(200, 200, 200);
    //drawCircleMesh(200, 200, 200);
    noLoop();
}
function keyPressed() {
    controller.keyPressed();
}
//----------------------------------------------------------------
//-----------------------------------------------  Rendering
// let h_divisor = 3;
// let smallest = 2;
// let v_gap = 10;
function drawCantorSet(x: number, y: number, length: number, v_gap: number, smallest: number) {
    //Stop at 1 pixel!
    if (length >= smallest) {
        line(x, y, x + length, y);
        y += v_gap;
        let newSize = length / 3;
        drawCantorSet(x, y, newSize, v_gap, smallest);
        drawCantorSet(x + newSize * 2, y, newSize, v_gap, smallest);
    }
}

function drawVariableCantorSet(x: number, y: number, length: number, h_divisor: number, v_gap: number, smallest: number) {
  //Stop at 1 pixel!
  if (length >= smallest) {
      line(x, y, x + length, y);
      y += v_gap;
      let newSize = (length / h_divisor);
      for (let i=0; i < h_divisor; i += 2) {
        drawVariableCantorSet(x + newSize*i, y, newSize, h_divisor, v_gap, smallest);
      }
    }
}

// For another day.
// function recursiveSetOfCantorSets(x: number, y: number, length: number, h_divisor: number, v_gap: number, smallest: number) {
//   if (!(h_divisor > 21)) {
//   if (length >= smallest) {
//     line(x, y, x + length, y);
//     translate(0, v_gap);
//     let newSize = (length / h_divisor);
//     for (let i=0; i < h_divisor; i += 2) {
//       recursiveSetOfCantorSets(x + newSize*i, 0, newSize, h_divisor, v_gap, smallest);
//     }
//   } else {
//     console.log("hi!")
   
//       translate(0, v_gap)
//       recursiveSetOfCantorSets(0, 0, width, h_divisor + 2, v_gap, smallest)
//     }
//   }
// }

function drawCircle(x:number, y:number, radius:number) {
  ellipse(x, y, radius*2, radius*2);
  if(radius > 2) {
    radius *= 0.75;
    //The drawCircle() function is calling itself recursively.
    drawCircle(x, y, radius);
  }
}

function drawCircleLine(x:number, y:number, radius:number) {
  //keep the work to the visible only 
  if (x < 0  || x > width || y < 0 || y > height ) { return }
  const diameter = radius+radius
  ellipse(x, y,  diameter,  diameter);
  if(radius > 2) {
    //drawCircle() calls itself twice, creating a branching effect. 
    //For every circle, a smaller circle is drawn to the left and the right.
    drawCircleLine(x + radius, y, radius/2);
    drawCircleLine(x - radius, y, radius/2);
  }
}

function drawCircleMesh(x:number, y:number, radius:number) {
  //keep the work to the visible only
  if (x < 0  || x > width || y < 0 || y > height ) { return }

  const diameter = radius+radius

  ellipse(x, y,  diameter,  diameter);
  if(radius > 10) {
    //drawCircle() calls itself twice, creating a branching effect. 
    //For every circle, a smaller circle is drawn to the left and the right.
    drawCircleMesh(x + radius, y, radius/2);
    drawCircleMesh(x - radius, y, radius/2);
    drawCircleMesh(x, y + radius, radius/2);
    drawCircleMesh(x, y - radius, radius/2);
  }
}

//----------------------------------------------------------------
//------------------------------------------------ Generating

function factorial(n:number):number {
  if (n == 1) { return 1; } 
  else { return n * factorial(n-1); }
}

//assuming integer values, 𝝨 (i=1,number,i)
const sumBelow = (number:number, sum = 0):number => (
  number === 0 ? sum : sumBelow(number - 1, sum + number)
  //sames as
  //if (number === 0) { return sum } 
  //else { return sumBelow(number - 1, sum + number) }
)

//Note:the trampoline is slower than an iterative loop
const trampoline = (fn: (...args:any[]) => any) => (...args:any[]):any => {
  let result:any = fn(...args)
  while (typeof result === 'function') {  result = result() }
  return result
}