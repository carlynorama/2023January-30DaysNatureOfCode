

  //https://en.wikipedia.org/wiki/Gravitational_constant
  //https://en.wikipedia.org/wiki/Two-body_problem
  //leap frog
  //verlet
  //runge-kitta

  // https://github.com/nature-of-code/noc-examples-p5.js/blob/master/chp02_forces/NOC_2_08_mutualattraction/mover.js
  // The Nature of Code
  // Daniel Shiffman
  // http://natureofcode.com

  class Mover {
    constructor(x, y, vx, vy, m) {
      this.mass = m;
      this.position = createVector(x, y);
      this.velocity = createVector(vx, vy);
      this.acceleration = createVector(0, 0);
    }

    applyForce(force) {
      let f = p5.Vector.div(force, this.mass);
      this.acceleration.add(f);
    }

    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }

    render() {
      stroke(0);
      strokeWeight(2);
      fill(255, 127);
      ellipse(this.position.x, this.position.y, this.mass * 16);
    }

    attract(other) {
      // Calculate direction of force
      let force = p5.Vector.sub(this.position, other.position);
      // Distance between objects
      let distance = force.mag();
      // Limiting the distance to eliminate "extreme" results for very close or very far objects
      distance = constrain(distance, 5.0, 2500.0);

      // Calculate gravitional force magnitude
      let strength = (G * this.mass * other.mass) / (distance * distance);
      // Get force vector --> magnitude * direction
      force.setMag(strength);
      return force;
    }
  }
