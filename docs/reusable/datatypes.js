"use strict";
//
// 2023 January Creative Coding Journal
// https://github.com/carlynorama/2023January-30DaysNatureOfCode/
//
// datatypes.ts
// written by calynorama 2023 Jan 13
//
//TODO: Rewrite as overloads?
class Point {
    constructor(x, y) {
        if (!(typeof (x) === 'number' && typeof (y) === 'number')) {
            throw new Error('\r\n\r\nPoint():values are not numeric');
        }
        this.x = x;
        this.y = y;
    }
    static matches(lhs, rhs) {
        return (lhs.x === rhs.x && lhs.y === rhs.y);
    }
    matches(other) {
        return Point.matches(this, other);
    }
    hasValues(x, y) {
        return (this.x === x && this.y === y);
    }
    static closeEnough(lhs, rhs, distance) {
        const left = ((lhs.x - rhs.x) * (lhs.x - rhs.x)) + ((lhs.y - rhs.y) * (lhs.y - rhs.y));
        const right = distance * distance;
        const result = left <= right;
        //console.log(result, left, right);
        return result;
    }
    closeEnoughTo(other, distance) {
        return Point.closeEnough(this, other, distance);
    }
    pretty() {
        return `Point(${this.x}, ${this.y})`;
    }
}
class Size {
    constructor(w, h) {
        if (!(typeof (w) === 'number' && typeof (h) === 'number')) {
            throw new Error('\r\n\r\nSize():values are not numeric');
        }
        this.width = w;
        this.height = h;
    }
    static matches(lhs, rhs) {
        return (lhs.width === rhs.width && lhs.height === rhs.height);
    }
    static sidesGreaterThan(lhs, rhs) {
        return (lhs.width >= rhs.width && lhs.height >= rhs.height);
    }
    static areaGreaterThan(lhs, rhs) {
        return (lhs.area >= rhs.area);
    }
    matches(other) {
        return Size.matches(this, other);
    }
    get area() { return this.width * this.height; }
    get pretty() {
        return `Size(${this.width}, ${this.height})`;
    }
}
//TODO: Rename my range? 
class NumRange {
    constructor(l, u) {
        if (!(typeof (l) === 'number' && typeof (u) === 'number')) {
            throw new Error('\r\n\r\nRange():values are not numeric")');
        }
        this.lower = l;
        this.upper = u;
    }
    static project(val, l1, u1, l2, u2) {
        //check against NumRange.locationInRange();
        const percent = Math.abs(val - l1) / Math.abs(u1 - l1);
        const displacement = (u2 - l2) * percent;
        return l2 + displacement;
    }
    static constrain(val, l, u) {
        return Math.min(Math.max(val, l), u);
        //Math.clamp(val, l, u) is apparently slow?;
    }
    locationInRange(val) {
        return Math.abs(val - this.lower) / Math.abs(this.upper - this.lower);
    }
    inclusiveContains(x) {
        return ((x <= this.upper) && (x >= this.lower));
    }
    exclusiveContains(x) {
        return ((x < this.upper) && (x > this.lower));
    }
    lowerInclusiveContains(x) {
        return ((x < this.upper) && (x >= this.lower));
    }
    upperInclusiveContains(x) {
        return ((x <= this.upper) && (x > this.lower));
    }
    overlaps(other) {
        //have to have both incase one holds the other and the smaller is the caller.
        const sideOne = (this.inclusiveContains(other.lower) || this.inclusiveContains(other.upper));
        const sideTwo = (other.inclusiveContains(this.lower) || other.inclusiveContains(this.upper));
        return sideOne || sideTwo;
    }
    //contains would be better, how to overload without types?
    fullyHolds(other) {
        return (this.lower < other.lower && this.upper > other.upper);
    }
    holds(other) {
        return (this.lower <= other.lower && this.upper >= other.upper);
    }
    get pretty() {
        return `Range(lower:${this.lower}, upper:${this.upper})`;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Bounds {
    constructor(point, size) {
        if (!(typeof (point.x) === 'number' && typeof (point.y) === 'number' && typeof (size.width) === 'number' && typeof (size.height) === 'number')) {
            //console.log(point.pretty(), size.pretty())
            throw new Error('\r\n\r\nBounds(): at least one value is not numeric');
        }
        this.origin = point;
        this.size = size;
    }
    static createBounds(x, y, w, h) {
        if (!(typeof (x) === 'number' && typeof (y) === 'number' && typeof (w) === 'number' && typeof (h) === 'number')) {
            throw new Error('\r\n\r\nBounds(): at least one value is not numeric');
        }
        const p = new Point(x, y);
        const s = new Size(w, h);
        const b = new Bounds(p, s);
        return b;
    }
    static createBoundsFromCenter(centerX, centerY, w, h) {
        if (!(typeof (centerX) === 'number' && typeof (centerY) === 'number' && typeof (w) === 'number' && typeof (h) === 'number')) {
            throw new Error('\r\n\r\nBounds(): at least one value is not numeric');
        }
        const p = new Point(centerX - w / 2, centerY - h / 2);
        const s = new Size(w, h);
        const b = new Bounds(p, s);
        return b;
    }
    static createBoundsFromPoints(x1, y1, x2, y2) {
        const w = x2 - x1;
        const h = y2 - y1;
        if (w >= 0 && h >= 0) {
            const b = Bounds.createBounds(x1, y1, w, h);
            return b;
        }
        else if (w < 0 && h < 0) {
            const b = Bounds.createBounds(x2, y2, Math.abs(w), Math.abs(h));
            return b;
        }
        else {
            const s = new Size(Math.abs(w), Math.abs(h));
            const p = new Point(Math.min(x2, x2), Math.min(y2, y1));
            const b = new Bounds(p, s);
            return b;
        }
    }
    get x() { return this.origin.x; }
    get y() { return this.origin.y; }
    get width() { return this.size.width; }
    get height() { return this.size.height; }
    get minX() { return this.origin.x; }
    get minY() { return this.origin.y; }
    get maxX() { return this.origin.x + this.size.width; }
    get maxY() { return this.origin.y + this.size.height; }
    get midX() { return this.size.width / 2 + this.minX; }
    get midY() { return this.size.height / 2 + this.minY; }
    get center() { return new Point(this.midX, this.midY); }
    offSetBy(x, y) {
        this.origin.x += x;
        this.origin.y += y;
    }
    updateOrigin(x, y) {
        if (!(typeof (x) === 'number' && typeof (y) === 'number')) {
            throw new Error('Bounds.updateOrigin: one or both of the values are not numeric.');
        }
        this.origin.x = x;
        this.origin.y = y;
    }
    updateCenter(x, y) {
        if (!(typeof (x) === 'number' && typeof (y) === 'number')) {
            //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
            throw new Error('Bounds.updateCenter: one or both of the values are not numeric.');
        }
        this.origin.x = x - this.width / 2;
        this.origin.y = y - this.height / 2;
    }
    updateWithin(x, y, bounds) {
        if (!(typeof (x) === 'number' && typeof (y) === 'number')) {
            //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
            throw new Error('Bounds.updateOrigin: one or both of the values are not numeric.');
        }
        this.origin.x = NumRange.constrain(x, bounds.minX, bounds.maxX);
        this.origin.y = NumRange.constrain(y, bounds.minY, bounds.maxY);
    }
    moveWithin(x, y, bounds) {
        if (!(typeof (x) === 'number' && typeof (y) === 'number')) {
            //https://stackoverflow.com/questions/550574/how-to-terminate-the-script-in-javascript
            throw new Error('Bounds.updateOrigin: one or both of the values are not numeric.');
        }
        this.origin.x = NumRange.constrain(x, bounds.minX, bounds.maxX - this.width);
        this.origin.y = NumRange.constrain(y, bounds.minY, bounds.maxY - this.height);
    }
    moveWithinCentered(x, y, bounds) {
        this.moveWithin(x - this.width / 2, y - this.height / 2, bounds);
    }
    insetBy(margin) {
        this.size.width -= margin;
        this.size.height -= margin;
    }
    insetOnCenterBy(margin) {
        this.size.width -= margin;
        this.size.height -= margin;
        const offset = margin / 2;
        this.offSetBy(offset, offset);
    }
    scale(factor) {
        this.size.width * factor;
        this.size.height * factor;
    }
    contains(x, y) {
        if (!(typeof (x) === 'number' && typeof (y) === 'number')) {
            throw new Error('Bounds.contains: one or both of the values are not numeric.');
        }
        //console.log("contains:", x, y)
        //console.log("MINX", this.minX())
        //console.log("direct", this.origin.x)
        const xRange = new NumRange(this.minX, this.maxX);
        const xCheck = xRange.upperInclusiveContains(x);
        //console.log("x", xRange.pretty(), x, xCheck);
        const yRange = new NumRange(this.minY, this.maxY);
        const yCheck = yRange.upperInclusiveContains(y);
        //console.log("y", this.minY, this.maxY, y, yCheck);
        return (xCheck && yCheck);
        //return true;
    }
    containsPoint(point) {
        return this.contains(point.x, point.y);
    }
    static intersects(lhs, rhs) {
        const lhs_xRange = new NumRange(lhs.minX, lhs.maxX);
        const lhs_yRange = new NumRange(lhs.minY, lhs.maxY);
        const rhs_xRange = new NumRange(rhs.minX, rhs.maxX);
        const rhs_yRange = new NumRange(rhs.minY, rhs.maxY);
        return (lhs_xRange.overlaps(rhs_xRange) && lhs_yRange.overlaps(rhs_yRange));
    }
    // Check on this
    static matches(lhs, rhs) {
        return (lhs.origin.matches(rhs.origin) && lhs.size.matches(rhs.size));
    }
    intersects(other) {
        return Bounds.intersects(this, other);
    }
    intersection(other) {
        throw new Error("Fix it first.");
        return Bounds.intersection(this, other);
    }
    //WARNING: This maybe busted.
    static intersection(lhs, rhs) {
        throw new Error("Fix it first.");
        let originX;
        let originY;
        let w;
        let h;
        const lhs_xRange = new NumRange(lhs.minX, lhs.maxX);
        const lhs_yRange = new NumRange(lhs.minY, lhs.maxY);
        const rhs_xRange = new NumRange(rhs.minX, rhs.maxX);
        const rhs_yRange = new NumRange(rhs.minY, rhs.maxY);
        if (lhs_xRange.overlaps(rhs_xRange) && lhs_yRange.overlaps(rhs_yRange)) {
            if (lhs_xRange.inclusiveContains(rhs.minX)) {
                originX = rhs.minX;
                w = Math.min(lhs.maxX, rhs.maxX) - rhs.minX;
            }
            else {
                originX = lhs.minX;
                w = Math.min(lhs.maxX, rhs.maxX) - lhs.minX;
            }
            if (lhs_yRange.inclusiveContains(rhs.minY)) {
                originY = rhs.minY;
                h = Math.min(lhs.maxY, rhs.maxY) - rhs.minY;
            }
            else {
                originY = lhs.minY;
                h = Math.min(lhs.maxY, rhs.maxY) - lhs.minY;
            }
        }
        else {
            return null;
        }
        //console.log(originX, originY, w, h);
        return Bounds.createBounds(originX, originY, w, h);
    }
    matches(other) {
        return Bounds.matches(this, other);
    }
    holds(other) {
        //x y values can be equal
        const lhs_xRange = new NumRange(this.minX, this.maxX);
        const lhs_yRange = new NumRange(this.minY, this.maxY);
        const rhs_xRange = new NumRange(other.minX, other.maxX);
        const rhs_yRange = new NumRange(other.minY, other.maxY);
        return (lhs_xRange.holds(rhs_xRange) && lhs_yRange.holds(rhs_yRange));
    }
    containedBy(other) {
        const lhs_xRange = new NumRange(this.minX, this.maxX);
        const lhs_yRange = new NumRange(this.minY, this.maxY);
        const rhs_xRange = new NumRange(other.minX, other.maxX);
        const rhs_yRange = new NumRange(other.minY, other.maxY);
        return (rhs_xRange.holds(lhs_xRange) && rhs_yRange.holds(lhs_yRange));
    }
    quads() {
        if (this.width < 4 || this.height < 4) {
            console.log('Bounds.quads: this is going to be a really small sub tree.');
        }
        const minX = this.origin.x;
        const minY = this.origin.y;
        const w = (this.size.width) / 2;
        const h = (this.size.height) / 2;
        const midX = w + minX;
        const midY = h + minY;
        if (midX === minY || midX === minY) {
            throw new Error('Bounds.quads: is a dimension 0?');
        }
        const ne = Bounds.createBounds(midX, minY, w, h);
        const se = Bounds.createBounds(midX, midY, w, h);
        const sw = Bounds.createBounds(minX, midY, w, h);
        const nw = Bounds.createBounds(minX, minY, w, h);
        return [ne, se, sw, nw];
    }
    //really should only be valid if bounds is a square. 
    inscribedCircleContains(x, y) {
        if (!this.contains(x, y)) {
            return false;
        }
        //Not sure that creating a whole new object saves in this case since I'm not taking the square roots. Worth a performance test.
        // let side = this.width/2 * Math.SQRT2;
        // let offset = side/2;
        // let innerBounds = new Bounds(x-offset, y-offset,side,side); 
        // if (innerBounds.contains(x,y)) { return true; }
        const rhs = new Point(x, y);
        const distance = this.width / 2;
        const result = this.center.closeEnoughTo(rhs, distance);
        //console.log(this.center.x, this.center.y, distance, rhs.x, rhs.y, result);
        return result;
    }
    pretty() {
        return `Bounds(x:${this.origin.x}, y:${this.origin.y}, w:${this.size.width}, h:${this.size.height})`;
    }
    minmaxstring() {
        return `Bounds(minX:${this.minX}, maxX:${this.maxX}, minY:${this.minY}, maxY:${this.maxY})`;
    }
}
