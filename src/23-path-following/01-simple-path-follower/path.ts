
class Path {
    locations: Vector[];
    radius:number
    constructor(...locations: Vector[]) {
      this.locations = locations
      this.radius = 20
    }

    static createLinearPath(x1:number, y1:number, x2:number, y2:number) {
        return new Path(new Vector(x1, y1), new Vector(x2, y2))
    }

    static makePathBetween(vectorA:Vector, vectorB:Vector) {
        return new Path(vectorA, vectorB)
    }
    
}