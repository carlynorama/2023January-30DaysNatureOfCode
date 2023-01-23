Most of the heavy lifting on this was already done because had `projectOn` and `angleBetween` for vectors of size Rn, took this moment to do some `Vector` library reorganizing. 

- Have now renamed `angle` to `angle2D` is now the name of the function that uses `atan`. Other functions that specifically work only in 2D space have that in the function name. 
- Note: `angleToAxis(0)` and `angleBetween` don't preserve directionality b/c `acos`.
    - Solution: `directionalAngleToAxis(angleAxis, directionAxis)` can now be used in Rn space.

### Video Info

- coding train link: <https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/5-autonomous-agents/6-scalar-projection>
- video in playlist: <https://www.youtube.com/watch?v=DHPfoqiE4yQ&list=PLRqwX-V7Uu6ZV4yEcW3uDwOgGXKUUsPOM&index=43>
- code: 2D Vector Projection <https://editor.p5js.org/codingtrain/sketches/c4jmHLFQI>

### Other Resources

- <https://radzion.com/blog/linear-algebra/vectors>
- <https://www.khanacademy.org/math/linear-algebra/matrix-transformations/lin-trans-examples/v/introduction-to-projections>



### Instructions
Nothing to do here but watch the butterflies.   

- "l" to start or stop the the running sketch
