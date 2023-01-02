class Mover {
  constructor(x, y, c) {
    this.startx = x;
    this.starty = y;
    this.pos = createVector(x, y);
    this.diameter = random(10, 30);
    this.mass = this.diameter/3;
    this.color = c;
    this.color.setAlpha(map(this.diameter, 10, 30, 50, 5));

    this.acceleration = p5.Vector.random2D();

    this.hBounds = createVector(0, width);
    this.vBounds = createVector(0, height);

    this.velocity = p5.Vector.random2D().mult(random(3));
  }

  update() {

    //this.acceleration.setMag(0.01); //<--- changeing this

    this.velocity.add(this.acceleration);
    this.velocity.limit(2);   //<--- relative to this changes quality of motion
    //console.log(this.velocity);
    this.velocity = this.checkEdges(this.pos, this.velocity, this.hBounds, this.vBounds);
    //console.log(this.velocity);

    this.pos.add(this.velocity);

  }

  applyForce(force) {
    this.acceleration.add(force.div(this.mass));
  }

  clearExternalForces(force) {
    this.acceleration = p5.Vector.random2D().div(this.mass);
    //this.acceleration.setMag(0.01);
  }

  checkEdges(position, velocity, hBounds, vBounds) {
    let newVelocity = createVector(velocity.x, velocity.y);

    if ((position.x < hBounds.x) || (position.x > hBounds.y)) {
        newVelocity.x = newVelocity.x * -1.2;
    }
    if ((position.y < vBounds.x) || (position.y > vBounds.y)) {
        newVelocity.y = newVelocity.y * -1.2;
    }
    return newVelocity
  }

  render() {
    fill(this.color);
    noStroke();
    //strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
    //ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
