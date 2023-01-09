class QuadTree {

   // --------------------------------------------------------------------------- MAKING
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

  // --------------------------------------------------------------------------- DEBUG STRUCTURE
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

  walk() {
    QuadTree.walkTree(this, 0);
  }

//------------------------------------------------------------------------------- ADDING

  addPoint(x, y, pointSuccess) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      throw new Error('QuadTree.addPoint values are not numeric.');
    }
    if (!(typeof(pointSuccess) === 'function')) {
      throw new Error('QuadTree.addPoint: did not receive successFunction');
    }

    if (!this.containsLocation(x,y)) {
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

        //TODO: this works but readding before removing okay? 
        for (let point of this.points) {
          this.reAddPointToSubTree(point);
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
      if (this.subTrees[i].containsLocation(x,y)) {
        //console.log("I think you're in here!");
        let result = this.subTrees[i].addPoint(x,y,pointSuccess);
        //console.log(result);
        return result;
      }
    }

    throw new Error('Point within bounds did not find subtree.' + this.bounds.pretty() + " x:" + x + " y:"+ y, { details: "Where does this show up?" });
  }



  //These should only be used by this object on itself. Is there "private" for javascript? I think not?
  reAddPoint(point) {
    if (this.subTrees.length != 0) {
      return this.reAddPointToSubTree(point);
    }
    else if ((this.points.length < this.limit) && (this.subTrees.length === 0)) {
      this.points.push(point);
      return true;
    }
    else {
      //console.log("SUBDIVIDING!");
      this.subdivide();
      for (let point of this.points) {
        this.reAddPointToSubTree(point);
      }
      this.points = [];
      return this.reAddPointToSubTree(point);
    }
    throw new Error('QuadTree.reAddPoint: case not handled.');

}

reAddPointToSubTree(point) {
  if (this.subTrees.length == 0) {
    throw new Error('QuadTree.reAddPointToSubTree: subtrees array is empty.');
  }
  //console.log("addPointToSubTree, should be 4: ", this.subTrees.length);
  for (let i = 0; i < 4; i++) {
    //console.log(i, this.subTrees[i].bounds.pretty(), x, y);
    if (this.subTrees[i].containsLocation(point.x,point.y)) {
      //console.log("I think you're in here!");
      let result = this.subTrees[i].reAddPoint(point);
      //console.log(result);
      return result;
    }
  }

  throw new Error('Point within bounds did not find subtree.' + this.bounds.pretty() + " x:" + x + " y:"+ y, { details: "Where does this show up?" });
}

//----------------------------------------------------------------------------------------- INFO

  containsLocation(x,y) {
    if (!(typeof(x) === 'number' && typeof(y) === 'number')) {
      throw new Error('QuadTree.conatins values are not numeric.');
    }
    return this.bounds.contains(x,y);
  }


//------------------------------------------------------------------------------------------ RETURNS DATA
  returnAllPoints() {
    let checkPoints = QuadTree.returnAllPoints(this, []);
    return checkPoints
    //console.log(checkPoints);
  }

  static returnAllPoints(parent, pointsArray) {
    //could use flatMap?
    //console.log(level, parent.bounds.pretty());
    if (parent.subTrees.length > 0) {
      for (let subtree of parent.subTrees) {
          QuadTree.returnAllPoints(subtree, pointsArray);
      }
    } else {
        pointsArray.push(...parent.points);
    }
    return pointsArray;
  }

  getSubTree(level, quadrantPath) {

    //if actually MEANT to call on self and self has no subtree this should cover it. 
    if (level == 0) { return this }

    return QuadTree.getSubTreeFrom(this, level, quadrantPath);

  }

  static getSubTreeFrom(parent, level, quadrantPath) {
    //console.log(parent.bounds.pretty(), level, quadrantPath);
    if (level === 0) { return parent }
    if (level < 0) { throw new Error("get subTree was called on value above root") } 
    let nextLevel = level - 1;
    if (parent.subTrees.length > 0) {
      let treeLoc = quadrantPath.pop();
      return QuadTree.getSubTreeFrom(parent.subTrees[treeLoc], nextLevel, quadrantPath);
    } else {
        //only gets here if there has been a wrong path.
        console.log("getSubTreeFrom: called on something without subtrees", level, quadrantPath);
        //throw new Error("get subTree was called on something without subtrees")
        return parent
    }
  }



  //returns the information related to the leaf touching point x,y
  static returnLeafTouching(x, y, parent, level, quadrantPath) {
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
      return {
        bounds: parent.bounds,
        companions: parent.points,
        level: level,
        path:quadrantPath.reverse()
      }
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
            found: true,
            bounds: parent.bounds,
            companions: parent.points.filter(val=> val !== point),
            level: level,
            path:quadrantPath.reverse()
          }
        }
      }
      return {
        found: false,
        bounds: parent.bounds,
        companions: parent.points,
        level: level,
        path:quadrantPath.reverse()
      }
    }
  }
  


