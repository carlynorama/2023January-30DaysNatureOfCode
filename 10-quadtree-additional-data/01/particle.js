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
      //console.log("check point", p.x, p.y, this.qtree.bounds.pretty());
      
      //console.log(p.x, p.y, p.properties.radius);
       let side = (2 * p.properties.radius) + 10;
      // let checkBounds = Bounds.createBoundsFromCenter(p.x, p.y, side, side);
      // //console.log(checkBounds.pretty())
      // this.drawCheck(checkBounds);
      this.qtree.doWithPointsInRadius(p.x, p.y, side+10, boundCheckDistance);
      //this.qtree.doWithPoints(boundCheckDistance);
    }

  }

  checkDistance(point) {
    let checkAndSet = (other) => {
      //point.setTouched(true);
      //console.log("check other", other.x, other.y);
      //console.log("check other", other.x, other.y, point.x, point.y);
      if (point != other) {
        console.log("check other", other.x, other.y, point.x, point.y);
        //console.log("not the same", point.properties.touched);
        //if (point.closeEnoughTo(other, (point.properties.radius + other.properties.radius))) {
           point.setTouched(true);
        //}
        //console.log("not the same", point.properties.touched);
      }
    }

    //console.log("check point", point.x, point.y, this.qtree.bounds.pretty());
    //point.setTouched(false);

    this.qtree.doWithPointsInRadius(point.x, point.y, 2 * point.properties.radius, checkAndSet);

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
