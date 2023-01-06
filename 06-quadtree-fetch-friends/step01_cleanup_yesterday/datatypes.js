class Point {
  constructor(x, y) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('\r\n\r\nError Description:\r\nI\'m sorry Dave, I\'m afraid I can\'t do that.\n("Point():values are not numeric")');
    }
    this.x = x;
    this.y = y;
  }
  pretty() {
    return `Point(${this.x}, ${this.y})`
  }
}

class Size {
  constructor(w, h) {
    if (!(typeof(w) === 'number' && typeof(h) === 'number')) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('\r\n\r\nError Description:\r\nI\'m sorry Dave, I\'m afraid I can\'t do that.\n("Size():values are not numeric")');
    }
    this.width = w;
    this.height = h;
  }
  pretty() {
    return `Point(${this.width}, ${this.height})`
  }
}

class Range {
  constructor(l, u) {
    if (!(typeof(l) === 'number' && typeof(u) === 'number')) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('\r\n\r\nError Description:\r\nI\'m sorry Dave, I\'m afraid I can\'t do that.\n("Range():values are not numeric")');
    }
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
    return this.size.width/2 + this.minX();
  }

  get midY() {
    return this.size.height/2 + this.minY();
  }

  get x() { return this.origin.x }
  get y() { return this.origin.y }
  get width() { return this.size.width }
  get height() { return this.size.height }

  contains(x, y) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('\r\n\r\nError Description:\r\nI\'m sorry Dave, I\'m afraid I can\'t do that.\n(Bounds.contains: values are not numeric.)');
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

  quads() {
    if (this.width < 8 || this.height < 8) {
      throw new Error('Bounds.quads: this is going to be a really small sub tree.');
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