//-------------------------------------------------------------------------------- ACTS ON DATA
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

  // USES INTERSECTION
  // doWithPointsIn(queryBounds, myAction) {
  //   QuadTree.pointAccessWithin(queryBounds, this, 0, myAction);
  // }
  // static pointAccessWithin(queryBounds, parent, level, myAction) {
  //   if (!(typeof(queryBounds.origin.x) === 'number' && typeof(queryBounds.origin.x) === 'number')) {
  //     throw new Error('QuadTree.pointAccessWithin: are you sure you got a bounds?');
  //   }
  //     //console.log(queryBounds.pretty());
  //     let nextLevel = level + 1;
  //     if (parent.subTrees.length > 0) {
  //       for (let subtree of parent.subTrees) {
  //         if (queryBounds.intersects(subtree.bounds)) {
  //           //At some point double check this is working correctly
  //           let subBounds = queryBounds.intersection(subtree.bounds);
  //           QuadTree.pointAccessWithin(subBounds, subtree, nextLevel, myAction);
  //         }
  //       }
  //     } else {
  //       for (let point of parent.points) {
  //         if (queryBounds.containsPoint(point)) {
  //           myAction(point);
  //         }
  //       };
  //     }
  //   }

    doWithPointsInRadius(x, y, r, myAction) {
      let rqueryBounds = Bounds.createBoundsFromCenter(thisQueryPoint.x, thisQueryPoint.y, r*2, r*2);
      //console.log("startQuery", rqueryBounds.x, rqueryBounds.y)
      QuadTree.pointAccessWithinRadius(rqueryBounds, this, myAction);
    }

    static pointAccessWithinRadius(queryBounds, parent, myAction) {
      if (!(typeof(queryBounds.origin.x) === 'number' && typeof(queryBounds.origin.x) === 'number')) {
        throw new Error('QuadTree.pointAccessWithin: are you sure you got a bounds?');
      }
        if (parent.subTrees.length > 0) {
          for (let subtree of parent.subTrees) {
            if (queryBounds.intersects(subtree.bounds)) {
              QuadTree.pointAccessWithinRadius(queryBounds, subtree, myAction);
            }
          }
        } else {
          for (let point of parent.points) {
            if (queryBounds.inscribedCircleContains(point.x, point.y)) {
              myAction(point);
            }
          };
        }
      }
  


    infoFromSubtreesTouching(queryBounds, myAction) {
      QuadTree.subTreeAccessTouching(queryBounds, this, 0, [], myAction)
    }
  
    // USES INTERSECTION
    // static subTreeAccessTouching(queryBounds, parent, level, quadrantPath, myAction) {
    //   //console.log(thisLevel, parent.bounds.pretty());
    //   let nextLevel = level + 1;
    //   if (parent.subTrees.length > 0) {
    //     for (let i = 0; i < parent.subTrees.length; i++) {
    //       const subtree = parent.subTrees[i];
    //       if (queryBounds.intersects(subtree.bounds)) {
    //         let myPath = Array.from(quadrantPath);
    //         myPath.push(i);
    //         //At some point double check this is working correctly
    //         let subBounds = queryBounds.intersection(subtree.bounds);
    //         QuadTree.subTreeAccessTouching(subBounds, subtree, nextLevel, myPath, myAction);
    //       }
    //     }
    //   } else {
    //       myAction(parent.points, parent.bounds, level, Array.from(quadrantPath).reverse());
    //   }
    // }

    //  USES INTERSCTION
//   static pointAccessWithin(queryBounds, parent, level, myAction) {

//       //console.log(queryBounds.pretty());
//       let nextLevel = level + 1;
//       if (parent.subTrees.length > 0) {
//         for (let subtree of parent.subTrees) {
//           if (queryBounds.intersects(subtree.bounds)) {
//             //At some point double check this is working correctly
//             let subBounds = queryBounds.intersection(subtree.bounds);
//             QuadTree.pointAccessWithin(subBounds, subtree, nextLevel, myAction);
//           }
//         }
//       } else {
//         for (let point of parent.points) {
//           if (queryBounds.containsPoint(point)) {
//             myAction(point);
//           }
//         };
//       }
//     }

