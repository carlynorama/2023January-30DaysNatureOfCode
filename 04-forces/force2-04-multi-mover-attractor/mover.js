class Mover {
  constructor(x, y, m, c) {
    this.pos = createVector(x, y);
    this.mass = m;
    let r = sqrt(this.mass);
    this.diameter = r*4;
    this.color = c;
    this.velocity = p5.Vector.random2D().mult(random(3));
    this.acceleration = createVector(0,0);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    this.clearForces();
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
