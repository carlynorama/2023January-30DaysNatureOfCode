//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 26-branching-fractals/04-l-system/sketch.ts
// calynorama 2023 Jan 25
//

//https://natureofcode.com/book/chapter-8-fractals/#chapter08_section6
//Coding Challenge: https://thecodingtrain.com/challenges/16-l-system-fractal-trees


let controller:ControlledCanvas;



const axiom = "ACB";
let sentence = axiom;

//why not a dictionary? 
const rule1 = {  input:"A", output:"AB" }
const rule2 = {  input:"B", output:"A"  } 

let rules: Record<string, string> = { 
  "A":"AB",
  "B":"A"
  }; 

function applyRules(input:string):string {
  let result = rules[input]
  if (result != undefined) { return result} 
  else { return input }
}


function parseInput(input_string:string) {
  //is for loop still faster than map or foreach? 
  let newString = ""
  for(let character of input_string)  {
    newString += applyRules(character)
  }
  console.log(newString)
  return newString
}

function generate() {
  sentence = parseInput(sentence);
  createP(sentence);
}

function setup() {
  
  noCanvas();
  createP(sentence)
  let button = createButton("generate");
  button.mousePressed(generate)
  //controller = new ControlledCanvas(400, 400);
  colorMode(HSB);
  background(0, 0, 80);
  stroke(0);
  noFill();

  console.log("------------ END SETUP! -------------");
  //noLoop();
}


function draw() {
    background(0, 0, 80);

}
function keyPressed() {
  //controller.keyPressed();
  if (key == "t") {
    
  }
}
//----------------------------------------------------------------
//-----------------------------------------------  Rendering

function drawBranch(length:number, angle:number, shrinkage:number) {
   line(0,0,0,-length)
   translate(0, -length);
  //rotate(angle);
  if (length > 4) {  
    push();
    rotate(angle);
    drawBranch(length*shrinkage, angle, shrinkage) 
    pop();
    push();
    rotate(-angle);
    drawBranch(length*shrinkage, angle, shrinkage) 
    pop();
  }
  

}

// function renderFTree(kline:FTree) {
//    if (kline.segments.length > 0) {
//     push();
//       kline.segments.forEach((segment) => {  renderFTree(segment) });
//     pop();
//    } 
//    else {
//     line(kline.start.x, kline.start.y, kline.end.x, kline.end.y);
//    }
// }

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