//----------------------------------------------------------------------------------------- EDITING TREE 
  clearPointValue(x, y) {
    let info = QuadTree.returnPointInfo(x, y, this, 0, []);
    if (info == null) { 
      //console.log("cPV how?");
      
      return null
    } else if (info.found == false) {
      //console.log("cPV found is false", x, y, info.bounds.pretty(), info.companions);
      throw new Error('Point does not exist and I am only using this on points that exist.');
      return { removed:false, refresh:false }
    }
    //console.log("cPV found is true", x, y, info.bounds.pretty(), info.companions.length, info.level, info.path);

    if (info.companions.length > (this.limit/4)) {
      let result = this.getSubTree(info.level, info.path);
      if (result.points.length > 0) { result.points = info.companions } 
      else { console.log("cPV something went wrong.") }
      return { removed:true, refresh:false }
    } 
    else {
      let result;
      if (info.level <= 0) {
        result = this;
      } else {
        let pointParentLevel = info.level - 1;
        let pathToParent = Array.from(info.path);
        let lastStep = pathToParent.shift();  // <----  ROOT is at the end POP will remove root, not leaf.
        result = this.getSubTree(pointParentLevel, pathToParent);
      }

      //if (result == null) { result = this; }
      //console.log("cPV parent",result.subTrees.length, lastStep, result.bounds.pretty(), pointParentLevel, pathToParent);
      
      let allPoints = result.popAllPoints();

      //console.log("cPV allPoints", allPoints);
      //if (typeof(allPoints) === 'undefined') { throw new Error("allPoints undefined")}

      let validPoints = allPoints.filter(val=> (val.x != x && val.y != y));
      //console.log("cPV validPoints", "diff", allPoints.length - validPoints.length, validPoints);
      //if (allPoints.length - validPoints.length != 1) { throw new Error("cPV where is the point?"); }
      
      for (point of validPoints) {
        this.reAddPoint(point);
      }
     
      return { removed:true, refresh:true }
    }

  }


  popAllPoints() {
    let checkPoints = QuadTree.popAllPoints(this);
    return checkPoints
    //console.log(checkPoints);
  }

  static popAllPoints(parent) {
    let newPointCollector = [];
    //console.log(level, parent.bounds.pretty());
    if (parent.subTrees.length > 0) {
      for (let subtree of parent.subTrees) {
          let newPoints = QuadTree.popAllPoints(subtree);
          newPointCollector.push(...newPoints);
      }
      parent.subTrees = [];
    } else {
      let thesePoints = [];
      let num = parent.points.length; 
      for (let i = 0; i < num; i++) {
        thesePoints.push(parent.points.pop())
      }
      return thesePoints;
      //return Array.from(thesePoints);  //am I breaking the link? do I need to?
    }
    return newPointCollector;
  }

  popRegion(queryBounds) {
    return QuadTree.popRegion(queryBounds, this)
  }

  static popRegion(queryBounds, parent) {
    if (!(typeof(queryBounds.origin.x) === 'number' && typeof(queryBounds.origin.x) === 'number')) {
      throw new Error('QuadTree.pointAccessWithin: are you sure you got a bounds?');
    }
    
    //console.log("startPop Region");
    if (!parent.bounds.intersects(queryBounds)) { return []; }
    
    let newPointCollector = [];
    //console.log(level, parent.bounds.pretty(), );
    if (parent.subTrees.length > 0) {
      //console.log("going deeper");
      for (let subtree of parent.subTrees) {
          let newPoints = QuadTree.popRegion(queryBounds, subtree);
          newPointCollector.push(...newPoints);
        }
    } else {
      let thesePoints = parent.points.filter(val=> queryBounds.containsPoint(val));

      for (let point of thesePoints) { parent.clearPointValue(point.x, point.y) }
      return thesePoints;
    }
    return newPointCollector;
  }

  popRadius(x, y, r) {
    let rqueryBounds = Bounds.createBoundsFromCenter(thisQueryPoint.x, thisQueryPoint.y, r*2, r*2);
    return QuadTree.popCircularRegion(rqueryBounds, this)
  }

  static popCircularRegion(queryBounds, parent) {
    if (!(typeof(queryBounds.origin.x) === 'number' && typeof(queryBounds.origin.x) === 'number')) {
      throw new Error('QuadTree.pointAccessWithin: are you sure you got a bounds?');
    }
    
    //console.log("startPop Region");
    if (!parent.bounds.intersects(queryBounds)) {
      // ==================================================================================================
      // ------------------------------------------------------------------ START p5js code to troubleshoot
      rectMode(CORNER);
      rect(parent.bounds.x, parent.bounds.y, parent.bounds.width, parent.bounds.height);
      // -------------------------------------------------------------------- END p5js code to troubleshoot
      // ==================================================================================================
      //console.log("popRegion, no intersection.", queryBounds.pretty(), parent.bounds.pretty());
      return [];
    }
    
    let newPointCollector = [];
    //console.log(level, parent.bounds.pretty(), );
    if (parent.subTrees.length > 0) {
      //console.log("going deeper");
      for (let subtree of parent.subTrees) {
          let newPoints = QuadTree.popRegion(queryBounds, subtree);
          newPointCollector.push(...newPoints);
        }
    } else {
      let thesePoints = parent.points.filter(val=> queryBounds.inscribedCircleContains(val));
      // ==================================================================================================
      // ------------------------------------------------------------------ START p5js code to troubleshoot
      
      for (let pointToCheck of thesePoints) {  
        stroke(0);
        ellipseMode(CENTER);
        ellipse(pointToCheck.x, pointToCheck.y, 5);
      }
      let theLeftBehind = parent.points.filter(val=> !queryBounds.inscribedCircleContains(val));
      for (let pointToCheck of theLeftBehind) {  
        stroke(0, 255, 255);
        ellipseMode(CENTER);
        ellipse(pointToCheck.x, pointToCheck.y, 5);
      }
      // -------------------------------------------------------------------- END p5js code to troubleshoot
      // ==================================================================================================

      for (let point of thesePoints) { parent.clearPointValue(point.x, point.y) }
      return thesePoints;
    }
    return newPointCollector;
  }




}



