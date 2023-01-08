



class Point {
  constructor(x, y) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('\r\n\r\nPoint():values are not numeric');
    }
    this.x = x;
    this.y = y;
  }

  static matches(lhs, rhs) {
    return (lhs.x === rhs.x && lhs.y === rhs.y)
  }

  matches(other) {
    return Point.matches(this, other);
  }

  pretty() {
    return `Point(${this.x}, ${this.y})`
  }
}

class Size {
  constructor(w, h) {
    if (!(typeof(w) === 'number' && typeof(h) === 'number')) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('\r\n\r\nSize():values are not numeric');
    }
    this.width = w;
    this.height = h;
  }

  static matches(lhs, rhs) {
    return (lhs.width === rhs.width && lhs.height === rhs.height)
  }

  static sidesGreaterThan(lhs, rhs) {
    return (lhs.width >= rhs.width && lhs.height >= rhs.height)
  }

  static areaGreaterThan(lhs, rhs) {
    return (lhs.area >= rhs.area)
  }

  matches(other) {
    return Size.matches(this, other);
  }

  get area() { return this.width * this.height }

  pretty() {
    return `Size(${this.width}, ${this.height})`
  }
}

class Range {
  constructor(l, u) {
    if (!(typeof(l) === 'number' && typeof(u) === 'number')) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('\r\n\r\nRange():values are not numeric")');
    }
    this.lower = l;
    this.upper = u;
  }

  static project(val, l1, u1, l2, u2) {
    //check against range.locationInRange();
    let percent = Math.abs(val - l1)/Math.abs(u1-l1);
    let displacement = (u2-l2) * percent;
    return l2 + displacement;
  }

  static constrain(val, l, u) {
    return Math.min(Math.max(val, l), u);
    //Math.clamp(val, l, u) is apparently slow?;
  }

  locationInRange(val) {
      return Math.abs(val - this.lower)/Math.abs(this.upper-this.lower);
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

  overlaps(other) {
    //have to have both incase one holds the other and the smaller is the caller.
    let sideOne = (this.inclusiveContains(other.lower) ||  this.inclusiveContains(other.upper))
    let sideTwo = (other.inclusiveContains(this.lower) ||  other.inclusiveContains(this.upper))
    return sideOne || sideTwo;
  }

  //contains would be better, how to overload without types?
  fullyHolds(other) {
    return (this.lower < other.lower && this.upper > other.upper)
  }

  holds(other) {
    return (this.lower <= other.lower && this.upper >= other.upper)
  }

  pretty() {
    return `Range(lower:${this.lower}, upper:${this.upper})`
  }
}

class Bounds {
  constructor(point, size) {
    if (!(typeof(point.x) === 'number' && typeof(point.y) === 'number' && typeof(size.width) === 'number' && typeof(size.height) === 'number')) {
      //console.log(point.pretty(), size.pretty())
        throw new Error('\r\n\r\nBounds(): at least one value is not numeric');
    }
    this.origin = point;
    this.size = size;
  }

