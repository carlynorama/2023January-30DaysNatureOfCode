"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
let triangles = [];
const numberOfTriangles = 100;
const XPmin = 30;
const XPmax = 50;
// let triangleA: { A: Vector, B: Vector, C: Vector };
// let triangleB: Triangle;
// let triangleC: Triangle;
function setup() {
    createCanvas(400, 400);
    // triangleA = {
    //   A: new Vector(20, random(50, 130)),
    //   B: new Vector(200, random(30, 190)),
    //   C: new Vector(100, random(50, 150))
    // }
    // triangleB = {
    //   A: { x: random(20, 100), y: random(200, 380) },
    //   B: { x: random(150, 200), y: random(100, 300) },
    //   C: { x: random(300, 380), y: random(20, 200) }
    // }
    // triangleC = {
    //   A: { x: 280, y: random(300, 380) },
    //   B: { x: 380, y: random(280, 340) },
    //   C: { x: 220, y: random(200, 300) }
    // }
    for (let i = 0; i < numberOfTriangles; i++) {
        let x = random(0, width);
        let y = random(0, height);
        const A = { x: x - random(XPmin, XPmax), y: y + random(XPmin, XPmax) };
        const B = { x: x + random(XPmin, XPmax), y: y + random(XPmin, XPmax) };
        const C = { x: x + random(-XPmax, XPmax), y: y - random(XPmin, XPmax) };
        console.log(A.x, A.y, B.x, B.y, C.x, C.y);
        triangles.push({ A, B, C });
    }
    background(0, 0, 80);
    ellipseMode(CENTER);
    colorMode(HSB);
    console.log("-------- DONE SETUP 2 --------");
}
//let counter = 270;
function draw() {
    background(0, 0, 80);
    //drawPath(path);
    let testPoint = new Vector(mouseX, mouseY);
    triangles.forEach((t) => {
        const test = triangleContains_barycentric(testPoint, t.A, t.B, t.C);
        //fill(test ? 90 : 270, 80, 60);
        fill(test ? 0 : 180, 80, 60);
        drawTriangle(t);
    });
    // const boundsTestA = triangleContains_theLongWay(
    //   testPoint,
    //   triangleA.A,
    //   triangleA.B,
    //   triangleA.C
    // );
    // const boundsTestB = triangleContains_terse(
    //   testPoint,
    //   triangleB.A,
    //   triangleB.B,
    //   triangleB.C
    // );
    // const boundsTestC = triangleContains_usesDeterminant(
    //   testPoint,
    //   triangleC.A,
    //   triangleC.B,
    //   triangleC.C
    // );
    // fill(boundsTestA ? 0 : 180, 80, 60);
    // drawTriangle(triangleA);
    // fill(boundsTestB ? 0 : 180, 80, 60);
    // drawTriangle(triangleB);
    // fill(boundsTestC ? 0 : 180, 80, 60);
    // drawTriangle(triangleC);
}
function drawTriangle(t) {
    push();
    triangle(t.A.x, t.A.y, t.B.x, t.B.y, t.C.x, t.C.y);
    pop();
}
//-----------------------------------------------------------------------------
//------------------------------------------------------ FUNCTIONS BEING TESTED
//-----------------------------------------------------------------------------
// ------------------------------------------------ triangleContains_theLongWay
function triangleContains_theLongWay(pointToTest, a, b, c) {
    let sideAB = b.subtracting(a); //(b.x - a.x), (b.y - a.y)
    let sideBC = c.subtracting(b); //(c.x - b.x), (c.y - b.y)
    let sideCA = a.subtracting(c); //(a.x - c.x), (a.y - c.y)
    let AP = pointToTest.subtracting(a); // (p.x - a.x), (p.y - a.y)
    let BP = pointToTest.subtracting(b); // (p.x - b.x), (p.y - b.y)
    let CP = pointToTest.subtracting(c); // (p.x - b.x), (p.y - c.y)
    //everyone needs a thrid component to cross product
    sideAB.components.push(0);
    sideBC.components.push(0);
    sideCA.components.push(0);
    AP.components.push(0);
    BP.components.push(0);
    CP.components.push(0);
    //we'll only be looking at the thrid component so could speed this up by only doing that
    //this.components[0] * components[1] - this.components[1] * components[0]
    //so for ABxAP that would be (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.y - a.y)
    const ABxAP = sideAB.crossProduct(AP);
    const BCxBP = sideBC.crossProduct(BP);
    const CAxCP = sideCA.crossProduct(CP);
    const result = [ABxAP, BCxBP, CAxCP].filter((val) => val.z > 0);
    if (result.length == 3 || result.length == 0) {
        return true;
    }
    return false;
}
// ------------------------------------------ triangleContains_terse_elaborated
function triangleContains_terse_elaborated(point, a, b, c) {
    //the vector between point p and point a
    const AP = { x: point.x - a.x, y: point.y - a.y };
    //(b.x - a.x), (b.y - a.y) is sideAB "clockwise"
    const AB = { x: (b.x - a.x), y: (b.y - a.y) };
    const thirdTermABxAPisPositve = AB.x * AP.y - AB.y * AP.x > 0;
    //(c.x - a.x), (c.y - a.y) is side AC "counter clockwise"
    //because it is in the other direction it should be the other direction out of the plane.
    //by checking the value this way is saves us from having to get CP, too
    const AC = { x: (c.x - a.x), y: (c.y - a.y) };
    const thirdTermACxAPisPositve = AC.x * AP.y - AC.y * AP.x > 0;
    if (thirdTermACxAPisPositve == thirdTermABxAPisPositve)
        return false;
    //(c.x - b.x), (c.y - b.y) is sideBC "clockwise", 
    //(point.x - b.x),(point.y - b.y) is BP
    //since this is also clockwise it should be the same as the first. 
    const BC = { x: (c.x - b.x), y: (c.y - b.y) };
    const BP = { x: (point.x - b.x), y: (point.y - b.y) };
    const thirdTermBCxBPisPositive = BC.x * BP.y - BC.y * BP.x > 0;
    if (thirdTermBCxBPisPositive != thirdTermABxAPisPositve)
        return false;
    //since we would have noped out already if things didn't match... we're good! 
    return true;
}
// ------------------------------------------------------ triangleContains_terse
function triangleContains_terse(s, a, b, c) {
    let as_x = s.x - a.x;
    let as_y = s.y - a.y;
    let s_ab = (b.x - a.x) * as_y - (b.y - a.y) * as_x > 0;
    if ((c.x - a.x) * as_y - (c.y - a.y) * as_x > 0 == s_ab) {
        return false;
    }
    if ((c.x - b.x) * (s.y - b.y) - (c.y - b.y) * (s.x - b.x) > 0 != s_ab) {
        return false;
    }
    return true;
}
function triangleContains_usesDeterminant(point, a, b, c) {
    let det = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    //These are all the third terms of the cross products * determinate 
    return (det * ((b.x - a.x) * (point.y - a.y) - (b.y - a.y) * (point.x - a.x)) >= 0 &&
        det * ((c.x - b.x) * (point.y - b.y) - (c.y - b.y) * (point.x - b.x)) >= 0 &&
        det * ((a.x - c.x) * (point.y - c.y) - (a.y - c.y) * (point.x - c.x)) >= 0);
}
function triangleContains_NotMixingDirections(point, a, b, c) {
    const AP = { x: point.x - a.x, y: point.y - a.y };
    const AB = { x: (b.x - a.x), y: (b.y - a.y) };
    const thirdTermABxAPisPositive = AB.x * AP.y - AB.y * AP.x > 0;
    const BC = { x: (c.x - b.x), y: (c.y - b.y) };
    const BP = { x: (point.x - b.x), y: (point.y - b.y) };
    const thirdTermBCxBPisPositive = BC.x * BP.y - BC.y * BP.x > 0;

    if (thirdTermBCxBPisPositive != thirdTermABxAPisPositive)
        return false;

    const CA = { x: (a.x - c.x), y: (a.y - c.y) };
    const CP = { x: (point.x - c.x), y: (point.y - c.y) };
    const thirdTermCAxCPisPositive = CA.x * CP.y - CA.y * CP.x > 0;
    return (thirdTermCAxCPisPositive == thirdTermABxAPisPositive);
}

