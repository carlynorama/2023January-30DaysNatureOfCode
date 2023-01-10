class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      throw new Error('\r\n\r\nPoint():values are not numeric');
    }
    this.x = x;
    this.y = y;
  }

  static matches(lhs:  { x: number; y: number; }, rhs: { x: number; y: number; }) {
    return (lhs.x === rhs.x && lhs.y === rhs.y)
  }

  matches(other: { x: number; y: number; }) {
    return Point.matches(this, other);
  }

  hasValues(x: number, y: number) {
    return (this.x === x && this.y === y);
  }

  static closeEnough(lhs: { x: number; y: number; }, rhs: { x: number; y: number; }, distance: number) {
    let left = ((lhs.x - rhs.x) * (lhs.x - rhs.x)) + ((lhs.y - rhs.y)*(lhs.y - rhs.y))
    let right = distance * distance
    let result = left <= right;
    //console.log(result, left, right);
    return  result ;
  }

  closeEnoughTo(other: { x: number; y: number; }, distance:number) {
    return Point.closeEnough(this, other, distance);
  }

  pretty() {
    return `Point(${this.x}, ${this.y})`
  }
}

class Size {
  width: number;
  height: number;
  constructor(w: number, h: number) {
    if (!(typeof(w) === 'number' && typeof(h) === 'number')) {
      throw new Error('\r\n\r\nSize():values are not numeric');
    }
    this.width = w;
    this.height = h;
  }

  static matches(lhs: { width: number; height: number; }, rhs: { width: number; height: number; }):boolean {
    return (lhs.width === rhs.width && lhs.height === rhs.height)
  }

  static sidesGreaterThan(lhs: { width: number; height: number; }, rhs: { width: number; height: number; }):boolean {
    return (lhs.width >= rhs.width && lhs.height >= rhs.height)
  }

  static areaGreaterThan(lhs: { area: number; }, rhs: { area: number; }):boolean {
    return (lhs.area >= rhs.area)
  }

  matches(other: { width: number; height: number; }):boolean {
    return Size.matches(this, other);
  }

  get area():number { return this.width * this.height }

  get pretty():string {
    return `Size(${this.width}, ${this.height})`
  }
}

//TODO: Rename my range? 
class NumRange {
  lower: number;
  upper: number;
  constructor(l: number, u: number) {
    if (!(typeof(l) === 'number' && typeof(u) === 'number')) {
      throw new Error('\r\n\r\nRange():values are not numeric")');
    }
    this.lower = l;
    this.upper = u;
  }

  static project(val: number, l1: number, u1: number, l2: number, u2: number):number {
    //check against NumRange.locationInRange();
    let percent = Math.abs(val - l1)/Math.abs(u1-l1);
    let displacement = (u2-l2) * percent;
    return l2 + displacement;
  }

  static constrain(val: number, l: number, u: number):number {
    return Math.min(Math.max(val, l), u);
    //Math.clamp(val, l, u) is apparently slow?;
  }

  locationInRange(val: number):number {
      return Math.abs(val - this.lower)/Math.abs(this.upper-this.lower);
  }

  inclusiveContains(x: number):boolean {
    return ((x <= this.upper) && (x >= this.lower))
  }

  exclusiveContains(x: number):boolean {
    return ((x < this.upper) && (x > this.lower))
  }

  lowerInclusiveContains(x: number):boolean {
    return ((x < this.upper) && (x >= this.lower))
  }

  upperInclusiveContains(x: number):boolean {
    return ((x <= this.upper) && (x > this.lower))
  }

  overlaps(other: { lower: number; upper: number; inclusiveContains: (arg0: number) => boolean; }) {
    //have to have both incase one holds the other and the smaller is the caller.
    let sideOne = (this.inclusiveContains(other.lower) ||  this.inclusiveContains(other.upper))
    let sideTwo = (other.inclusiveContains(this.lower) ||  other.inclusiveContains(this.upper))
    return sideOne || sideTwo;
  }

  //contains would be better, how to overload without types?
  fullyHolds(other: { lower: number; upper: number; }):boolean {
    return (this.lower < other.lower && this.upper > other.upper)
  }

  holds(other: { lower: number; upper: number; }):boolean {
    return (this.lower <= other.lower && this.upper >= other.upper)
  }

  get pretty():string {
    return `Range(lower:${this.lower}, upper:${this.upper})`
  }
}

