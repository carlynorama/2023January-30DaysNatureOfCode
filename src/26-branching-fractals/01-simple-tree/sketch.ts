//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 25-fractals/02-cantor-set/sketch.ts
// calynorama 2023 Jan 25
//

//https://natureofcode.com/book/chapter-8-fractals/#chapter08_section5
//Coding Challenge: https://www.youtube.com/watch?v=0jjeOYMjmDU


let controller:ControlledCanvas;

let slider: Element;


function setup() {
  controller = new ControlledCanvas(400, 400);
  colorMode(HSB);
  background(0, 0, 80);
  stroke(0);
  noFill();

  //@ts-expect-error
  slider = createSlider(0, PI, PI/4, PI/180);

  
  console.log("------------ END SETUP! -------------");
  //noLoop();
}


function draw() {
    background(0, 0, 80);
    //stroke(50, 50);
    translate(200, height)
    //console.log(slider);
    //@ts-expect-error
    drawBranch(100, slider.value(), 0.67);

}
function keyPressed() {
  controller.keyPressed();
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