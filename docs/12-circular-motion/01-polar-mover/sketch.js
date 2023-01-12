"use strict";
let movers = [];
let attractor;
const numMovers = 1;
let originx = 200;
let originy = 200;
function setup() {
    let color1 = color(204, 204, 0, 255);
    let color2 = color(0, 204, 204, 255);
    let color3 = color(204);
    createControlledCanvas(400, 400);
    originx = width / 2;
    originy = height / 2;
    background(51);
    for (let i = 0; i < numMovers; i++) {
        let base = Vector.random2D();
        movers[i] = new Mover(base.withLength(random(150, 150)), base.rotated(PI / 2).withLength(5), Vector.zero2D(), 10);
    }
    attractor = new Mover(Vector.zero2D(), Vector.zero2D(), Vector.zero2D(), 1000);
}
function draw() {
    if (runFlag) {
        background(51, 50);
        translate(originx, originy);
        movers.forEach(mover => {
            attractor.attract(mover);
            movers.forEach(other => {
                if (other !== mover) {
                    mover.attract(other);
                }
            });
        });
        movers.forEach(mover => {
            mover.update();
            renderMover(mover, 10);
        });
        attractor.update();
        //attractor.render();
    }
}
function renderMover(mover, diameter) {
    fill(255);
    stroke(153);
    ellipseMode(CENTER);
    ellipse(mover.position.x, mover.position.y, diameter);
}
//# sourceMappingURL=sketch.js.map