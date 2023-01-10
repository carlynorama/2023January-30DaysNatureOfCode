class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.properties = new ParticleProperties(x, y);
  }

  static matches(lhs, rhs) {
    return (lhs.x === rhs.x && lhs.y === rhs.y)
  }

  matches(other) {
    return Particle.matches(this, other);
  }

  hasValues(x, y) {
    return (this.x === x && this.y === y);
  }

  static closeEnough(lhs, rhs, distance) {
    let left = ((lhs.x - rhs.x) * (lhs.x - rhs.x)) + ((lhs.y - rhs.y) * (lhs.y - rhs.y))
    let right = distance * distance
    let result = left <= right;
    //console.log(result, left, right);
    return result;
  }

  closeEnoughTo(other, distance) {
    return Particle.closeEnough(this, other, distance);
  }

  wiggle() {
    this.x + random(-1, 1);
    this.y + random(-1, 1);
  }

  setTouched(isTouched) {
    this.properties.isTouched = isTouched;
  }
}

class ParticleProperties {
  constructor(x, y) {
    this.start_x = x;
    this.start_y = y;
    this.radius = 10;
    this.wiggle = 6;
    this.isTouched = false;
    // let side = (this.radius + this.wiggle) * 2;
    // this.boundsOfInterest = Bounds.createBoundsFromCenter(this.x, this.y, side, side);
  }

  render() {
    fill(this.color_tmp);
    //stroke(153);
    noStroke();
    ellipseMode(CENTER);
    ellipse(this.position.x, this.position.y, this.diameter / 2);
  }
}


class ParticleSet {
  constructor(thisWidth, thisHeight, element_limit) {
    this.qtree = QuadTree.createQuadTree(0, 0, thisWidth, thisHeight, element_limit);
    this.particleHandles = [];
    console.log(this.qtree.bounds.pretty());
  }

  get width() { return this.qtree.bounds.width }
  get height() { return this.qtree.bounds.height }

  populateSet(qty) {
    const boundSuccess = this.success.bind(this);
    for (let i = 0; i < qty; i++) {
      let x = randomGaussian(this.width / 2, this.width / 8);
      let y = randomGaussian(this.height / 2, this.height / 8);
      let p = new Particle(x, y);
      this.qtree.addPoint(p, boundSuccess);
    }
  }
  success(point) {
    console.log("success", point.x, point.y, point.properties);
    this.particleHandles.push(point);
  }

  wiggled(point) {
    console.log("wiggled", point.x, point.y, point.properties);
  }

  update() {
    // let values = this.qtree.popAllPoints()
    // values.forEach((point) => { 
    //   point.wiggle(); 
    //   this.qtree.addPoint(point, this.wiggled);
    // } )

    const boundCheckDistance = this.checkDistance.bind(this);

    for (let p of this.particleHandles) {
      console.log("check point", p.x, p.y, this.qtree.bounds.pretty());
      p.setTouched(false);
      this.qtree.doWithPointsInRadius(p.x, p.y, p.properties.radius, boundCheckDistance);
    }

  }

  checkDistance(point) {
    let checkAndSet = (other) => {
      console.log("check other", other.x, other.y);
      if (point != other) {
        if (point.closeEnough(other, (point.properties.radius + other.properties.radius))) {
          point.setTouched(true);
        }
      }
    }

    console.log("check point", point.x, point.y, this.qtree.bounds.pretty());
    point.setTouched(false);

    this.qtree.doWithPointsInRadius(point.x, point.y, point.properties.radius, checkAndSet);

    

   
  }



  draw() {
    this.qtree.doWithPoints(this.drawFound);
  }


  drawFound(point) {
    noFill();
    let c;
    if (point.properties.isTouched) { c = color(255) } else { c = color(153) };
    stroke(c);
    ellipseMode(CENTER);
    ellipse(point.x, point.y, 3);
  }




}
