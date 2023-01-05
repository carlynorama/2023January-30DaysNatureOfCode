class QuadTree {
  constructor(x, y, w, h, count) {
    this.bounds = new Bounds(x, y, w, h);
    this.limit = count;
    this.points = [];
    this.subTrees = []; //[ne,se,sw,nw];
  }

  addPoint(x, y) {
    if (!this.contains(x,y)) {
      return false;
    } else {
      if (this.subTrees.length != 0) {
        return this.addPointToSubTree(x,y);
      }
     else if ((this.points.length < this.limit) && (this.subTrees.length == 0)) {
              let point = new Point(x,y);
              this.points.push(point);
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
    let minX = this.bounds.origin.x;
    let minY = this.bounds.origin.y;
    //these are also our widths and heights
    let midX = this.bounds.size.width/2;
    let midY = this.bounds.size.height/2;

    let ne  = new QuadTree(midX, minY, midX, midY, this.limit);
    let se  = new QuadTree(midX, midY, midX, midY, this.limit);
    let sw  = new QuadTree(minX, midY, midX, midY, this.limit);
    let nw  = new QuadTree(minX, minY, midX, midY, this.limit);

    this.subTrees = [ne,se,sw,nw];
  }

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

    return false;

  }

  contains(x,y) {
    return this.bounds.contains(x,y);
  }

}
