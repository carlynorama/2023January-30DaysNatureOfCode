Built the wanderer as class wrapping a vehicle instead of extending it. Not sure why, but that is what felt right to me. Perhaps is the way the vehicle code is sitting in an apparatus in the illustrations of the [original paper](https://www.red3d.com/cwr/papers/1999/gdc99steer.pdf) by Craig Reynolds.

Wanderer's point to seek is a location on a circle in front of the vehicle as described in the paper. The next seek point is selected by drawing a dot on a second smaller circle and using that dot's location to project a new location on the arc of the larger circle contained by the smaller circle. Press the "l" key while running to freeze the apparatus in place. I don't believe the blue dot is the actual next seek point, but it is where this seek point was relative to it's predecessor since the apparatus is being drawn after the update happens.   

### Video Info

- coding train link: <https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/5-autonomous-agents/5-wander>
- video in playlist: <https://www.youtube.com/watch?v=ujsR2vcJlLk&list=PLRqwX-V7Uu6ZV4yEcW3uDwOgGXKUUsPOM&index=42>
- code: <https://editor.p5js.org/codingtrain/sketches/v-VoQtETO>

### Instructions
Nothing to do here but watch the wander.  

- "l" to start or stop the the running sketch
