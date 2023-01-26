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



const axiom = "F";
let sentence = axiom;

let simple_rules: Record<string, string> = { 
  "A":"AB",
  "B":"A"
};

let tree_rules: Record<string, string> = { 
  "F":"FF+[+F-F-F]-[-F+F+F]",
}; 


function applyRules(input:string, rules:Record<string, string>):string {
  let result = rules[input]
  if (result != undefined) { return result} 
  else { return input }
}


function parseInput(input_string:string, rules:Record<string, string>) {
  //is for loop still faster than map or foreach? 
  let newString = ""
  for(let character of input_string)  {
    newString += applyRules(character, rules)
  }
  console.log(newString)
  return newString
}

function generate() {
  segment_length *= 0.50;
  sentence = parseInput(sentence, tree_rules);
  createP(sentence);
  turtle(sentence);
}

// let testPush;
// let testPop;

function setup() {
  
  // testPush = () => {push();}
  // testPop = () => {pop();}
  
  createP(sentence)
  let button = createButton("generate");
  button.mousePressed(generate)
  controller = new ControlledCanvas(400, 400);
  colorMode(HSB);
  background(0, 0, 80);
  stroke(0);
  noFill();
  turtle(sentence);
 

  console.log("------------ END SETUP! -------------");
  //noLoop();
}


function draw() {
    //background(0, 0, 80);

}
function keyPressed() {
  //controller.keyPressed();
  if (key == "t") {
    
  }
}
//----------------------------------------------------------------
//-----------------------------------------------  Rendering

function turtle(instructions:string) {
  resetMatrix();
  background(0, 0, 80);
  translate(width / 2, height);
  stroke(50,50,50,0.5);
  //let testString = "[F+F-F][F-F+F]"

  for (let character of instructions) {
    lookUpInstruction(character);
  //for (let i = 0; i < testString.length; i++ ) {
    //console.log(testString[i]);
    // console.log(character);
    // if (character == "[") {
    //   push();
    //   continue;
    // } else if (character == "]") {
    //   lookUpInstruction("]");
    //   // pop();
    //   // continue;
    // } else {
    //   lookUpInstruction(character);
    //   //line(0,0,0,-segment_length); translate(0, -segment_length);
    // }
  }


  // for (let character of instructions) {
  //   console.log(character);
  //   lookUpInstruction(character)
  // }

  // let doThis = lexicon["["]
  // doThis();
  // line(0,0,0,-segment_length); translate(0, -segment_length)
  // doThis = lexicon["+"]
  // doThis();
  // line(0,0,0,-segment_length); translate(0, -segment_length);
  // doThis = lexicon["-"];
  // doThis();
  // line(0,0,0,-segment_length); translate(0, -segment_length);
  // doThis = lexicon["]"]
  // doThis = lexicon["["]
  // doThis();
  // line(0,0,0,-segment_length); translate(0, -segment_length)
  // doThis = lexicon["-"]
  // doThis();
  // line(0,0,0,-segment_length); translate(0, -segment_length);
  // doThis = lexicon["+"];
  // doThis();
  // line(0,0,0,-segment_length); translate(0, -segment_length);
  // doThis = lexicon["]"]

  
  
  // doInstruction("[");
  // doInstruction("F");
  // doInstruction("+");
  // doInstruction("F");
  // doInstruction("-");
  // doInstruction("F");
  // doInstruction("]");

  // doInstruction("[");
  // doInstruction("F");
  // doInstruction("-");
  // doInstruction("F");
  // doInstruction("+");
  // doInstruction("F");
  // doInstruction("]");
}

let angle = 0.43633231;
let segment_length = 100;

let lexicon: Record<string, ()=>void> = { 
  "F": () => {line(0,0,0,-segment_length); translate(0, -segment_length)},
  "+": () => rotate(angle),
  "-": () => rotate(-angle),
  "[": () => push(),
  "]": () => pop(),
}; 

function doInstruction(s:string) {
  console.log(s);
  switch(s) {
    case "F":
      console.log("line");
      line(0,0,0,-segment_length); translate(0, -segment_length);
      break;
    case "+":
      console.log("cw");
      rotate(angle);
      break;
    case "-":
      console.log("ccw");
      rotate(-angle);
      break;
    case "[":
      console.log("push");
      push();
      break;
    case "[":
      console.log("pop");
      pop();
      break;
    default:
      print("undefined command");
  }
}

function lookUpInstruction(s:string) {
  let result = lexicon[s]
  if (result != undefined) { 
    result();
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