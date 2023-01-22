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


function setup() {
  controller = new ControlledCanvas(400, 400);
 
  base = new Vector(random(0, width/3), random(0,height/3));
  secondV = new Vector(random(0, width/3), random(0,height/3));
  projection = secondV.projectOn(base);
  subtraction = secondV.subtracted(projection);

  colorMode(HSB);

  background(0, 0, 0);

  translate(width/2, height/2);

  //drawLightSource(base, subtraction);
  drawBackground(base, secondV);

  drawVector(base, 5, 20);
  drawVector(secondV, 3, 110);
  drawVector(projection, 1, 200);
  translate(projection.x, projection.y);
  drawVector(subtraction, 1, 290);

  console.log("-------- DONE SETUP --------");
}

function drawBoundsInterceptVector(vector:Vector, weight:number, hue:number) {
  let drawThis = getBoundsIntercept(vector);
  drawVector(drawThis,weight,hue)
}

function getBoundsIntercept(vector:Vector) {
  const slope = vector.y/vector.x
  const testX = width/2
  let heightIntercept = slope * (testX)
  if (heightIntercept <= height && heightIntercept >= 0) {
    return new Vector(testX, heightIntercept)
  } 
  const testY = height/2
  let widthIntercept = testY / slope
  if (widthIntercept <= width && widthIntercept >= 0) {
    return new Vector(widthIntercept, testY)
  } 
  return vector;
}

function drawVector(vector:Vector, weight:number, hue:number) {
  push();
    strokeWeight(weight);
    stroke(hue, 60, 80);
    line(0, 0, vector.x, vector.y);
    translate(vector.x, vector.y);
    rotate(vector.angle());
    const arrowTip = 8;
    line(0, 0, -arrowTip, -arrowTip/2);
    line(0, 0, -arrowTip, arrowTip/2);
  pop();
}

function drawLightSource(baseVector:Vector, second:Vector) {
  //assume translated to base of base vector
  push();
  rotate(baseVector.angle());
  let distance = 100;
  if (second.angle() < baseVector.angle()) { distance *= -1 }
  translate(baseVector.magnitude()/2, distance);
  ellipseMode(CENTER);
  circle(0, 0, 30);
  line(-100, 0, 100, 0);
  pop();

}

function drawBackground(baseVector:Vector, second:Vector) {
  //assume translated to base of base vector
  let horizonLength = width * Math.SQRT2 //works because canvas is square. 
  let horizonHeight = height/2 * Math.SQRT2
  push();
  rotate(baseVector.angle());
  //let distance = 100;
  if (second.angle() < baseVector.angle()) { horizonHeight *= -1 }
  
  noStroke()
  fill(0,0,40);
  rect(-horizonLength/2, -horizonHeight, horizonLength, horizonHeight);
  fill(0,0,70);
  rect(-horizonLength/2, horizonHeight, horizonLength, -horizonHeight);
  pop();

}