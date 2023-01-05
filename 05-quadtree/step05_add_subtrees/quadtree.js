class QuadTree {
  constructor(x, y, w, h, count) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number' && typeof(w) === 'number' && typeof(h) === 'number' && typeof(count) === 'number')) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('\r\n\r\nError Description:\r\nI\'m sorry Dave, I\'m afraid I can\'t do that.\n("QuadTree():values are not numeric")');
    }
    this.bounds = new Bounds(x, y, w, h);
    this.limit = count;
    this.points = [];
    this.subTrees = []; //[ne,se,sw,nw];
  }

  // static createEmptyTree(bounds, count) {
  //   if (!(typeof(bounds) === 'Bounds' && typeof(c) === 'number')) {
  //     //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
  //     throw new Error('\r\n\r\nError Description:\r\nI\'m sorry Dave, I\'m afraid I can\'t do that.\n("QuadTree.createEmptyTree: values are not numeric")');
  //   }
  //   this.bounds = bounds;
  //   this.limit = count;
  //   this.points = [];
  //   this.subTrees = []; //[ne,se,sw,nw];
  // }

  addPoint(x, y, pointSuccess) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('\r\n\r\nError Description:\r\nI\'m sorry Dave, I\'m afraid I can\'t do that.\n\n(QuadTree.addPoint values are not numeric.)');
    }
    if (!this.contains(x,y)) {
      console.log(x,y,"not in here", this.bounds.pretty())
      return false;
    } else {
      if (this.subTrees.length != 0) {
        return this.addPointToSubTree(x,y);
      }
     else if ((this.points.length < this.limit) && (this.subTrees.length === 0)) {
              let point = new Point(x,y);
              this.points.push(point);
              pointSuccess(this.limit);
              return true;
      }
      else {
        console.log("SUBDIVIDING!");
        this.subdivide();
        //distributePoints(); ??
        return false;//this.addPointToSubTree(x,y);
      }
    }
  }

  subdivide() {
    if (this.subTrees.length === 0) {
      let subBounds = this.bounds.quads();
      console.log(subBounds.length)
      for (let bounds of subBounds) {
        console.log(bounds.pretty(), bounds.x, bounds.y, bounds.width, bounds.height);
        //let newTree = new QuadTree(bounds.origin.x, bounds.origin.y, bounds.size.width, bounds.size.height)
        //this.subTrees.push(newTree);
      }
    } else {
      //console.log("ERROR: subdivide() should never be called if subtrees exists.");
      throw new Error('ERROR: subdivide() should never be called if subtrees exists.');
    }
  }

  //this is only called if point is KNOWN to be in the bounds. It should
  //never faile to find a home.
  // addPointToSubTree(x,y) {
  //   let west = new Range(this.bounds.origin.x,this.bounds.size.width/2);
  //   let north = new Range(this.bounds.origin.y, this.bounds.size.height/2);
  //   //<-- ! IMPORTANT this is the same type of check as Bounds uses
  //   let isWest = west.upperInclusiveContains(x);
  //   let isNorth = north.upperInclusiveContains(y);
  //
  //
  //   if (isNorth && !isWest) {
  //     let tree = this.subTrees[0];
  //     //console.log(tree.bounds.origin.x);
  //     return tree.addPoint(x,y);
  //   } else if (!isNorth && !isWest) {
  //     let tree = this.subTrees[1];
  //     //console.log(tree.bounds.origin.x);
  //     return tree.addPoint(x,y);
  //   } else if (!isNorth && isWest) {
  //     let tree = this.subTrees[2];
  //     //console.log(tree.bounds.origin.x);
  //     return tree.addPoint(x,y);
  //   } else {
  //     let tree = this.subTrees[3];
  //     //console.log(tree.bounds.origin.x);
  //     return tree.addPoint(x,y);
  //   }
  //
  //   console.log("If statement failure.");
  //   return false;
  // }

  addPointToSubTree(x,y) {
    if (this.subTrees.length == 0) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('\r\n\r\nError Description:\r\nI\'m sorry Dave, I\'m afraid I can\'t do that.\n(QuadTree.addPointToSubTree: subtrees array is empty.)');
    }
    for (let i = 0; i < 4; i++) {
      if (this.subTrees[i].contains(x,y)) {
        console.log("I think you're in here!");
        return this.subTrees[i].addPoint(x,y);
      }
    }
    console.log("Didn't find a home.");
  }

  contains(x,y) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
      throw new Error('\r\n\r\nError Description:\r\nI\'m sorry Dave, I\'m afraid I can\'t do that.\n(QuadTree.conatins values are not numeric.)');
    }
    return this.bounds.contains(x,y);
  }

}
