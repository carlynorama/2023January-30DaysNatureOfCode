class Mover {
  constructor(x, y, m, c) {
    // this.startx = x;
    // this.starty = y;
    this.pos = createVector(x, y);

    this.mass = m;
    let r = sqrt(this.mass) * 10;
    this.diameter = r*2;
    this.color = c;
    //this.color.setAlpha(10);

    //this.acceleration = p5.Vector.random2D(); //<--- confuses the phyics
    this.velocity = createVector(0,0);//p5.Vector.random2D().mult(random(3));
    this.acceleration = createVector(0,0);

    //BOUNDS
    this.hBounds = createVector(r, width - r);
    this.vBounds = createVector(r, height - r);


  }

  update() {
    this.velocity = this.checkEdges(this.pos, this.velocity, this.hBounds, this.vBounds);
    if (this.pos.y < this.vBounds.x) {
      this.pos.y = this.vBounds.x
    } else if (this.pos.y > this.vBounds.y) {
      this.pos.y = this.vBounds.y
    }
    if (this.pos.x < this.hBounds.x) {
      this.pos.x = this.hBounds.x
    } else if (this.pos.x > this.hBounds.y) {
      this.pos.x = this.hBounds.y
    }

    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    this.clearExternalForces();
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  clearExternalForces() {
    //tmp - no internal motivation
    //this.acceleration = createVector(0,0);
    this.acceleration.set(0,0);

    //this.acceleration = p5.Vector.random2D().div(this.mass);
    //this.acceleration.setMag(0.01);
  }

  checkEdges(position, velocity, hBounds, vBounds) {
    let newVelocity = createVector(velocity.x, velocity.y);

    if ((position.x < hBounds.x) || (position.x > hBounds.y)) {
        newVelocity.x = newVelocity.x * -1;
    }
    if ((position.y < vBounds.x) || (position.y > vBounds.y)) {
        newVelocity.y = newVelocity.y * -1;
    }
    return newVelocity
  }

  render() {
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
  }
}
