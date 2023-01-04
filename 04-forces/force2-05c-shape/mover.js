// Derived from Gravitational Attraction
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/EpgB3cNhKPM
// https://thecodingtrain.com/learning/nature-of-code/2.5-gravitational-attraction.html
// https://editor.p5js.org/codingtrain/sketches/MkLraatd

class Mover {
  constructor(x, y, vx, vy, m, c) {
    this.position = createVector(x, y);
    this.velocity = createVector(vx, vy);
    this.acceleration = createVector(0, 0);
    this.mass = m;
    this.r = sqrt(this.mass) * 2;
    this.diameter = this.r * 2;
    this.color = c;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  attract(mover) {
    let force = p5.Vector.sub(this.position, mover.position);
    let distanceSq = constrain(force.magSq(), 100, 1000);
    let G = 25;
    let strength = (G * (this.mass * mover.mass)) / distanceSq;
    force.setMag(strength);
    mover.applyForce(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
  }

  render() {
    fill(this.color);
    stroke(153);
    ellipse(this.position.x, this.position.y, this.diameter);
  }
}
