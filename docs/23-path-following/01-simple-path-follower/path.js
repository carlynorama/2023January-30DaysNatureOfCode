"use strict";
class Path {
    // radius:number
    constructor(...locations) {
        this.locations = locations;
        //   this.radius = 20
    }
    static createLinearPath(x1, y1, x2, y2) {
        return new Path(new Vector(x1, y1), new Vector(x2, y2));
    }
    static makePathBetween(vectorA, vectorB) {
        return new Path(vectorA, vectorB);
    }
}
