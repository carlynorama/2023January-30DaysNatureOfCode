class Mover {
  constructor(x, y, vx, vy, m, c) {
    this.pos = createVector(x, y);
    this.mass = m;
    let r = sqrt(this.mass);
    this.diameter = r*2;
    this.color = c;
    this.velocity = createVector(vx,vy);
    this.acceleration = createVector(0,0);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    this.clearForces();
  }

  //https://en.wikipedia.org/wiki/Gravitational_constant
  //https://en.wikipedia.org/wiki/Two-body_problem
  //leap frog
  //verlet
  //runge-kitta
  attract(mover) {
    let force = p5.Vector.sub(this.pos, mover.pos);
    let distanceSq = constrain(force.magSq(), 100, 1000);
    let G = 0.1;
    let strength = G * (this.mass * mover.mass) / distanceSq;
    force.setMag(strength);
    mover.applyForce(force);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  clearForces() {
    this.acceleration.set(0,0);
  }

  render() {
    fill(this.color);
    stroke(153);
    ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
  }
}
