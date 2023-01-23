//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// /23-path-following/02-path-follower-refine/path.ts
// calynorama 2023 Jan 23
//

class Path {
    locations: Vector[];
    //bounds: Bounds
    radius: number

    constructor(...locations: Vector[]) {
        this.locations = locations
        this.radius = 20
        //this.bounds = Bounds.makeBoundsFromPointArray(...locations);
    }

    static createLinearPath(x1: number, y1: number, x2: number, y2: number) {
        return new Path(new Vector(x1, y1), new Vector(x2, y2))
    }

    static createPath(...components:{x:number, y:number}[]) {
       let vectors =  components.map((component) => new Vector(component.x, component.y))
       return new Path(...vectors)
    }

    static makePathBetween(vectorA: Vector, vectorB: Vector) {
        return new Path(vectorA, vectorB)
    }

    // contains(vector: Vector): boolean {
    //     if (this.bounds.contains(vector.x, vector.y)) {
    //         for (let i = 0; i < this.locations.length - 1; i++) {
    //             if (this.segmentContains(i, vector)) { return true }
    //         }
    //         return false
    //     }
    //     return false
    // }

    // segmentContains(startIndex: number, vector: Vector): boolean {
    //     //the faster thing to do would be to make a vector rotation to check
    //     //the rectangular bounds made by the line segment? If I had a matrix?
    //     let i = startIndex;
    //     let segmentBigBounds = Bounds.createBoundsFromPoints(
    //         this.locations[i].x - this.radius,
    //         this.locations[i].y - this.radius,
    //         this.locations[i + 1].x + this.radius,
    //         this.locations[i + 1].y + this.radius
    //     )
    //     if (segmentBigBounds.contains(vector.x, vector.y)) {
    //         let segmentVector = this.locations[i + 1].subtracting(this.locations[i]);
    //         let toProject = vector.subtracting(this.locations[i]);
    //         let projection = toProject.projectOn(segmentVector);
    //         if (toProject.subtracting(projection).magnitude() < this.radius) { return true }
    //     }

    //     return false
    // }

    // addPoint(vector: Vector) {
    //     let pointToCheck = Point.pointFromVector(vector)
    //     if (this.bounds.contains(pointToCheck.x, pointToCheck.y)) {
    //         this.locations.push(vector)
    //     } else {

    //         this.bounds = Bounds.expandedBounds(this.bounds, vector)
    //         this.locations.push(vector)
    //     }
    // }

    closestPointTo(vector: Vector): { segmentIndex: number, point: Vector, distance: number } {
        //let distances: { segmentIndex: number, point: Vector, distance: number }[] = []
        let shortest: { segmentIndex: number, point: Vector, distance: number }
        shortest = { segmentIndex:-1,  point:new Vector (-1, -1), distance:+Infinity }
        for (let i = 0; i < this.locations.length - 1; i++) {
            const point = this.segmentClosestPointTo(i, vector)
            let distance = point.distanceTo(vector)
            //TODO: Path self-crossing will cause a problem
            const segmentIndex = i
            if (distance < this.radius) {
                return { segmentIndex, point, distance }
            }
            else if (distance < shortest.distance){
                shortest = { segmentIndex, point, distance }
            }
        }
        //distances.sort((a, b) => a.distance - b.distance)
        return shortest
    }

    segmentClosestPointTo(startIndex: number, vector: Vector): Vector {
        let endIndex = startIndex + 1
        let newSegment = this.locations[endIndex].subtracting(this.locations[startIndex]);
        let segmentLength = newSegment.magnitude();
        let toProject = vector.subtracting(this.locations[startIndex]);
        let projection = toProject.projectOn(newSegment);
        if (projection.dotProduct(newSegment) < 0) {
            return this.locations[startIndex]
        }
        else if (projection.magnitude() > segmentLength) {
            return this.locations[endIndex]
        }
        
        let projectionCanvasPoint = projection.addedTo(this.locations[startIndex]);
        return projectionCanvasPoint
    }

}