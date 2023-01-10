class QuadTree {
  constructor(x, y, w, h, count) {
    this.bounds = new Bounds(x, y, w, h);
    this.limit = count;
    this.points = [];
    this.subTrees = []; //[ne,se,sw,nw];
  }

  addPoint(x, y, pointSuccess) {
    if (!this.contains(x,y)) {
      console.log(x,y,"not in here")
      return false;
    } else {
      if (this.subTrees.length != 0) {
        return this.addPointToSubTree(x,y);
      }
     else if ((this.points.length < this.limit) && (this.subTrees.length == 0)) {
              let point = new Point(x,y);
              this.points.push(point);
              pointSuccess(this.limit);
              return true;
      }
      else {
        this.subdivide();
        //distributePoints(); ??
        return this.addPointToSubTree(x,y);
      }
    }
  }

  subdivide() {
    if (this.subTrees.length == 0) {
      for (let bounds of this.bounds.quads()) {
        this.subTrees.push(new QuadTree(bounds.x, bounds.y, bounds.width, bounds.height, this.limit));
      }
    } else {
      console.log("ERROR: subdivide() should never be called if subtrees exists.");
    }
  }

  //this is only called if point is KNOWN to be in the bounds. It should
  //never faile to find a home.
  addPointToSubTree(x,y) {
    let west = new Range(this.bounds.origin.x,this.bounds.size.width/2);
    let north = new Range(this.bounds.origin.y, this.bounds.size.height/2);
    //<-- ! IMPORTANT this is the same type of check as Bounds uses
    let isWest = west.upperInclusiveContains(x);
    let isNorth = north.upperInclusiveContains(y);

    if (isNorth && !isWest) {
      let tree = this.subTrees[0];
      //console.log(tree.bounds.origin.x);
      drawBounds(tree);
      return tree.addPoint(x,y);

    } else if (!isNorth && !isWest) {
      let tree = this.subTrees[1];
      //console.log(tree.bounds.origin.x);
      drawBounds(tree);
      return tree.addPoint(x,y);
    } else if (!isNorth && isWest) {
      let tree = this.subTrees[2];
      //console.log(tree.bounds.origin.x);
      drawBounds(tree);
      return tree.addPoint(x,y);
    } else {
      let tree = this.subTrees[3];
      //console.log(tree.bounds.origin.x);
      drawBounds(tree);
      return tree.addPoint(x,y);
    }

    console.log("If statement failure.");
    return false;

  }

  contains(x,y) {
    return this.bounds.contains(x,y);
  }

}
