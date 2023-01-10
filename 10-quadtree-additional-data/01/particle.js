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

  wiggle = () => {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  setTouched = (value) => {
    this.properties.touched = value;
  }

  render = () => {
    noFill();
    let c;
    if (this.properties.touched) { c = color(0, 255, 255, 255) } else { c = color(153, 100) };
    stroke(c);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.properties.radius * 2);
  }

}

class ParticleProperties {
  constructor(x, y) {
    this.start_x = x;
    this.start_y = y;
    this.radius = 10;
    this.wiggle = 6;
    this.touched = false;
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
      let x = randomGaussian(0, this.width);
      let y = randomGaussian(0, this.height);
      let p = new Particle(x, y);
      this.qtree.addPoint(p, boundSuccess);
    }
  }
  success(point) {
    //console.log("success", point.x, point.y, point.properties);
    this.particleHandles.push(point);
  }

  wiggled(point) {
    //console.log("wiggled", point.x, point.y, point.properties);
  }

  update() {
    let values = this.qtree.popAllPoints()
    let wiggleUpdate = (point) => { 
      point.wiggle(); 
      this.qtree.addPoint(point, this.wiggled);
    } 
    values.forEach(wiggleUpdate)

    const boundCheckDistance = this.checkDistance.bind(this);

    for (let p of this.particleHandles) {
       let side = (2 * p.properties.radius) + 10;
       //TODO: Why am I calling .doWithPointsInRadius twice? 
       //Because originally the original point could have moved
      this.qtree.doWithPointsInRadius(p.x, p.y, side+10, boundCheckDistance);
    }

  }

  

  checkDistance(point) {
    
    let checkAndSet = (other) => {
      //if the point is already touched, it doesn't matter in this code how many.
      if (point.properties.touched) { return } 
 
      if (point != other) {
        console.log("check other", other.x, other.y, point.x, point.y);
        if (point.closeEnoughTo(other, (point.properties.radius + other.properties.radius))) {
           point.setTouched(true);
           other.setTouched(true);
        }
      }
    }

    point.setTouched(false);

    //The (2.2 * point.properties.radius) is the stand in for what should be 2x the biggest possible value between the centers of particles.
    this.qtree.doWithPointsInRadius(point.x, point.y, 2.2 * point.properties.radius, checkAndSet);
  }



  draw = () => { this.qtree.doWithPoints(this.drawFound); }
  drawFound = (point) => { point.render(); }

  drawCheck(bounds) {
    rectMode(CORNER);
    stroke(204,51,51, 80);
    noFill();
    rect(bounds.x, bounds.y, bounds.width, bounds.height);
  }



}
