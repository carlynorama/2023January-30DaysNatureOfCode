class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Size {
  constructor(w, h) {
    this.width = w;
    this.height = h;
  }
}

class Range {
  constructor(l, u) {
    this.lower = l;
    this.upper = u;
  }

  inclusiveContains(x) {
    return ((x <= this.upper) && (x >= this.lower))
  }

  exclusiveContains(x) {
    return ((x < this.upper) && (x > this.lower))
  }

  lowerInclusiveContains(x) {
    return ((x < this.upper) && (x >= this.lower))
  }

  upperInclusiveContains(x) {
    return ((x <= this.upper) && (x > this.lower))
  }
}

class Bounds {
  constructor(x, y, w, h) {
    this.origin = new Point(x,y);
    this.size = new Size(w,h);
    // this.x = x;
    // this.y = y;
    // this.w = w;
    // this.h = h;
  }

  minX() {
    return this.origin.x;
  }

  minY() {
    return this.origin.y;
  }

  maxX() {
    return this.origin.x + this.size.width;
  }

  maxY() {
    return this.origin.y + this.size.height;
  }

  contains(x, y) {
    let xRange = new Range(this.minX(), this.maxX());

    let xCheck = xRange.upperInclusiveContains(x);
    //console.log("x", this.minX(), this.maxX(), x, xCheck);

    let yRange = new Range(this.minY(), this.maxY());
    let yCheck = yRange.upperInclusiveContains(y);
    //console.log("y", this.minY(), this.maxY(), y, yCheck);
    return (xCheck && yCheck);

    //return true;
  }

  // contains(point) {
  //   return contains(x,y);
  // }

}
