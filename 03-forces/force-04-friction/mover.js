class Mover {
  constructor(x, y, c) {
    this.startx = x;
    this.starty = y;
    this.pos = createVector(x, y);

    this.diameter = random(10, 30);
    this.mass = map(this.diameter, 10, 30, 20, 40);
    this.color = c;
    this.color.setAlpha(map(this.diameter, 10, 30, 200, 10));
    //this.color.setAlpha(10);

    //this.acceleration = p5.Vector.random2D(); //<--- confuses the phyics
    this.velocity = createVector(0,0);//p5.Vector.random2D().mult(random(3));
    this.acceleration = createVector(0,0);

    //BOUNDS
    let r = this.diameter/2
    this.hBounds = createVector(0 + r, width - r);
    this.vBounds = createVector(0 + r, height - r);


  }

  update() {

    this.acceleration.setMag(0.01); //<--- changeing this

    this.velocity.add(this.acceleration);
    this.velocity.limit(2);   //<--- relative to this changes quality of motion
    //console.log(this.velocity);
    this.velocity = this.checkEdges(this.pos, this.velocity, this.hBounds, this.vBounds);
    //console.log(this.velocity);

    this.pos.add(this.velocity);

  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  clearExternalForces(force) {
    //tmp - no internal motivation
    this.acceleration = createVector(0,0);
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
    //strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
    //ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
