Bounds detection on a triangle. 

### The classic algorithm

Discussed on [stackexchange](https://math.stackexchange.com/questions/51326/determining-if-an-arbitrary-point-lies-inside-a-triangle-defined-by-three-points)

- Let 𝑃 be a point and 𝐴,𝐵 and 𝐶 are the vertices of a triangle.
- Define the vectors 𝐴𝐵 (side AB), 𝐵𝐶 (side BC) and 𝐶𝐴 (side CA) and the vectors 𝐴𝑃, 𝐵𝑃 and 𝐶𝑃. (lines from the vertices to the point)
- 𝑃 is inside the triangle formed by 𝐴,𝐵 and 𝐶 if and only if all of the cross products, 𝐴𝐵×𝐴𝑃, 𝐵𝐶×𝐵𝑃 and 𝐶𝐴×𝐶𝑃, point in the same direction relative to the plane. That is, either all of them point out of the plane, or all of them point into the plane. 
- This can be determined by looking at the sign of last term of the cross product.

Thanks to <https://stackoverflow.com/a/9755252/5946596> for an efficient implementation. I did not understand what it was doing when I first looked at it, but writing the code out to do full solution made it make sense. 

### The implementation

Start the function. `a, b, c` implement `{x:number, y:number}` and are the vertices of the triangle A, B, C. `point` is P, the point being checked. 
 
    function triangleContains(point, a, b, c) {
  
Get the vector between A and the point P.

    const AP = {x:point.x - a.x, y:point.y - a.y}
  
`(b.x - a.x), (b.y - a.y)` is side AB, and is "clockwise". We'll do just the third term of the crossproduct ABxAP, and then only keep its direction. 

    const AB = {x:(b.x - a.x), y:(b.y - a.y)}
    const thirdTermABxAPisPositve = AB.x  * AP.y - AB.y * AP.x > 0;

`(c.x - a.x), (c.y - a.y)` is side AC, and is "counter clockwise" from AB. Again we'll do just the third term of the crossproduct ACxAP, caring only about its direction. By using the "counter clockwise" AC instead of CA we have saved having to calculate CP.

    const AC = {x:(c.x - a.x), y:(c.y - a.y)}
    const thirdTermACxAPisPositve = AC.x * AP.y - AC.y * AP.x > 0

This result should NOT match the direction of what we kept before because AC and AB are in different directions. We can go ahead and exit the function returning false. 
  
    if (thirdTermACxAPisPositve == thirdTermABxAPisPositve) return false;
  
`(c.x - b.x), (c.y - b.y)` is sideBC and like the first side is "clockwise". `(point.x - b.x),(point.y - b.y)` is the vector BP.One last time, we only care about the third term of the crossproduct BCxBP, and really just its direction. 

    const BC = {x:(c.x - b.x), y:(c.y - b.y)}
    const BP = {x:(point.x - b.x), y:(point.y - b.y)}
    const thirdTermBCxBPisPositive = BC.x * BP.y - BC.y * BP.x > 0

This value should match the direction of `thirdTermABxAPisPositve` because BC is the same direction as AB. If it doesn't again we can go ahead and leave the function, returning false.
 
    if (thirdTermBCxBPisPositive != thirdTermABxAPisPositve) return false;
  
If we made it this far, then we're inside because all the booleans have the same value. It does not matter if they are all true or all false, they just have to be all the same.

    return true; }


All together

```

function triangleContainsE(point, a, b, c) {

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
```


### Instructions   

- Move the mouse to do bounds detection on the triangles. 
