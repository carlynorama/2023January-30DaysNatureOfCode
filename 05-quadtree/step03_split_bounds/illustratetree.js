function drawSubTrees(parent) {
  parent.subTrees.forEach(tree => {
    if (tree.subTrees.length != 0) {
      drawSubTrees(tree);
    } else {
      drawBounds(tree);
    }
  });
}

function drawBounds(tree) {
  noFill();

  let box = tree.bounds;
  //console.log(box)
  rectMode(CORNER);
  rect(box.origin.x, box.origin.y, box.size.width, box.size.height);
}

function subdivideTest(tree) {
  let colors = [
    color(204, 204, 0),
    color(0, 204, 204),
    color(204, 0, 204),
    color(0, 51, 204),
    color(204, 51, 0),
  ]
    let minX = tree.bounds.origin.x;
    let minY = tree.bounds.origin.y;

    let w = tree.bounds.size.width/2;
    let h = tree.bounds.size.height/2;

    let midX = width + minX;
    let midY = height + minY;

    rectMode(CORNER);
    noFill();
    stroke(colors[0]);
    rect(midX, minY, w, h);
    stroke(colors[1]);
    rect(midX, midY, w, h);
    stroke(colors[2]);
    rect(minX, midY, w, h);
    stroke(colors[3]);
    rect(minX, minY, w, h);
}


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
