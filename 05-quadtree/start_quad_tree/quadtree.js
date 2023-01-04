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
    this.lowerbounds = l;
    this.upperbounds = u;
  }

  inclusiveContains() {

  }

  exclusiveContains() {

  }

  includeLowerContains() {

  }

  includeUpperContains() {

  }
}

class Bounds {
  constructor(x, y, w, h) {
    this.origin = new Point(x,y);
    this.size = new Size(w,h);
  }

  contains(x, y) {
    let result = false;

    return result;
  }

  contains(point) {
    return contains(x,y);
  }
}


class QuadTree {

}
