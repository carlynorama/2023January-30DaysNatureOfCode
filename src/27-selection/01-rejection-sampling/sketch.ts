//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// 27-selection/01-rejection-sampling/sketch.ts
// calynorama 2023 Jan 27
//


let controller:ControlledCanvas;

class DisplayShape {
  form:string;
  size:number;
  hue:number;

  constructor(form:string) {
    this.form = form
    this.size = 20;
    this.hue = form.charCodeAt(0)/128 * 360;
    console.log(this.hue);
  }
}

let lexicon: Record<string, (shape:DisplayShape)=>void> = { 
  "rect": (shape) => { fill(shape.hue, 60, 60); rect(0,0, shape.size, shape.size/2)},
  "ellipse": (shape) => { fill(shape.hue, 60, 60); ellipse(0,0, shape.size, shape.size/2) },
  "circle": (shape) =>  { fill(shape.hue, 60, 60); circle(0,0, shape.size) },
  "square": (shape) => { fill(shape.hue, 60, 60); rect(0,0, shape.size, shape.size)},
  "triangle": (shape) => { fill(shape.hue, 60, 60); triangle(0,0, -shape.size/2, shape.size, shape.size/2, shape.size,)},
}; 

let xValues:number[];
let yValues:number[];

let shapes:DisplayShape[];

function setup() {
  controller = new ControlledCanvas(400, 400);
  colorMode(HSB);
  background(0, 0, 80);


  shapes = [new DisplayShape("rect"), new DisplayShape("circle"), new DisplayShape("ellipse"), new DisplayShape("square"), new DisplayShape("triangle")]
  xValues = new Array(100).fill(0).map((element) => random(0,width));
  yValues = new Array(100).fill(0).map((element) => random(0,height));

  console.log("------------ END SETUP! -------------");
  noLoop();
}


function draw() {
    background(0, 0, 80);
    for (let i = 0; i<100; i++) {
      push();
      translate(xValues[i], yValues[i]);
      const whichShape = round(random(0, shapes.length-1));
      const thisShape = shapes[whichShape];
      const doThis = lexicon[thisShape.form]
      doThis(thisShape);
      pop();
    }
}

function keyPressed() {
  controller.keyPressed();
  // if (key == "t") {
    
  // }
}
//----------------------------------------------------------------
//-----------------------------------------------  Rendering
