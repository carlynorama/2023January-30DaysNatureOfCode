class QuadTree {
  constructor(bounds, element_limit) {
    if (!(typeof(element_limit) === 'number')) {
      throw new Error('\r\n\r\nQuadTree():value for element_limit is not numeric');
    }

    if (!(typeof(bounds.x) === 'number')) {
      throw new Error('\r\n\r\nQuadTree():are you sure you included a bounds?');
    }

    this.bounds = bounds;
    this.limit = element_limit;
    this.points = [];
    this.subTrees = []; //[ne,se,sw,nw];
  }


  static createQuadTree(x, y, w, h, element_limit) {
      if (!(typeof(x) === 'number' && typeof(y) === 'number' && typeof(w) === 'number' && typeof(h) === 'number' && typeof(element_limit) === 'number')) {
        throw new Error('\r\n\r\nQuadTree():values are not numeric');
      }
      let b = Bounds.createBounds(x, y, w, h);
      let qt = new QuadTree(b, element_limit);
      return qt;
    }

  static walkTree(parent, level) {
    let thisLevel = level;
    console.log(thisLevel, parent.bounds.pretty());
    let nextLevel = level + 1;
    if (parent.subTrees.length > 0) {
      console.log("I am a NOT a leaf!", parent.points.length); //<- points length should be 0.
      for (let subtree of parent.subTrees) {
        QuadTree.walkTree(subtree, nextLevel);
      }
    } else {
      console.log("I am a leaf!", parent.points.length);
    }
  }



  doWithSubTreeInfo(myAction) {
    QuadTree.subTreeAccess(this, 0, [], myAction);
  }

  static subTreeAccess(parent, level, quadrantPath, myAction) {
    //console.log(thisLevel, parent.bounds.pretty());
    let nextLevel = level + 1;
    if (parent.subTrees.length > 0) {
      for (let i = 0; i < parent.subTrees.length; i++) {
        let myPath = Array.from(quadrantPath);
        myPath.push(i);
        QuadTree.subTreeAccess(parent.subTrees[i], nextLevel, myPath, myAction);
      }
    } else {
        myAction(parent.points, parent.bounds, level, Array.from(quadrantPath).reverse());
    }
  }


 

  doWithPoints(myAction) {
    QuadTree.pointAccess(this, 0, myAction);
  }

  static pointAccess(parent, level, myAction) {
    //console.log(thisLevel, parent.bounds.pretty());
    let nextLevel = level + 1;
    if (parent.subTrees.length > 0) {
      for (let subtree of parent.subTrees) {
        QuadTree.pointAccess(subtree, nextLevel, myAction);
      }
    } else {
      for (let point of parent.points) {
        myAction(point);
      };
    }
  }

  doWithLeafBounds(myAction) {
    QuadTree.boundsAccess(this, myAction);
  }

  static boundsAccess(parent, myAction) {
    if (parent.subTrees.length > 0) {
      for (let subtree of parent.subTrees) {
        QuadTree.boundsAccess(subtree, myAction);
      }
    } else {
        myAction(parent.bounds);
    }
  }

  doWithPointsIn(queryBounds, myAction) {
    QuadTree.pointAccessWithin(queryBounds, this, 0, myAction);
  }
  static pointAccessWithin(queryBounds, parent, level, myAction) {
    if (!(typeof(queryBounds.origin.x) === 'number' && typeof(queryBounds.origin.x) === 'number')) {
      throw new Error('QuadTree.pointAccessWithin: are you sure you got a bounds?');
    }
      //console.log(queryBounds.pretty());
      let nextLevel = level + 1;
      if (parent.subTrees.length > 0) {
        for (let subtree of parent.subTrees) {
          if (queryBounds.intersects(subtree.bounds)) {
            let subBounds = queryBounds.intersection(subtree.bounds);
            QuadTree.pointAccessWithin(subBounds, subtree, nextLevel, myAction);
          }
        }
      } else {
        for (let point of parent.points) {
          if (queryBounds.containsPoint(point)) {
            myAction(point);
          }
        };
      }
    }

    infoFromSubtreesTouching(queryBounds, myAction) {
      QuadTree.subTreeAccessTouching(queryBounds, this, 0, [], myAction)
    }
  
    static subTreeAccessTouching(queryBounds, parent, level, quadrantPath, myAction) {
      //console.log(thisLevel, parent.bounds.pretty());
      let nextLevel = level + 1;
      if (parent.subTrees.length > 0) {
        for (let i = 0; i < parent.subTrees.length; i++) {
          const subtree = parent.subTrees[i];
          if (queryBounds.intersects(subtree.bounds)) {
            let myPath = Array.from(quadrantPath);
            myPath.push(i);
            let subBounds = queryBounds.intersection(subtree.bounds);
            QuadTree.subTreeAccessTouching(subBounds, subtree, nextLevel, myPath, myAction);
          }
        }
      } else {
          myAction(parent.points, parent.bounds, level, Array.from(quadrantPath).reverse());
      }
    }

    getSubTree(level, quadrantPath) {
      return QuadTree.getSubTreeFrom(this, level, quadrantPath);
    }
  
    static getSubTreeFrom(parent, level, quadrantPath) {
      console.log(parent.bounds.pretty(), level, quadrantPath);
      if (level === 0) { return parent }
      let nextLevel = level - 1;
      if (parent.subTrees.length > 0) {
        let treeLoc = quadrantPath.pop();
        return QuadTree.getSubTreeFrom(parent.subTrees[treeLoc], nextLevel, quadrantPath);
      } else {
          //only gets here if there has been a wrong path.
          console.log("Is this really the place?", level, quadrantPath);
          return parent
      }
    }

    findPointValue(x, y) {
      if (!this.bounds.contains(x,y)) { return null }
      return QuadTree.returnPointInfo(x, y, this, 0, []);
    }


    static returnPointInfo(x, y, parent, level, quadrantPath) {
      //console.log(level, parent.bounds.pretty());
      let nextLevel = level + 1;
      if (parent.subTrees.length > 0) {
        for (let i = 0; i < parent.subTrees.length; i++) {
          const subtree = parent.subTrees[i];
          if (subtree.bounds.contains(x,y)) {
            let myPath = Array.from(quadrantPath);
            myPath.push(i);
            return QuadTree.returnPointInfo(x, y, subtree, nextLevel, myPath);
          }
        }
        return null; //really shouldn't ever get here. 
      } else {
        for (let point of parent.points) {
          let result = point.hasValues(x,y);
          //console.log('check', x, y, point.x, point.y, result);
          if (result) {
            return {
              bounds: parent.bounds,
              companions: parent.points.filter(val=> val !== point),
              level: level,
              path:quadrantPath.reverse()
            }
          }
        }
        return null;
      }
    }
    



  // Not sure this really works as desired. 
  // static clearTree(parent, level) {
  //   let thisLevel = level;
  //   console.log(thisLevel, parent.bounds.pretty());
  //   let nextLevel = level + 1;
  //   if (parent.subTrees.length > 0) {
  //     console.log("I am a NOT a leaf!", parent.points.length); //<- points length should be 0.
  //     for (let subtree of parent.subTrees) {
  //       QuadTree.clearTree(subtree, nextLevel);
  //     }
  //   } else {
  //     console.log("I am a leaf!", parent.points.length);
  //     this.points = [];
  //   }
  // }




  addPoint(x, y, pointSuccess) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      throw new Error('QuadTree.addPoint values are not numeric.');
    }
    if (!(typeof(pointSuccess) === 'function')) {
      throw new Error('QuadTree.addPoint: did not receive successFunction');
    }

    if (!this.contains(x,y)) {
      //console.log(x,y,"not in here", this.bounds.pretty())
      return false;
    } else {
      if (this.subTrees.length != 0) {
        return this.addPointToSubTree(x,y,pointSuccess);
      }
      else if ((this.points.length < this.limit) && (this.subTrees.length === 0)) {
        let point = new Point(x,y);
        this.points.push(point);
        pointSuccess(point);
        return true;
      }
      else {
        //console.log("SUBDIVIDING!");
        this.subdivide();
        for (let point of this.points) {
          this.addPointToSubTree(point.x,point.y,pointSuccess);
        }
        this.points = [];
        return this.addPointToSubTree(x,y,pointSuccess);
      }
      throw new Error('QuadTree.addPoint: case not handled.');

    }
  }

  subdivide() {
    //console.log("SUBDIVIDED CALLED ON TREE:" + this.bounds.pretty());
    if (this.subTrees.length === 0) {
      let subBounds = this.bounds.quads();
      for (let bounds of subBounds) {
        //console.log(bounds.pretty(), bounds.x, bounds.y, bounds.width, bounds.height, this.limit);
        let newTree = new QuadTree(bounds, this.limit);
        this.subTrees.push(newTree);
      }
      //console.log("RESULTING TREES:" + this.bounds.pretty());
      // for (let tree in this.subTrees) {
      //   console.log()
      // }
      // for (let i = 0; i < 4; i++) {
      //   console.log("bounds", i, subBounds[i].pretty());
      //   console.log("tree", i, this.subTrees[i].bounds.pretty());
      // }

    } else {
      throw new Error('ERROR: subdivide() should never be called if subtrees exists.');
    }
  }

  addPointToSubTree(x,y,pointSuccess) {
    if (this.subTrees.length == 0) {
      throw new Error('QuadTree.addPointToSubTree: subtrees array is empty.');
    }
    //console.log("addPointToSubTree, should be 4: ", this.subTrees.length);
    for (let i = 0; i < 4; i++) {
      //console.log(i, this.subTrees[i].bounds.pretty(), x, y);
      if (this.subTrees[i].contains(x,y)) {
        //console.log("I think you're in here!");
        let result = this.subTrees[i].addPoint(x,y,pointSuccess);
        //console.log(result);
        return result;
      }
    }

    throw new Error('QuadTree.addPointToSubTree: Point within bounds did not find subtree.' + this.bounds.pretty() + " x:" + x + " y:"+ y, { details: "Where does this show up?" });
  }

  contains(x,y) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      throw new Error('QuadTree.conatins values are not numeric.');
    }
    return this.bounds.contains(x,y);
  }

  walk() {
    QuadTree.walkTree(this, 0);
  }

  clear() {
    QuadTree.clearTree(this, 0);
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
