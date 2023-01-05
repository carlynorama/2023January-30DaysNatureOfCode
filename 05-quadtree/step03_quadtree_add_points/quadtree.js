class QuadTree {
  // constructor(bounds, count) {
  //   this.bounds = bounds;
  //   this.count = count;
  //   this.points = [];
  // }

  constructor(x, y, w, h, count) {
    this.bounds = new Bounds(x, y, w, h);
    this.count = count;
    this.points = [];
    this.subTrees = [];
  }

  addPoint(x, y) {
    //console.log("hello point");
    if (!this.bounds.contains(x,y)) {
      return false;
    } else {
      let point = new Point(x,y);
      this.points.push(point);
      return true;
    }
  }



}
