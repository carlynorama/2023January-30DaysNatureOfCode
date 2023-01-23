"use strict";
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
let controller;
let base;
let secondV;
let projection;
let subtraction;
// Relevant functions from Vector
//The dot product between two vectors is the sum of the products of corresponding components.
// dotProduct({ components } : { components: number[] }) {
//    return components.reduce((accumulator, component, index) => accumulator + component * this.components[index], 0)
// }
// projectOn(other:Vector) {
//   const normalized = other.normalized()
//   return normalized.scaledBy(this.dotProduct(normalized))
// }
let angle_inc = Math.PI / 180;
function setup() {
    controller = new ControlledCanvas(400, 400);
    base = new Vector(random(-width / 3, width / 3), random(-height / 3, height / 3));
    secondV = new Vector(random(-width / 3, width / 3), random(-height / 3, height / 3));
    projection = secondV.projectOn(base);
    subtraction = secondV.subtracting(projection);
    //console.log(base.angle2D(), base.angleToAxis(0))
    colorMode(HSB);
    background(0, 0, 0);
    translate(width / 2, height / 2);
    //drawLightSource(base, subtraction);
    drawBackground(base, secondV);
    drawBoundsInterceptVectors(base, 1, 85);
    push();
    translate(projection.x, projection.y);
    drawGrayVector(subtraction, 1, 40);
    pop();
    drawGrayVector(base, 2, 95);
    drawGrayVector(secondV, 2, 20);
    //drawVector(secondV, 1, 110);
    drawVector(projection, 3, 200);
    console.log("-------- DONE SETUP --------");
}
function draw() {
    secondV = Vector.create2DAngleVector(secondV.angle2D() + angle_inc, secondV.magnitude());
    projection = secondV.projectOn(base);
    subtraction = secondV.subtracting(projection);
    translate(width / 2, height / 2);
    //drawLightSource(base, subtraction);
    drawBackground(base, secondV);
    drawBoundsInterceptVectors(base, 1, 85);
    push();
    translate(projection.x, projection.y);
    drawGrayVector(subtraction, 1, 40);
    pop();
    drawGrayVector(base, 2, 95);
    drawGrayVector(secondV, 2, 20);
    //drawVector(secondV, 1, 110);
    drawVector(projection, 3, 200);
}
function keyPressed() {
    controller.keyPressed();
}
function drawBoundsInterceptVectors(vector, weight, brightness) {
    let drawThis = getBoundsIntercept(vector);
    drawGrayVector(drawThis, weight, brightness);
    drawGrayVector(drawThis.inverted(), weight, brightness);
}
function getBoundsIntercept(vector) {
    //assumes vector origin is at center of bounds.
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    //console.log("vector", vector.x, vector.y);
    const slope = vector.y / vector.x;
    let testX = halfWidth;
    if (vector.x < 0) {
        testX *= -1;
    }
    const heightIntercept = slope * (testX);
    //console.log(slope, testX, heightIntercept);
    if (heightIntercept <= halfHeight && heightIntercept >= -halfHeight) {
        //console.log("intercepts vertical at",heightIntercept);
        return new Vector(testX, heightIntercept);
    }
    let testY = halfHeight;
    if (vector.y < 0) {
        testY *= -1;
    }
    const widthIntercept = testY / slope;
    //console.log(testY, widthIntercept);
    if (widthIntercept <= halfWidth && widthIntercept >= -halfWidth) {
        //console.log("intercepts horizontal at", widthIntercept);
        return new Vector(widthIntercept, testY);
    }
    return vector;
}
function drawVector(vector, weight, hue) {
    push();
    strokeWeight(weight);
    stroke(hue, 60, 80);
    line(0, 0, vector.x, vector.y);
    translate(vector.x, vector.y);
    rotate(vector.angle2D());
    const arrowTip = 8;
    line(0, 0, -arrowTip, -arrowTip / 2);
    line(0, 0, -arrowTip, arrowTip / 2);
    pop();
}
function drawGrayVector(vector, weight, brightness) {
    push();
    strokeWeight(weight);
    stroke(0, 0, brightness);
    line(0, 0, vector.x, vector.y);
    translate(vector.x, vector.y);
    rotate(vector.angle2D());
    const arrowTip = 8;
    line(0, 0, -arrowTip, -arrowTip / 2);
    line(0, 0, -arrowTip, arrowTip / 2);
    pop();
}
function drawLightSource(baseVector, second) {
    //assume translated to base of base vector
    push();
    rotate(baseVector.angle2D());
    let distance = 100;
    if (second.angle2D() < baseVector.angle2D()) {
        distance *= -1;
    }
    translate(baseVector.magnitude() / 2, distance);
    ellipseMode(CENTER);
    circle(0, 0, 30);
    line(-100, 0, 100, 0);
    pop();
}
function drawBackground(baseVector, second) {
    //assume translated to base of base vector
    let horizonLength = width * Math.SQRT2; //works because canvas is square. 
    let horizonHeight = height / 2 * Math.SQRT2;
    let normalVector = baseVector.normal2D();
    push();
    rotate(baseVector.angle2D());
    //let distance = 100;
    if (second.dotProduct(normalVector) < 0) {
        horizonHeight *= -1;
    }
    noStroke();
    fill(0, 0, 60);
    rect(-horizonLength / 2, -horizonHeight, horizonLength, horizonHeight);
    fill(0, 0, 70);
    rect(-horizonLength / 2, horizonHeight, horizonLength, -horizonHeight);
    pop();
}
function testLibrary() {
    let angleToX = base.angleToAxis(0);
    let twoDAngle = base.angle2D();
    let direcAngleToX = base.directionalAngleToAxis(0, 1);
    let vectorAngle2D = Vector.create2DAngleVector(twoDAngle, 40);
    let vectorAngleToAxis = Vector.create2DAngleVector(angleToX, 40);
    let vectorDirecAngleToX = Vector.create2DAngleVector(direcAngleToX, 40);
    console.log(base.x, base.y, Vector.toDegrees(twoDAngle), Vector.toDegrees(angleToX), Vector.toDegrees(direcAngleToX));
    drawGrayVector(Vector.makeAxisVector(base, 0).scaledBy(40), 10, 40);
    drawGrayVector(Vector.makeAxisVector(base, 1).scaledBy(40), 10, 40);
    drawVector(vectorAngle2D, 2, 0);
    drawVector(vectorAngleToAxis, 2, 180);
    drawVector(vectorDirecAngleToX, 2, 270);
}