  static createBounds(x, y, w, h) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number' && typeof(w) === 'number' && typeof(h) === 'number')) {
      throw new Error('\r\n\r\nBounds(): at least one value is not numeric');
    }
    let p = new Point(x,y);
    let s = new Size(w,h);
    let b = new Bounds(p,s);
    return b;
  }

  get minX() {
    return this.origin.x;
  }

  get minY() {
    return this.origin.y;
  }

  get maxX() {
    return this.origin.x + this.size.width;
  }

  get maxY() {
    return this.origin.y + this.size.height;
  }

  get midX() {
    return this.size.width/2 + this.minX;
  }

  get midY() {
    return this.size.height/2 + this.minY;
  }

  get x() { return this.origin.x }
  get y() { return this.origin.y }
  get width() { return this.size.width }
  get height() { return this.size.height }

  offSetBy(x, y) {
    this.origin.x += x;
    this.origin.y += y;
  }

  updateOrigin(x, y) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('Bounds.updateOrigin: one or both of the values are not numeric.');
    }
    this.origin.x = x;
    this.origin.y = y;
  }

  updateCenter(x, y) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('Bounds.updateCenter: one or both of the values are not numeric.');
    }
    this.origin.x = x - this.width/2;
    this.origin.y = y - this.height/2;
  }

  updateWithin(x, y, bounds) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('Bounds.updateOrigin: one or both of the values are not numeric.');
    }
    this.origin.x = Range.constrain(x, bounds.minX, bounds.maxX);
    this.origin.y = Range.constrain(y, bounds.minY, bounds.maxY);
  }
  moveWithin(x, y, bounds) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('Bounds.updateOrigin: one or both of the values are not numeric.');
    }
    this.origin.x = Range.constrain(x, bounds.minX, bounds.maxX - this.width);
    this.origin.y = Range.constrain(y, bounds.minY, bounds.maxY - this.height);
  }

  moveWithinCentered(x, y, bounds) {
    this.moveWithin(x - this.width/2, y - this.height/2, bounds)
  }

  insetBy(margin) {
    this.size.width -= margin;
    this.size.height -= margin;
  }

  insetBy(margin) {
    this.size.width -= margin;
    this.size.height -= margin;
  }

  insetOnCenterBy(margin) {
    this.size.width -= margin;
    this.size.height -= margin;
    let offset = margin/2;
    this.offSetBy(offset, offset);
  }

  scale(factor) {
    this.size.width * scale;
    this.size.height * scale;
  }

  contains(x, y) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('Bounds.contains: one or both of the values are not numeric.');
    }
    //console.log("contains:", x, y)
    //console.log("MINX", this.minX())
    //console.log("direct", this.origin.x)
    let xRange = new Range(this.minX, this.maxX);

    let xCheck = xRange.upperInclusiveContains(x);
    //console.log("x", xRange.pretty(), x, xCheck);

    let yRange = new Range(this.minY, this.maxY);
    let yCheck = yRange.upperInclusiveContains(y);
    //console.log("y", this.minY, this.maxY, y, yCheck);
    return (xCheck && yCheck);
    //return true;
  }


  static intersects(lhs, rhs) {
    let lhs_xRange = new Range(lhs.minX, lhs.maxX);
    let lhs_yRange = new Range(lhs.minY, lhs.maxY);
    let rhs_xRange = new Range(rhs.minX, rhs.maxX);
    let rhs_yRange = new Range(rhs.minY, rhs.maxY);

    return (lhs_xRange.overlaps(rhs_xRange) && lhs_yRange.overlaps(rhs_yRange));
  }

  static intersection(lhs, rhs) {
    let originX;
    let originY;
    let w;
    let h;
    let lhs_xRange = new Range(lhs.minX, lhs.maxX);
    let lhs_yRange = new Range(lhs.minY, lhs.maxY);
    let rhs_xRange = new Range(rhs.minX, rhs.maxX);
    let rhs_yRange = new Range(rhs.minY, rhs.maxY);

    if (lhs_xRange.overlaps(rhs_xRange) && lhs_yRange.overlaps(rhs_yRange)) {

      if (lhs_xRange.inclusiveContains(rhs.minX)) { originX = rhs.minX; w = Math.min(lhs.maxX,rhs.maxX)-rhs.minX }
      else { originX = lhs.minX; w = Math.min(lhs.maxX,rhs.maxX)-lhs.minX }
      if (lhs_yRange.inclusiveContains(rhs.minY)) { originY = rhs.minY; h = Math.min(lhs.maxY,rhs.maxY)-rhs.minY }
      else { originY = lhs.minY; h = Math.min(lhs.maxY,rhs.maxY)-lhs.minY }
    }

    else { return null }
    //console.log(originX, originY, w, h);
    return Bounds.createBounds(originX, originY, w, h);
  }

  static matches(lhs, rhs) {
    return (lhs.origin.matches(rhs.origin) && lhs.size.matches(rhs.size));
  }

  intersects(other) {
    return Bounds.intersects(this, other);
  }

  intersection(other) {
    return Bounds.intersection(this, other);
  }

  matches(other) {
    return Bounds.matches(this, other);
  }

  holds(other) {
    //x y values can be equal
    let lhs_xRange = new Range(this.minX, this.maxX);
    let lhs_yRange = new Range(this.minY, this.maxY);
    let rhs_xRange = new Range(other.minX, other.maxX);
    let rhs_yRange = new Range(other.minY, other.maxY);

    return (lhs_xRange.holds(rhs_xRange) && lhs_yRange.holds(rhs_yRange))
  }

  containedBy(other) {
    let lhs_xRange = new Range(this.minX, this.maxX);
    let lhs_yRange = new Range(this.minY, this.maxY);
    let rhs_xRange = new Range(other.minX, other.maxX);
    let rhs_yRange = new Range(other.minY, other.maxY);

    return (rhs_xRange.holds(lhs_xRange) && rhs_yRange.holds(lhs_yRange))
  }

  quads() {
    if (this.width < 4 || this.height < 4) {
      console.log('Bounds.quads: this is going to be a really small sub tree.');
    }
    let minX = this.origin.x;
    let minY = this.origin.y;

    let w = (this.size.width)/2;
    let h = (this.size.height)/2;

    let midX = w + minX;
    let midY = h + minY;

    if (midX === minY || midX === minY ) {
      throw new Error('Bounds.quads: is a dimension 0?');
    }

    let ne  = Bounds.createBounds(midX, minY, w, h);
    let se  = Bounds.createBounds(midX, midY, w, h);
    let sw  = Bounds.createBounds(minX, midY, w, h);
    let nw  = Bounds.createBounds(minX, minY, w, h);

    return [ne,se,sw,nw];
  }

  pretty() {
    return `Bounds(x:${this.origin.x}, y:${this.origin.y}, w:${this.size.width}, h:${this.size.height})`
  }

  minmaxstring() {
    return `Bounds(minX:${this.minX}, maxX:${this.maxX}, minY:${this.minY}, maxY:${this.maxY})`
  }

}
