// class QuadTree {
//   constructor(x, y, w, h, count) {
//     this.bounds = new Bounds(x, y, w, h);
//     this.limit = count;
//     this.points = [];
//     this.subTrees = []; //[ne,se,sw,nw];
//   }
//
//   addPoint(x, y) {
//     if (!this.contains(x,y)) {
//       return false;
//     } else {
//       if (this.subTrees.length != 0) {
//         return this.addPointToSubTree(x,y);
//       }
//      else if ((this.points.length < this.limit) && (this.subTrees.length == 0)) {
//               let point = new Point(x,y);
//               this.points.push(point);
//               return true;
//       }
//       else {
//         this.subdivide();
//         //distributePoints(); ??
//         return this.addPointToSubTree(x,y);
//       }
//     }
//   }
//
//   subdivide() {
//     let colors = [
//       color(204, 204, 0),
//       color(0, 204, 204),
//       color(204, 0, 204),
//       color(0, 51, 204),
//       color(204, 51, 0),
//     ]
//
//     let minX = this.bounds.origin.x;
//     let minY = this.bounds.origin.y;
//
//     let width = this.bounds.size.width/2;
//     let height = this.bounds.size.height/2;
//
//     let midX = width + minX;
//     let midY = height + minY;
//
//     stroke(colors[1]);
//     let ne  = new QuadTree(midX, minY, width, height, this.limit);
//     stroke(colors[2]);
//     let se  = new QuadTree(midX, midY, width, height, this.limit);
//     stroke(colors[3]);
//     let sw  = new QuadTree(minX, midY, width, height, this.limit);
//     stroke(colors[4]);
//     let nw  = new QuadTree(minX, minY, width, height, this.limit);
//
//     this.subTrees = [ne,se,sw,nw];
//   }
//
//   addPointToSubTree(x,y) {
//     let west = new Range(this.bounds.origin.x,this.bounds.size.width/2);
//     let north = new Range(this.bounds.origin.y, this.bounds.size.height/2);
//     //<-- ! IMPORTANT this is the same type of check as Bounds uses
//     let isWest = west.upperInclusiveContains(x);
//     let isNorth = north.upperInclusiveContains(y);
//
//     if (isNorth && !isWest) {
//       let tree = this.subTrees[0];
//       //console.log(tree.bounds.origin.x);
//       drawBounds(tree);
//       return tree.addPoint(x,y);
//
//     } else if (!isNorth && !isWest) {
//       let tree = this.subTrees[1];
//       //console.log(tree.bounds.origin.x);
//       drawBounds(tree);
//       return tree.addPoint(x,y);
//     } else if (!isNorth && isWest) {
//       let tree = this.subTrees[2];
//       //console.log(tree.bounds.origin.x);
//       drawBounds(tree);
//
//       return tree.addPoint(x,y);
//     } else {
//       let tree = this.subTrees[3];
//       //console.log(tree.bounds.origin.x);
//       drawBounds(tree);
//       return tree.addPoint(x,y);
//     }
//
//     return false;
//
//   }
//
//   contains(x,y) {
//     return this.bounds.contains(x,y);
//   }
//
// }
