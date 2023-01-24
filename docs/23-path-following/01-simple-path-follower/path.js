"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// /23-path-following/01-simple-path-follower/path.js
// calynorama 2023 Jan 23
//

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
