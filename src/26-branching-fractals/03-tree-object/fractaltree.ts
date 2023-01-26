

class Branch {

    start: Vector;
    end: Vector;

    branches: Branch[];
    shrinkage: number;
    angleForChildren: number;
    shrinkageWiggle: number;
    angleWiggle: number;
    maxChildren: number;
    isMaxDepth:boolean;

    constructor(a: Vector, b: Vector) {
        this.start = a;
        this.end = b;
        this.branches = [];

        this.shrinkage = 0.77;
        this.angleForChildren = Math.PI / 9;
        this.shrinkageWiggle = 0.2;
        this.angleWiggle = 0.15;
        this.maxChildren = 5;
        this.isMaxDepth = b.distanceTo(a) < 5;

    }

    static random = (min: number, max: number) => { return Math.random() * (max - min) + min; }

    makeSubBranches() {
        if (!this.isMaxDepth) { this.branches = Branch.makeSubBranches(this, this.start, this.end); }
    }

    //This doesn't look great without other forces / expanding child angle into available space, etc.
    //Oh look: https://thecodingtrain.com/challenges/17-fractal-trees-space-colonization
    protected static makeRandomNumberOfBranches(parent: Branch, start: Vector, end: Vector): Branch[] {
        const length = end.distanceTo(start);
        const SE = end.subtracting(start);
        const baseAngle = SE.angle2D();

        const numberOfBranches = floor(Branch.random(0, parent.maxChildren+1));
        let newChildren:Branch[] = [];
        const maxAngle = parent.angleForChildren + parent.angleWiggle;
        const angleWedge = 2*maxAngle/numberOfBranches;
        for (let i = 0; i < numberOfBranches; i++) {
            let angleMin = i*angleWedge + -maxAngle;
            let angleMax = angleMin + angleWedge;
            const c_Shrinkage = parent.shrinkage + random(-parent.shrinkageWiggle, 0);
            const SC = Vector.create2DAngleVector(
                baseAngle + Branch.random(angleMin, angleMax), 
                length * c_Shrinkage);
            newChildren.push(new Branch(end, end.addedTo(SC)))
        }
        return newChildren
    }

    protected static makeSubBranches(parent: Branch, start: Vector, end: Vector): Branch[] {
        const length = end.distanceTo(start);
        const SE = end.subtracting(start);
        const baseAngle = SE.angle2D();

        const c1_Shrinkage = parent.shrinkage + random(-parent.shrinkageWiggle, 0);
        const SC1 = Vector.create2DAngleVector(
            baseAngle + parent.angleForChildren + Branch.random(-parent.angleWiggle, parent.angleWiggle), 
            length * c1_Shrinkage);
        const C1 = end.addedTo(SC1);

        const c2_Shrinkage = parent.shrinkage + random(-parent.shrinkageWiggle, 0)
        const SC2 = Vector.create2DAngleVector(
            baseAngle - parent.angleForChildren + Branch.random(-parent.angleWiggle, parent.angleWiggle), 
            length * c2_Shrinkage);
        const C2 = end.addedTo(SC2);
        return [new Branch(end, C1), new Branch(end, C2)];

    }

    protected static makeEvenSubBranches(parent: Branch, start: Vector, end: Vector): Branch[] {
        const length = end.distanceTo(start);
        const newSegmentLengths = length * parent.shrinkage;
        const SE = end.subtracting(start);
        const baseAngle = SE.angle2D();

        const SC1 = Vector.create2DAngleVector(baseAngle + parent.angleForChildren, newSegmentLengths);
        const C1 = end.addedTo(SC1);

        const SC2 = Vector.create2DAngleVector(baseAngle - parent.angleForChildren, newSegmentLengths);
        const C2 = end.addedTo(SC2);
        return [new Branch(end, C1), new Branch(end, C2)];
    }

    growBranches = (depth:number = 1) => {
        Branch.growBranches(this, 0);
    }

    static growBranches(parent: Branch, level: number) {
        let thisLevel = level;
        let nextLevel = level + 1;
        if (parent.branches.length > 0) {
            //console.log("I have subsegments", thisLevel, parent.branches.length); //<- points length should be 0.
            for (let subtree of parent.branches) {
                Branch.growBranches(subtree, nextLevel);
            }
        }
        else {
            //console.log("I need subsegments", thisLevel);
            parent.makeSubBranches();
            //console.log("madeSegments", thisLevel, parent.branches.length);
        }
    }


}