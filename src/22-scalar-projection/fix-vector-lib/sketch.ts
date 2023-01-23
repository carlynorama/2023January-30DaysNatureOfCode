//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// /22-path-following/01-scalar-projections/sketch.ts
// calynorama 2023 Jan 22
//  

// Resources:
// - https://radzion.com/blog/linear-algebra/vectors
// - https://www.khanacademy.org/math/linear-algebra/matrix-transformations/lin-trans-examples/v/introduction-to-projections
// - https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/5-autonomous-agents/6-scalar-projection

let controller:ControlledCanvas;


let base:Vector;
let secondV:Vector;
let projection:Vector;
let subtraction:Vector;


// Relevant functions from Vector
//The dot product between two vectors is the sum of the products of corresponding components.
// dotProduct({ components } : { components: number[] }) {
//    return components.reduce((accumulator, component, index) => accumulator + component * this.components[index], 0)
// }
// projectOn(other:Vector) {
//   const normalized = other.normalized()
//   return normalized.scaledBy(this.dotProduct(normalized))
// }

let angle_inc = Math.PI/180;

function setup() {
  controller = new ControlledCanvas(400, 400);

  
 
  base = new Vector(random(-width/3, width/3), random(-height/3,height/3));
  secondV = new Vector(random(-width/3, width/3), random(-height/3,height/3));
  projection = secondV.projectOn(base);
  subtraction = secondV.subtracting(projection);

  //console.log(base.angle2D(), base.angleToAxis(0))
  console.log("Using 2");
  colorMode(HSB);

  background(0, 0, 0);


  translate(width/2, height/2);

  let angleToX = base.angleToAxis(0);
  let twoDAngle = base.angle2D()
  let direcAngleToX = base.directionalAngleToAxis(0, 1);

  let vectorAngle2D = Vector.create2DAngleVector(twoDAngle, 40);
  let vectorAngleToAxis = Vector.create2DAngleVector(angleToX, 40);
  console.log(base.x, base.y, Vector.toDegrees(twoDAngle), Vector.toDegrees(angleToX), Vector.toDegrees(direcAngleToX));
  drawGrayVector(Vector.makeAxisVector(base, 0).scaledBy(40), 10, 40);
  drawGrayVector(Vector.makeAxisVector(base, 1).scaledBy(40), 10, 40);
  drawVector(vectorAngle2D, 2, 0);
  drawVector(vectorAngleToAxis, 2, 180);


  console.log("-------- DONE SETUP --------");
}


function keyPressed() {
  controller.keyPressed();
}

function drawVector(vector:Vector, weight:number, hue:number) {
  push();
    strokeWeight(weight);
    stroke(hue, 60, 80);
    line(0, 0, vector.x, vector.y);
    translate(vector.x, vector.y);
    rotate(vector.angle2D());
    const arrowTip = 8;
    line(0, 0, -arrowTip, -arrowTip/2);
    line(0, 0, -arrowTip, arrowTip/2);
  pop();
}

function drawGrayVector(vector:Vector, weight:number, brightness:number) {
  push();
    strokeWeight(weight);
    stroke(0, 0, brightness);
    line(0, 0, vector.x, vector.y);
    translate(vector.x, vector.y);
    rotate(vector.angle2D());
    const arrowTip = 8;
    line(0, 0, -arrowTip, -arrowTip/2);
    line(0, 0, -arrowTip, arrowTip/2);
  pop();
}
