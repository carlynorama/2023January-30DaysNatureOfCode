









// Define the vectors 𝐴𝐵, 𝐵𝐶 and 𝐶𝐴 and the vectors 𝐴𝑃, 𝐵𝑃 and 𝐶𝑃. 
// 𝑃 is inside the triangle formed by 𝐴,𝐵 and 𝐶 if and only if all of the cross products
// 𝐴𝐵×𝐴𝑃, 𝐵𝐶×𝐵𝑃 and 𝐶𝐴×𝐶𝑃 point in the same direction relative to the plane. 
// That is, either all of them point out of the plane, or all of them point into the plane. This can be determined by looking at the sign of last term of the cross product. 
function triangleContains_Full(pointToTest:Vector, a:Vector, b:Vector, c:Vector) {
    let sideAB = b.subtracting(a);
    let sideBC = c.subtracting(b);
    let sideCA = a.subtracting(c);
    let AP = pointToTest.subtracting(a);
    let BP = pointToTest.subtracting(b);
    let CP = pointToTest.subtracting(c);
    sideAB.components.push(0);
    sideBC.components.push(0);
    sideCA.components.push(0);
    AP.components.push(0);
    BP.components.push(0);
    CP.components.push(0);
    const ABxAP = sideAB.crossProduct(AP);
    const BCxBP = sideBC.crossProduct(BP);
    const CAxCP = sideCA.crossProduct(CP);
    const result = [ABxAP, BCxBP, CAxCP].filter((val) => val.z > 0);
    if (result.length == 3 || result.length == 0) {
        return true;
    }
    return false;
}

function triangleContains_NecessaryStepsOnly(point:{x:number, y:number}, a:{x:number, y:number}, b:{x:number, y:number}, c:{x:number, y:number}) {

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

function triangleContains_MixingClockandCounterBrief(pointToTest:{x:number, y:number}, a:{x:number, y:number}, b:{x:number, y:number}, c:{x:number, y:number}) {
    let as_x = pointToTest.x - a.x;
    let as_y = pointToTest.y - a.y;
    let s_ab = (b.x - a.x) * as_y - (b.y - a.y) * as_x > 0;
    if ((c.x - a.x) * as_y - (c.y - a.y) * as_x > 0 == s_ab)
        return false;
    if ((c.x - b.x) * (pointToTest.y - b.y) - (c.y - b.y) * (pointToTest.x - b.x) > 0 != s_ab)
        return false;
    return true;
}

function triangleContains_MixingClockandCounterVerbose(point:{x:number, y:number}, a:{x:number, y:number}, b:{x:number, y:number}, c:{x:number, y:number}) {

    const AP = {x:point.x - a.x, y:point.y - a.y}

    const AB = {x:(b.x - a.x), y:(b.y - a.y)}
    const thirdTermABxAPisPositve = AB.x  * AP.y - AB.y * AP.x > 0;
  
    const AC = {x:(c.x - a.x), y:(c.y - a.y)}
    const thirdTermACxAPisPositve = AC.x * AP.y - AC.y * AP.x > 0

    if (thirdTermACxAPisPositve == thirdTermABxAPisPositve) return false;

    const BC = {x:(c.x - b.x), y:(c.y - b.y)}
    const BP = {x:(point.x - b.x), y:(point.y - b.y)}
    const thirdTermBCxBPisPositive = BC.x * BP.y - BC.y * BP.x > 0

    if (thirdTermBCxBPisPositive != thirdTermABxAPisPositve) return false;
  
    return true; 

}

function triangleContains_UsingDeterminate(x:number, y:number, ax:number, ay:number, bx:number, by:number, cx:number, cy:number) {
    let det = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
    return det * ((bx - ax) * (y - ay) - (by - ay) * (x - ax)) >= 0 &&
        det * ((cx - bx) * (y - by) - (cy - by) * (x - bx)) >= 0 &&
        det * ((ax - cx) * (y - cy) - (ay - cy) * (x - cx)) >= 0;
}
