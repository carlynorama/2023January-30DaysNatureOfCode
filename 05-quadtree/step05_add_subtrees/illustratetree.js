function drawSubTrees(parent, level) {
  //This is an expected flaw in this quad tree implementation.
  //Non leaves should not have elements.
  //This will be fixed in a subsequent version.
  drawBounds(parent); //<--

  console.log("Bounds drawer level:", level);
  parent.subTrees.forEach(tree => {
    if (tree.subTrees.length != 0) {

      drawSubTrees(tree, level + 1);
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

function drawSubPoints(parent, level, c) {
  //This is an expected flaw in this quad tree implementation.
  //Non leaves should not have elements.
  //This will be fixed in a subsequent version.
  stroke(c);
  drawPoints(parent, c); //<---

  console.log("Points drawer level:", level);

  let newColor = c;
  //newColor.setAlpha(255 - (level * 30));
  //console.log(255 - (level * 10), newColor);
  parent.subTrees.forEach(tree => {
    if (tree.subTrees.length != 0) {
      drawSubPoints(tree, level+1, newColor);
    } else {
      drawPoints(tree, newColor);
    }
  });
}

function drawPoints(tree, c) {
    stroke(c);
    rectMode(CENTER);
    noFill();
    tree.points.forEach(point => {
      drawPoint(point, c);
    });
}

function drawPoint(point, c) {
  stroke(c);
  rect(point.x, point.y, 10, 10);
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
    rectMode(CENTER);
    rect(point.x, point.y, 10, 10);
  }

  drawPoints(color) {
    rectMode(CENTER);
    //fill(102);
    noFill();
    stroke(color);
    this.tree.points.forEach(point => {
      this.drawPoint(point);
    });
  }

}
