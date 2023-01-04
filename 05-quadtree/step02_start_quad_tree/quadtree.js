class QuadTree {
  constructor(bounds, count) {
    this.bounds = bounds;
    this.count = count;
    this.points = [];
  }

  addPoint(x,y) {
    let point = new Point(x,y);
    return addPoint(point);
  }

  addPoint(point) {

    if (!this.bounds.contains(point)) {
      return false;
    } else {
      this.points.push(point);
      return true;
    }


  }

}