function triangleContains_barycentric(point, a, b, c) {
    const dx_pc = point.x-c.x;
    const dy_pc = point.y-c.y;
    const dx_cb = c.x-b.x;
    const dy_bc = b.y-c.y;
    const dx_ac = a.x-c.x;
    const dy_ac = a.y-c.y;
    const dy_ca = c.y-a.y;


    const D = dy_bc * dx_ac + dx_cb * dy_ac;
    const s = dy_bc * dx_pc + dx_cb * dy_pc;
    const t = dy_ca * dx_pc + dx_ac * dy_pc;
    if (D<0) return s<=0 && t<=0 && s+t>=D;
    return s>=0 && t>=0 && s+t<=D; 

    // var dX = point.x-c.x;
    // var dY = point.y-c.y;
    // var dXCB = c.x-b.x;
    // var dYBC = b.y-c.y;
    // var D = dYBC*(a.x-c.x) + dXCB*(a.y-c.y);
    // var s = dYBC*dX + dXCB*dY;
    // var t = (c.y-a.y)*dX + (a.x-c.x)*dY;
    // if (D<0) return s<=0 && t<=0 && s+t>=D;
    // return s>=0 && t>=0 && s+t<=D;  

    //Note in a comment to check
    //Try triangle (-1,-1), (1,-1), (0,1) and point (0,-1). Returns false when it should return true because s(2) + t(2) > d (2). Something wrong with the math on edges of the triangle, it seems, as the point p is right on the border between p0 and p1 and it's not a simple matter of converting a < to a <= or something like that.
    //Acually, after further study, it DOES appear that it can be easily fixed. Changing the last line of ptInTriangle to
    // "return s >= 0.0 && t >= 0.0 && (s + t) <= 2.0 * A * sgn" seems to work.
    
}