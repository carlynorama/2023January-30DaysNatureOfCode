type Point = {
    x:number
    y:number
}

class Path {
    locations: Point[];
    radius:number
    constructor(...locations: Point[]) {
      this.locations = locations
      this.radius = 20
    }

    static createLinearPath(x1:number, y1:number, x2:number, y2:number) {
        return new Path({x:x1, y:y1}, {x:x2, y:y2},)
    }

    static makePathBetween(vectorA:Vector, vectorB:Vector) {
        return new Path(vectorA, vectorB)
    }
    
}