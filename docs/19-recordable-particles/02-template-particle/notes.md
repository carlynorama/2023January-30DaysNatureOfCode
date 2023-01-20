Refactors particle system from yesterday:

- makes an `abstract class BasicParticle` in TypeScript that turns into a normal class in JavaScript. 
- make type definitions `DrawableParticle` & `Fading` types that are combined into `DrawableFader` fader type that is passed to the `showParticle` function. In the JavaScript it is erased to `any`.

### Video Info
coding train link: <https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/4-particles/3-particle-inheritance>
video in playlist: <https://www.youtube.com/watch?v=44RSr49m6LU&list=PLRqwX-V7Uu6ZV4yEcW3uDwOgGXKUUsPOM&index=36>
code: <https://editor.p5js.org/codingtrain/sketches/QRzgzQLnQ>

### Instructions

Click to make a new particle emitter at the mouse location. 

- "l" to start or stop the the running sketch
- "s" to save a single frame
- "r" to record a burst of frames.  
