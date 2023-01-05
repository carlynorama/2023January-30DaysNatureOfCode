class QuadTreeDrawer {
  constructor(tree) {
    this.tree = tree;
  }

  drawBounds() {
    let box = this.tree.bounds;
    rectMode(CORNER);
    rect(box.origin.x, box.origin.y, box.size.width, box.size.height);
  }

  drawPoint(point) {
    rect(point.x, point.y, 10, 10);
  }

  drawPoints() {
    rectMode(CENTER);
    fill(102);
    this.tree.points.forEach(point => {
      this.drawPoint(point);
    });
  }
}
