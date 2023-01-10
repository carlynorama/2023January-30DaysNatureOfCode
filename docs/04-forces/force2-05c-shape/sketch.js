// Note, this is the hard way.

let movers = [];
let attractor;

function setup() {
  //frameRate(5);
  let color1 = color(204, 204, 0, 255);
  let color2 = color(0, 204, 204, 255);
  let color3 = color(204, 0, 204, 255);
  let color4 = color(204, 102,0);

  createControlledCanvas(400, 400);
  background(51);

  //3, one in the center.  side(200) => h(173.2) h/2 = 86.6
  //173.205080756887729 //s × √3 / 2
  //86.602540378443865
  //In an equilateral triangle the orthocenter, centroid, circumcenter, and incenter coincide. The center of the circle is the centroid and height coincides with the median. The radius of the circumcircle is equal to two thirds the height.


  let halfs = 200/2;
  let halfh = 86.602540378443865;
  let twthH = 2*173.205080756887729/3;
  let onthH = 173.205080756887729/3;
  let ox = 200;
  let oy = 200;
  let a = PI/3;
  let mag = 1;

  let top_pos = createVector(ox, oy - halfh);
  let top_vel = createVector(0,- halfh); //top_pos.copy();
  top_vel.rotate(a);
  top_vel.setMag(mag);

  let bl_pos = createVector(ox - halfs, oy + halfh);
  let bl_vel = createVector(-halfs , halfh); //top_pos.copy();
  bl_vel.rotate(a);
  bl_vel.setMag(mag);

  let br_pos = createVector(ox + halfs, oy + halfh);
  let br_vel = createVector(halfs, halfh); //top_pos.copy();
  br_vel.rotate(a);
  br_vel.setMag(mag);

  movers[0] = new Mover(top_pos.x, top_pos.y, top_vel.x, top_vel.y, 10, color1);
  movers[1] = new Mover(bl_pos.x, bl_pos.y, bl_vel.x, bl_vel.y, 10, color2);
  movers[2] = new Mover(br_pos.x, br_pos.y, br_vel.x, br_vel.y, 10, color3);

  //4, places at corners of a square.
  // movers[0] = new Mover(300, 200, 0, 5, 10, color1);
  // movers[1] = new Mover(100, 200, 0, -5, 10, color2);
  // movers[2] = new Mover(200, 300, -5, 0, 10, color3);
  // movers[3] = new Mover(200, 100, 5, 0, 10, color4);

  //attractor = new Mover(ox, oy, 0, 0, 10, color1);

}

function draw() {
  if (runFlag) {
    background(51, 10);
        movers.forEach(mover => {
          //attractor.attract(mover);
          movers.forEach(other => {
              if (mover !== other) {
                stroke(mover.color)
                mover.attract(other);
                line(mover.position.x, mover.position.y, other.position.x, other.position.y);
              }
            });

        });

        movers.forEach(mover => {
          mover.update();
          mover.render();
        });
  }
}
