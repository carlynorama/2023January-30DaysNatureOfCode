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

let controller:ControlledCanvas;

let mykline:KochLine;


function setup() {
  controller = new ControlledCanvas(400, 400);
  colorMode(HSB);
  background(0, 0, 80);
  stroke(0);
  noFill();

  console.log(factorial(8));

  mykline = new KochLine(new Vector(0, height/2), new Vector(width, height/2));
  mykline.bumpLevel();
  mykline.bumpLevel();
  
  console.log("------------ END SETUP! -------------");
  noLoop();
}


function draw() {
    //background(0, 0, 80);
    //stroke(50, 50);
    renderKochLine(mykline); 

}
function keyPressed() {
  controller.keyPressed();
  if (key == "k") {
    background(0, 0, 80);
    mykline.bumpLevel();
    renderKochLine(mykline); 
  }
}
//----------------------------------------------------------------
//-----------------------------------------------  Rendering
function renderKochLine(kline:KochLine) {
   if (kline.segments.length > 0) {
    push();
      kline.segments.forEach((segment) => {  renderKochLine(segment) });
    pop();
   } 
   else {
    line(kline.start.x, kline.start.y, kline.end.x, kline.end.y);
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