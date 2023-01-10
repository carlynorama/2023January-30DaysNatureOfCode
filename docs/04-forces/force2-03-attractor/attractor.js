class Attractor {
  constructor(x, y, m, c) {
    this.pos = createVector(x, y);
    this.mass = m;
    let r = sqrt(this.mass);
    this.diameter = r*4;
    this.color = c;
  }

  attract(mover) {
    let force = p5.Vector.sub(this.pos, mover.pos);
    let distanceSq = constrain(force.magSq(), 25, 2500);
    let G = 5;
    let strength = G * (this.mass * mover.mass) / distanceSq;
    force.setMag(strength);
    mover.applyForce(force);
  }

  render() {
    fill(this.color);
    stroke(153);
    ellipse(this.pos.x, this.pos.y, this.diameter);
  }
}
