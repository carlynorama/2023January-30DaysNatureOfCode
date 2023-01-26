

class KochLine {

    //A line between two points: start and end
    start: Vector;
    end: Vector;

    segments:KochLine[]

    constructor(a: Vector, b: Vector) {
        this.start = a;
        this.end = b;
        this.segments = []
    }

    makeSubSegments() {
        this.segments = KochLine.makeSubSegments(this.start, this.end);
    }

    static makeSubSegments(start:Vector, end:Vector):KochLine[] {

        // I bet there is a way to either store or generate these more efficiently. 
        const length = end.distanceTo(start);
        const newSegmentLengths =  length/3;
        const SE = end.subtracting(start);
        const baseAngle = SE.angle2D();
        const SB = Vector.create2DAngleVector(baseAngle, newSegmentLengths);
        //console.log(newSegmentLengths);
        const B = start.addedTo(SB);
        const BC = Vector.create2DAngleVector(baseAngle+ -Math.PI/3, newSegmentLengths);
        const C = B.addedTo(BC);
        const CD = Vector.create2DAngleVector(baseAngle+Math.PI/3, newSegmentLengths);
        const D = C.addedTo(CD);
        // const DE = Vector.create2DAngleVector(baseAngle, newSegmentLengths);
        // const E = D.addedTo(DE);


        return [new KochLine(start, B), new KochLine(B, C), new KochLine(C, D), new KochLine(D, end)]; 
        
    }

    bumpLevel = () => {
        KochLine.bumpLevels(this, 0);
    }

    static bumpLevels(parent:KochLine, level:number) {
        let thisLevel = level;
        let nextLevel = level + 1;
        if (parent.segments.length > 0) {
            console.log("I have subsegments",thisLevel, parent.segments.length); //<- points length should be 0.
            for (let subtree of parent.segments) {
              KochLine.bumpLevels(subtree, nextLevel);
            }
        }
        else {
            console.log("I need subsegments", thisLevel);
            parent.makeSubSegments();
            console.log("madeSegments", thisLevel, parent.segments.length);
        }
    }

    static walkTree(parent:KochLine, level:number) {
        let thisLevel = level;
        console.log(thisLevel);
        let nextLevel = level + 1;
        if (parent.segments.length > 0) {
          console.log("I am a NOT a leaf!", parent.segments.length); //<- points length should be 0.
          for (let subtree of parent.segments) {
            KochLine.walkTree(subtree, nextLevel);
          }
        } else {
          console.log("I am a leaf!", parent.segments.length);
        }
      }


}