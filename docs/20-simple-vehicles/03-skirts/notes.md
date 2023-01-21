Builds on previous sketch.  

- `skirt` - moves away in the same vector as it is being approached
- `tangentSkirt` - moves away at a perpendicular vector
- `startLocation` - vehicles know where they started so they can go back.
- `drag` - keeps them from getting too zippy in this frictionless world.
-  Vector library also updated because now it is likely that I will have zero magnitude vectors to deal with, and those need to be caught because they can't be normalized. There is something inefficient in my code and I have to catch it. 

### Video Info
This just touches on the beginning part of these links. 

- coding train link: <https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/5-autonomous-agents/3-pursue-and-evade>
- video in playlist: <https://www.youtube.com/watch?v=Q4MU7pkDYmQ&list=PLRqwX-V7Uu6ZV4yEcW3uDwOgGXKUUsPOM&index=40>
- code: <https://editor.p5js.org/codingtrain/sketches/v-VoQtETO>

### Instructions
Move the mouse to push the vehicles away. The vehicles will return home when the mouse moves away.   

- "l" to start or stop the the running sketch