class Bounds {
  origin: Point;
  size: Size;
  constructor(point: Point, size: Size) {
    if (!(typeof(point.x) === 'number' && typeof(point.y) === 'number' && typeof(size.width) === 'number' && typeof(size.height) === 'number')) {
      //console.log(point.pretty(), size.pretty())
        throw new Error('\r\n\r\nBounds(): at least one value is not numeric');
    }
    this.origin = point;
    this.size = size;
  }

  static createBounds(x: number, y: number, w: number, h: number) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number' && typeof(w) === 'number' && typeof(h) === 'number')) {
      throw new Error('\r\n\r\nBounds(): at least one value is not numeric');
    }
    let p = new Point(x,y);
    let s = new Size(w,h);
    let b = new Bounds(p,s);
    return b;
  }

  static createBoundsFromCenter(centerX: number, centerY: number, w: number, h: number) {
    if (!(typeof(centerX) === 'number' && typeof(centerY) === 'number' && typeof(w) === 'number' && typeof(h) === 'number')) {
      throw new Error('\r\n\r\nBounds(): at least one value is not numeric');
    }
    let p = new Point(centerX - w/2,centerY - h/2);
    let s = new Size(w,h);
    let b = new Bounds(p,s);
    return b;
  }

  static createBoundsFromPoints(x1:number, y1:number, x2: number, y2:number) {
    let w = x2 - x1;
    let h = y2 - y1;
    if (w >= 0 && h >= 0) {
      let b = Bounds.createBounds(x1, y1, w, h);
      return b;
    } 
    else if (w < 0 && h < 0) {
      let b = Bounds.createBounds(x2, y2, Math.abs(w), Math.abs(h));
      return b;
    }
    else {
      let s = new Size(Math.abs(w), Math.abs(h));
      let p = new Point(Math.min(x2,x2), Math.min(y2,y1));
      let b = new Bounds(p, s);
      return b;
    }
  }

  get x() { return this.origin.x }
  get y() { return this.origin.y }
  get width() { return this.size.width }
  get height() { return this.size.height }

  get minX() { return this.origin.x; };
  get minY() { return this.origin.y; };
  get maxX() { return this.origin.x + this.size.width; };
  get maxY() { return this.origin.y + this.size.height; };
  get midX() { return this.size.width/2 + this.minX;};
  get midY() { return this.size.height/2 + this.minY;}
  get center() { return new Point(this.midX, this.midY) }
  
  offSetBy(x: number, y: number) {
    this.origin.x += x;
    this.origin.y += y;
  }

  updateOrigin(x: number, y: number) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      throw new Error('Bounds.updateOrigin: one or both of the values are not numeric.');
    }
    this.origin.x = x;
    this.origin.y = y;
  }

  updateCenter(x: number, y: number) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('Bounds.updateCenter: one or both of the values are not numeric.');
    }
    this.origin.x = x - this.width/2;
    this.origin.y = y - this.height/2;
  }

  updateWithin(x: number, y: number, bounds: { minX: number; maxX: number; minY: number; maxY: number; }) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('Bounds.updateOrigin: one or both of the values are not numeric.');
    }
    this.origin.x = NumRange.constrain(x, bounds.minX, bounds.maxX);
    this.origin.y = NumRange.constrain(y, bounds.minY, bounds.maxY);
  }
  moveWithin(x: number, y: number, bounds: { minX: number; maxX: number; minY: number; maxY: number; }) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('Bounds.updateOrigin: one or both of the values are not numeric.');
    }
    this.origin.x = NumRange.constrain(x, bounds.minX, bounds.maxX - this.width);
    this.origin.y = NumRange.constrain(y, bounds.minY, bounds.maxY - this.height);
  }

  moveWithinCentered(x: number, y: number, bounds: Bounds) {
    this.moveWithin(x - this.width/2, y - this.height/2, bounds)
  }

  insetBy(margin: number) {
    this.size.width -= margin;
    this.size.height -= margin;
  }

  insetOnCenterBy(margin: number) {
    this.size.width -= margin;
    this.size.height -= margin;
    let offset = margin/2;
    this.offSetBy(offset, offset);
  }

  scale(factor: number) {
    this.size.width * factor;
    this.size.height * factor;
  }

  contains(x: number, y: number) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      throw new Error('Bounds.contains: one or both of the values are not numeric.');
    }
    //console.log("contains:", x, y)
    //console.log("MINX", this.minX())
    //console.log("direct", this.origin.x)
    let xRange = new NumRange(this.minX, this.maxX);

    let xCheck = xRange.upperInclusiveContains(x);
    //console.log("x", xRange.pretty(), x, xCheck);

    let yRange = new NumRange(this.minY, this.maxY);
    let yCheck = yRange.upperInclusiveContains(y);
    //console.log("y", this.minY, this.maxY, y, yCheck);
    return (xCheck && yCheck);
    //return true;
  }

  containsPoint(point: { x: number; y: number; }) {
    return this.contains(point.x, point.y);
  }


  static intersects(lhs: { minX: number; maxX: number; minY: number; maxY: number; }, rhs: { minX: number; maxX: number; minY: number; maxY: number; }):boolean {
    let lhs_xRange = new NumRange(lhs.minX, lhs.maxX);
    let lhs_yRange = new NumRange(lhs.minY, lhs.maxY);
    let rhs_xRange = new NumRange(rhs.minX, rhs.maxX);
    let rhs_yRange = new NumRange(rhs.minY, rhs.maxY);

    return (lhs_xRange.overlaps(rhs_xRange) && lhs_yRange.overlaps(rhs_yRange));
  }

  // Check on this


  static matches(lhs: { origin: Point; size: Size; }, rhs: { origin: Point; size: Size; }):boolean {
    return (lhs.origin.matches(rhs.origin) && lhs.size.matches(rhs.size));
  }

  intersects(other: Bounds):boolean {
    return Bounds.intersects(this, other);
  }

  intersection(other: Bounds):Bounds|null {
    throw new Error("Fix it first.")
    return Bounds.intersection(this, other);
  }
  //WARNING: This maybe busted.
  static intersection(lhs:Bounds, rhs:Bounds):Bounds|null {
    throw new Error("Fix it first.")
    let originX;
    let originY;
    let w;
    let h;
    let lhs_xRange = new NumRange(lhs.minX, lhs.maxX);
    let lhs_yRange = new NumRange(lhs.minY, lhs.maxY);
    let rhs_xRange = new NumRange(rhs.minX, rhs.maxX);
    let rhs_yRange = new NumRange(rhs.minY, rhs.maxY);

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

  matches(other: Bounds) {
    return Bounds.matches(this, other);
  }

  holds(other: { minX: number; maxX: number; minY: number; maxY: number; }) {
    //x y values can be equal
    let lhs_xRange = new NumRange(this.minX, this.maxX);
    let lhs_yRange = new NumRange(this.minY, this.maxY);
    let rhs_xRange = new NumRange(other.minX, other.maxX);
    let rhs_yRange = new NumRange(other.minY, other.maxY);

    return (lhs_xRange.holds(rhs_xRange) && lhs_yRange.holds(rhs_yRange))
  }

  containedBy(other: { minX: number; maxX: number; minY: number; maxY: number; }) {
    let lhs_xRange = new NumRange(this.minX, this.maxX);
    let lhs_yRange = new NumRange(this.minY, this.maxY);
    let rhs_xRange = new NumRange(other.minX, other.maxX);
    let rhs_yRange = new NumRange(other.minY, other.maxY);

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

  //really should only be valid if bounds is a square. 
  inscribedCircleContains(x: number,y: number) {
    
    if (!this.contains(x,y)) { return false; }

    //Not sure that creating a whole new object saves in this case since I'm not taking the square roots. Worth a performance test.
    // let side = this.width/2 * Math.SQRT2;
    // let offset = side/2;
    // let innerBounds = new Bounds(x-offset, y-offset,side,side); 
    // if (innerBounds.contains(x,y)) { return true; }

     let rhs = new Point(x,y);
     let distance  = this.width/2;
     let result = this.center.closeEnoughTo(rhs, distance);
     //console.log(this.center.x, this.center.y, distance, rhs.x, rhs.y, result);
     return result;
  }

  pretty() {
    return `Bounds(x:${this.origin.x}, y:${this.origin.y}, w:${this.size.width}, h:${this.size.height})`
  }

  minmaxstring() {
    return `Bounds(minX:${this.minX}, maxX:${this.maxX}, minY:${this.minY}, maxY:${this.maxY})`
  }

}
