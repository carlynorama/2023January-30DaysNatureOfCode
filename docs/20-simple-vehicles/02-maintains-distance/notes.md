Builds on previous sketch. I had done seek differently without locking it to maxSpeed, which meant that flee then made no sense. Vehicle was fleeing less if the scary object was closer. 

- `tackle` - the classic seek
- `flee` - classic persue
- `approach` - my seek that eases out
- `maintainDistance` - moves towards if too far away, away if to close
- `checkForArrival` - takes any vector and compares it against it's location + dockingDistance (i.e. radius);

### Video Info
This just touches on the beginning part of these links. 

- coding train link: <https://thecodingtrain.com/tracks/the-nature-of-code-2/noc/5-autonomous-agents/3-pursue-and-evade>
- video in playlist: <https://www.youtube.com/watch?v=Q4MU7pkDYmQ&list=PLRqwX-V7Uu6ZV4yEcW3uDwOgGXKUUsPOM&index=40>
- code: <https://editor.p5js.org/codingtrain/sketches/v-VoQtETO>

### Instructions
Move the mouse to have the vehicle seek the target. Once the vehicle has arrived at a safe distance away it stops. If it's too close it moves away.  

- "l" to start or stop the the running sketch
