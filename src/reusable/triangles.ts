

// ----------------------------------------------------------- APPROACH 1 CROSS PRODUCTS 
// Define the vectors 𝐴𝐵, 𝐵𝐶 and 𝐶𝐴 and the vectors 𝐴𝑃, 𝐵𝑃 and 𝐶𝑃. 
// 𝑃 is inside the triangle formed by 𝐴,𝐵 and 𝐶 if and only if all of the cross products
// 𝐴𝐵×𝐴𝑃, 𝐵𝐶×𝐵𝑃 and 𝐶𝐴×𝐶𝑃 point in the same direction relative to the plane. 
// That is, either all of them point out of the plane, or all of them point into the plane. This can be determined by looking at the sign of last term of the cross product. 


// ------------------------------------------------ triangleContains_theLongWay

function triangleContains_theLongWay(pointToTest: Vector, a: Vector, b: Vector, c: Vector) {
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
  function triangleContains_terse_elaborated(point: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }, c: { x: number; y: number }) {
  
    //the vector between point p and point a
    const AP = { x: point.x - a.x, y: point.y - a.y }
  
    //(b.x - a.x), (b.y - a.y) is sideAB "clockwise"
    const AB = { x: (b.x - a.x), y: (b.y - a.y) }
    const thirdTermABxAPisPositve = AB.x * AP.y - AB.y * AP.x > 0;
  
    //(c.x - a.x), (c.y - a.y) is side AC "counter clockwise"
    //because it is in the other direction it should be the other direction out of the plane.
    //by checking the value this way is saves us from having to get CP, too
    const AC = { x: (c.x - a.x), y: (c.y - a.y) }
    const thirdTermACxAPisPositve = AC.x * AP.y - AC.y * AP.x > 0
  
    if (thirdTermACxAPisPositve == thirdTermABxAPisPositve) return false;
  
    //(c.x - b.x), (c.y - b.y) is sideBC "clockwise", 
    //(point.x - b.x),(point.y - b.y) is BP
    //since this is also clockwise it should be the same as the first. 
    const BC = { x: (c.x - b.x), y: (c.y - b.y) }
    const BP = { x: (point.x - b.x), y: (point.y - b.y) }
    const thirdTermBCxBPisPositive = BC.x * BP.y - BC.y * BP.x > 0
    if (thirdTermBCxBPisPositive != thirdTermABxAPisPositve) return false;
  
    //since we would have noped out already if things didn't match... we're good! 
    return true;
  }
  
  // ------------------------------------------------------ triangleContains_terse
  function triangleContains_terse(s: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }, c: { x: number; y: number }) {
    let as_x = s.x - a.x;
    let as_y = s.y - a.y;
    let s_ab = (b.x - a.x) * as_y - (b.y - a.y) * as_x > 0;
    if ((c.x - a.x) * as_y - (c.y - a.y) * as_x > 0 == s_ab) { return false; }
    if ((c.x - b.x) * (s.y - b.y) - (c.y - b.y) * (s.x - b.x) > 0 != s_ab) { return false; }
    return true;
  }


function triangleContains_NotMixingDirections(point:{x:number, y:number}, a:{x:number, y:number}, b:{x:number, y:number}, c:{x:number, y:number}) {

    const AP = {x:point.x - a.x, y:point.y - a.y}
    const AB = {x:(b.x - a.x), y:(b.y - a.y)}
    const thirdTermABxAPisPositive = AB.x  * AP.y - AB.y * AP.x > 0;

    const BC = {x:(c.x - b.x), y:(c.y - b.y)}
    const BP = {x:(point.x - b.x), y:(point.y - b.y)}
    const thirdTermBCxBPisPositive = BC.x * BP.y - BC.y * BP.x > 0

    if (thirdTermBCxBPisPositive != thirdTermABxAPisPositive) return false;
  
    const CA = {x:(a.x - c.x), y:(a.y - c.y)}
    const CP = {x:(point.x - c.x), y:(point.y - c.y)}
    const thirdTermCAxCPisPositive = CA.x * CP.y - CA.y * CP.x > 0

    return (thirdTermCAxCPisPositive != thirdTermABxAPisPositive);

}


// ----------------------------------------------------------- APPROACH 2 DETERMINATE

  function triangleContains_usesDeterminant(point: { x: number; y: number }, a: { x: number; y: number }, b: { x: number; y: number }, c: { x: number; y: number }) {
    let det = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  
    //These are all the third terms of the cross products * determinate 
    return (
      det * ((b.x - a.x) * (point.y - a.y) - (b.y - a.y) * (point.x - a.x)) >= 0 &&
      det * ((c.x - b.x) * (point.y - b.y) - (c.y - b.y) * (point.x - b.x)) >= 0 &&
      det * ((a.x - c.x) * (point.y - c.y) - (a.y - c.y) * (point.x - c.x)) >= 0
    );
  }
  
  




